const { Schema, default: mongoose } = require('mongoose')

const Checkout = new Schema({
  productId: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  confirmedCheckoutAt: {
    type: Date,
    default: null,
  },
})

module.exports =
  mongoose.models.Checkout || mongoose.model('Checkout', Checkout)
