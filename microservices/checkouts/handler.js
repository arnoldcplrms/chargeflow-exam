const serverless = require('serverless-http')
const express = require('express')
const app = express()
require('dotenv/config')
const mongoose = require('mongoose')
const db = mongoose.connection
const bodyParser = require('body-parser')

mongoose.connect(process.env.MONGODB_CONNECTION_URL, () => {
  console.log('Connection successfull')
})

db.once('open', () => {
  console.log('Connected to Server')
}).on('error', (err) => {
  console.log('CONNECTION FAILED!')
  console.log(err)
})

app.use(bodyParser.json())

app.use('/checkouts', require('./routers/checkoutsRouter'))

exports.handler = serverless(app)
