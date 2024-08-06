const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dbConfig = require('./dbConfig');

const estacionesRoute = require('./indexEstaciones');
const lineasRoute = require('./lineas');
const provinciasRoute = require('./provincias');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool(dbConfig);

app.use('/estaciones', estacionesRoute(pool));
app.use('/lineas', lineasRoute(pool));
app.use('/provincias', provinciasRoute(pool));

app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
