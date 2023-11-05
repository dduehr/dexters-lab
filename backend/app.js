const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const YAML = require('yaml')
const config = require('./configuration')

const app = express()

app.use(cors({
  exposedHeaders: ['Pagination-CurrentPage', 'Pagination-PageCount'],
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const apifile = fs.readFileSync(config.openApiYaml, 'utf8')
app.use(config.openApiUi, swaggerUi.serve, swaggerUi.setup(YAML.parse(apifile)))

app.get('/', function (req, res) {
  res.redirect(config.openApiUi);
});

app.response.problem = function (status, message, details) {
  const problem = {
    title: message,
    status: status
  }
  this.status(status).json({
    ...problem,
    ...(details && { details: details })
  })
}

app.listen(config.serverPort, console.log(`app Listening on port ${config.serverPort}`))

module.exports = app, config

require('./services/projects')
require('./services/branches')
require('./services/snapshots')