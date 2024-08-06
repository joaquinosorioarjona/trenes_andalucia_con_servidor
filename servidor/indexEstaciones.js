const express = require('express');
const router = express.Router();

const authMiddleware = require('./authMiddleware');


const getEstaciones = require('./getEstaciones');
const createEstacion = require('./createEstacion');
const updateEstacion = require('./updateEstacion');
const deleteEstacion = require('./deleteEstacion');

module.exports = (pool) => {
    router.use('/', getEstaciones(pool));
    router.use('/', authMiddleware, createEstacion(pool));
    router.use('/', authMiddleware, updateEstacion(pool));
    router.use('/', authMiddleware, deleteEstacion(pool));
    
    return router;
};