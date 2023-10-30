const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')

const app = express();
const file = fs.readFileSync('../openapi.yaml', 'utf8')
const port = 8090

app.use(
  function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

app.use(
  '/swagger-ui.html',
  swaggerUi.serve, swaggerUi.setup(YAML.parse(file))
);

app.listen(
  port,
  console.log(`App Listening to port ${port}`));

app.get('/projects', (req, res, next) => {
  res.send([
    {
      "name": "string",
      "comment": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "defaultBranch": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string"
      }
    }
  ]);
});

module.exports = app;
