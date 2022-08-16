const express = require('express');

const routes = require('./routes');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);
//error handler
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(port, () => console.log('Servidor rodando'));
