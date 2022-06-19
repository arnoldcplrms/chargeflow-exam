const mongoose = require('mongoose')

const Customer = require('../models/customer')

exports.fetchCustomers = async (id) => {
  if (!!id) {
    return Customer.findById(id).exec()
  }
  // this should have pagination implementation
  const result = await Customer.find().exec()
  return result
}

exports.addCustomer = async (body) => {
  await new Customer({
    id: new mongoose.Types.ObjectId(),
    name: body.name,
    address: body.address,
    email: body.email,
  }).save()
}
