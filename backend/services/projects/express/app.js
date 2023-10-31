const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const YAML = require('yaml')
const config = require('./configuration')

const app = express()

app.use(
  function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })
  
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const apifile = fs.readFileSync(config.openApiYaml, 'utf8')
app.use(config.openApiUi, swaggerUi.serve, swaggerUi.setup(YAML.parse(apifile)))

app.get('/', function(req, res) {
  res.redirect(config.openApiUi);
});

app.listen(config.serverPort, console.log(`app Listening on port ${config.serverPort}`))

module.exports = app, config

require('./services/projects')
require('./services/branches')
require('./services/snapshots')