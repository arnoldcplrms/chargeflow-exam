const mongoose = require('mongoose')
const { Schema } = mongoose

const Product = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.models.Product || mongoose.model('Product', Product)
