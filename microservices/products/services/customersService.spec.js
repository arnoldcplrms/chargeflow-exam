const customersService = require('./customersService')
const mongoose = require('mongoose')
const sampleObjectId = 'sampleObjectId'

const Customer = require('../models/customer')

mongoose.Types.ObjectId = jest.fn().mockImplementation(() => sampleObjectId)

const mockSave = jest
  .spyOn(Customer.prototype, 'save')
  .mockImplementation(jest.fn())

const mockFindById = jest
  .spyOn(Customer, 'findById')
  .mockImplementation(() => ({
    exec: () => jest.fn(),
  }))

const mockFind = jest.spyOn(Customer, 'find').mockImplementation(() => ({
  exec: () => jest.fn(),
}))

const testPayload = {
  name: 'name',
  address: 'address',
  email: 'email',
}
const mockId = 1

it('should call save', async () => {
  await customersService.addCustomer(testPayload)
  expect(mockSave).toHaveBeenCalled()
})

it('should call the findById method if id is supplied', async () => {
  await customersService.fetchCustomers(mockId)
  expect(mockFindById).toHaveBeenCalledWith(mockId)
})

it('should call the find method if id is not supplied', async () => {
  await customersService.fetchCustomers()
  expect(mockFind).toHaveBeenCalled()
})
