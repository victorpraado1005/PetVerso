const express = require('express');

const routes = require('./routes');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  next();
})
app.use(routes);
//error handler
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(port, () => console.log('Servidor rodando'));
