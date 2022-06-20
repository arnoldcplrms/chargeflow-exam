// const customerModel = require('../models/customer')
const productsServices = require('./productsServices')
const mongoose = require('mongoose')
const sampleObjectId = 'sampleObjectId'

const Products = require('../models/products')

mongoose.Types.ObjectId = jest.fn().mockImplementation(() => sampleObjectId)

const mockSave = jest
  .spyOn(Products.prototype, 'save')
  .mockImplementation(jest.fn())

const mockFindById = jest
  .spyOn(Products, 'findById')
  .mockImplementation(() => ({
    exec: () => jest.fn(),
  }))

const mockFind = jest.spyOn(Products, 'find').mockImplementation(() => ({
  exec: () => jest.fn(),
}))

const testPayload = {
  name: 'name',
  description: 'description',
  price: 100,
}

const mockId = 1

it('should call save', async () => {
  await productsServices.addProduct(testPayload)
  expect(mockSave).toHaveBeenCalled()
})

it('should call the findById method if id is supplied', async () => {
  await productsServices.fetchProducts(mockId)
  expect(mockFindById).toHaveBeenCalledWith(mockId)
})

it('should call the find method if id is not supplied', async () => {
  await productsServices.fetchProducts()
  expect(mockFind).toHaveBeenCalled()
})
