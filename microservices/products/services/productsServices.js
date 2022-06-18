const mongoose = require('mongoose')

const { Product } = require('../models/products')

exports.fetchProducts = async (id) => {
  if (!!id) {
    return Product.findById(id).exec()
  }
  // this should have pagination implementation in real life
  const result = await Product.find().exec()
  return result
}

exports.addProduct = async (body) => {
  await new Product({
    id: new mongoose.Types.ObjectId(),
    name: body.name,
    description: body.description,
    price: body.price,
  }).save()
}
