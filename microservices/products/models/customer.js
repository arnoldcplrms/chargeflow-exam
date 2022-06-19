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
  email: {
    type: String,
    required: true,
  },
})

module.exports =
  mongoose.models.Customer || mongoose.model('Customer', Customer)
