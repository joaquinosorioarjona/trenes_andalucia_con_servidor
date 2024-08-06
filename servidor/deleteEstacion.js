const express = require('express');
const router = express.Router();

module.exports = (pool) => {
    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
		
		console.log('Datos borrados.');

        if (!id) {
            return res.status(400).json({ error: 'Falta el ID de la estación' });
        }

        try {
            const query = `
                DELETE FROM estaciones
                WHERE id = $1;
            `;

            const result = await pool.query(query, [id]);

            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'Estación no encontrada' });
            }

            res.status(200).json({ message: 'Estación eliminada' });
        } catch (error) {
            console.error('Error al eliminar datos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    return router;
};