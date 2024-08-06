const express = require('express');
const router = express.Router();

module.exports = (pool) => {
    // Ruta para obtener todas las estaciones
    router.get('/', async (req, res) => {
        try {
            const query = `
                SELECT json_build_object(
                    'type', 'FeatureCollection',
                    'features', json_agg(
                        json_build_object(
                            'type', 'Feature',
                            'geometry', ST_AsGeoJSON(estaciones.geom)::json,
                            'properties', json_build_object(
                                'id', estaciones.id,
                                'nombre', estaciones.nombre,
                                'municipio', estaciones.municipio,
								'provincia', estaciones.provincia,
                                'linea', estaciones.linea
                            )
                        )
                    )
                ) AS geojson
                FROM estaciones;
            `;
            const { rows } = await pool.query(query);
            const geojson = rows[0].geojson;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(geojson);
        } catch (error) {
            console.error('Error al obtener datos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    // Ruta para obtener estaciones a una distancia de 50 kilómetros a partir de coordenadas
    router.get('/buffer', async (req, res) => { 
        const { lat, lng, radius } = req.query;
        if (!lat || !lng) {
            return res.status(400).json({ error: 'Faltan parámetros de latitud y longitud' });
        }

        try { 
            const query = `
                SELECT json_build_object(
                    'type', 'FeatureCollection',
                    'features', json_agg(
                        json_build_object(
                            'type', 'Feature',
                            'geometry', ST_AsGeoJSON(estaciones.geom)::json,
                            'properties', json_build_object(
                                'id', estaciones.id,
                                'nombre', estaciones.nombre,
                                'municipio', estaciones.municipio,
								'provincia', estaciones.provincia,
                                'linea', estaciones.linea
                            )
                        )
                    )
                ) AS geojson
                FROM estaciones
                WHERE ST_DWithin(
                    estaciones.geom,
                    ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography,
                    $3
                );
            `;

            const { rows } = await pool.query(query, [lat, lng, radius]);
            const geojson = rows[0].geojson;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(geojson);
        } catch (error) {
            console.error('Error al obtener datos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    return router;
};