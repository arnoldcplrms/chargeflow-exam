const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect(process.env.MONGODB_CONNECTION_URL, () => {
  console.log('Connection successfull')
})

exports.dbConnection = () => {
  db.once('open', () => {
    console.log('Connected to Server')
  }).on('error', (err) => {
    console.log('CONNECTION FAILED!')
    console.log(err)
  })
}
