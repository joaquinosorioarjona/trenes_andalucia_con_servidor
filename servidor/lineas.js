const express = require('express');
const router = express.Router();

module.exports = (pool) => {
    router.get('/', async (req, res) => {
        try {
            const query = `
                SELECT json_build_object(
                    'type', 'FeatureCollection',
                    'features', json_agg(
                        json_build_object(
                            'type', 'Feature',
                            'geometry', ST_AsGeoJSON(lineas.geom)::json,
                            'properties', json_build_object(
                                'id', lineas.id,
                                'linea', lineas.linea
                            )
                        )
                    )
                ) AS geojson
                FROM lineas;
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

    return router;
};