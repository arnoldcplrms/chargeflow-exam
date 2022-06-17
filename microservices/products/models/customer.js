const { Schema, default: mongoose } = require('mongoose')

const Customer = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
})

exports.Customer = mongoose.model('Customer', Customer)
