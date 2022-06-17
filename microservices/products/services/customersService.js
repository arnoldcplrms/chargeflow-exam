const mongoose = require('mongoose')

const { Customer } = require('../models/customer')

exports.fetchCustomers = async () => {
  // this should have pagination implementation
  const result = await Customer.find().exec()
  return result
}

exports.addCustomer = async (body) => {
  await new Customer({
    id: new mongoose.Types.ObjectId(),
    name: body.name,
    address: body.address,
  }).save()
}
