// const customerModel = require('../models/customer')
const checkoutsServices = require('./checkoutsServices')
const mongoose = require('mongoose')
const sampleObjectId = 'sampleObjectId'
const sendSQSMessage = require('../../../utils/sendSQSMessage')
const Checkouts = require('../models/checkouts')

const mockCheckoutId = 1
const mockCustomerId = 2
const mockProductId = 3
const mockDate = new Date('2019-05-14T11:01:58.135Z')
const mockQUrl = 'mockQUrl'
process.env.EMAIL_QUEUE_URL = mockQUrl

jest.useFakeTimers().setSystemTime(mockDate)

mongoose.Types.ObjectId = jest.fn().mockImplementation(() => sampleObjectId)
const mockSave = jest
  .spyOn(Checkouts.prototype, 'save')
  .mockImplementation(jest.fn())

const mockFindOneAndUpdate = jest
  .spyOn(Checkouts, 'findOneAndUpdate')
  .mockImplementation(() => ({
    exec: () => Promise.resolve({ productId: mockProductId }),
  }))

jest.mock('axios', () => ({
  default: {
    create: () => ({
      get: (url) => {
        switch (url) {
          case `/customer/${mockCustomerId}`:
            return Promise.resolve({ data: customer })
          case `/products/${mockProductId}`:
            return Promise.resolve({ data: product })
        }
      },
    }),
  },
}))

const sqsClass = class {
  sendMessage() {
    return {
      promise: jest.fn(),
    }
  }
}

const mockSendMessage = (sqsClass.prototype.sendMessage = jest
  .fn()
  .mockImplementation(() => ({
    promise: jest.fn(),
  })))

jest.mock('./../../../utils/AWSInstance', () => ({
  SQS: sqsClass,
}))

const product = {
  _id: '62acb359ee513208425c0aae',
  name: 'Product 1',
  description: 'First Product',
  price: 100,
}

const customer = {
  _id: '62acbd52388f82beb4d2775a',
  name: 'John Doe',
  address: 'Some address PH',
  __v: 0,
  email: 'arnoldcplrms@gmail.com',
}

it('should call save', async () => {
  await checkoutsServices.createCheckout({
    productId: mockProductId,
    customerId: mockCustomerId,
  })
  expect(mockSave).toHaveBeenCalled()
})

it('should call the FindOneAndUpdate method and sqs send message with corrrect params', async () => {
  await checkoutsServices.confirmCheckout(mockCheckoutId, mockCustomerId)
  expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
    {
      id: mockCheckoutId,
      customerId: mockCustomerId,
    },
    { confirmedCheckoutAt: mockDate },
    { returnOriginal: true },
  )
  expect(mockSendMessage).toHaveBeenCalledWith({
    QueueUrl: mockQUrl,
    MessageBody: JSON.stringify({ customer, product }),
  })
})
