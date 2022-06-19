const serverless = require('serverless-http')
const express = require('express')
const app = express()
require('dotenv/config')

const bodyParser = require('body-parser')
const cors = require('cors')
const { dbConnection } = require('../../utils/dbConnection')

app.use(bodyParser.json())
app.use(cors())

dbConnection()

app
  .use('/products', require('./routers/productsRouter'))
  .use('/customer', require('./routers/customersRouter'))

module.exports.handler = serverless(app)
