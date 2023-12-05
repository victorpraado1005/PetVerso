const express = require('express');
require('dotenv').config();

const cors = require('./App/middlewares/cors');
const erroHandler = require('./App/middlewares/erroHandler');
const routes = require('./routes');
const verificaJWT = require('./App/middlewares/verificaJWT');

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors);
// app.use(verificaJWT);
app.use(routes);
app.use(erroHandler);

app.listen(port, () => console.log('Servidor rodando...'));
