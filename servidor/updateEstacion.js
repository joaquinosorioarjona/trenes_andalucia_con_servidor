const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, municipio, provincia, linea, geom } = req.body;
	
	console.log('Datos actualizados:', { nombre, municipio, provincia, linea, geom });
	
	if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    if (!nombre || !municipio || !provincia || !linea || !geom) {
      return res.status(400).json({ error: 'Faltan parámetros en la solicitud' });
    }

    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
	
    try {
      // Validar que geom tenga un formato correcto
      const geomString = JSON.stringify(geom);
      const query = `
        UPDATE estaciones
        SET nombre = $1, municipio = $2, provincia = $3, linea = $4, geom = ST_SetSRID(ST_GeomFromGeoJSON($5), 4326)
        WHERE id = $6;
      `;
      const result = await pool.query(query, [nombre, municipio, provincia, linea, geomString, id]);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Estación no encontrada' });
      }

      res.status(200).json({ message: 'Estación actualizada' });
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  return router;
};