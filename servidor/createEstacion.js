const express = require('express');
const router = express.Router();

module.exports = (pool) => {
    router.post('/', async (req, res) => {
        const { nombre, municipio, provincia, linea, geom } = req.body;

        console.log('Datos recibidos:', { nombre, municipio, provincia, linea, geom });

        if (!nombre || !municipio || !provincia || !linea || !geom) {
            return res.status(400).json({ error: 'Faltan parámetros en la solicitud' });
        }

        try {
            const query = `
                INSERT INTO estaciones (nombre, municipio, provincia, linea, geom)
                VALUES ($1, $2, $3, $4, ST_SetSRID(ST_GeomFromGeoJSON($5), 4326))
                RETURNING id;
            `;
            const { rows } = await pool.query(query, [nombre, municipio, provincia, linea, JSON.stringify(geom)]);
            const id = rows[0].id;
            res.status(201).json({ id });
        } catch (error) {
            console.error('Error al insertar datos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    return router;
};
