const { axiosInstance } = require('../../../utils/axiosInstance')
const { sendSQSMessage } = require('../../../utils/sendSQSMessage')

const Checkout = require('../models/checkouts')

const fetchCustomerDetails = async (customerId) => {
  const result = await axiosInstance.get(`/customer/${customerId}`)
  delete result.data._id
  return result.data
}

const fetchProductDetails = async (productId) => {
  const result = await axiosInstance.get(`/products/${productId}`)
  delete result.data._id
  return result.data
}

exports.createCheckout = async (body) => {
  await new Checkout({
    productId: body.productId,
    customerId: body.customerId,
  }).save()
}

exports.confirmCheckout = async (checkoutId, customerId) => {
  const result = await Checkout.findOneAndUpdate(
    { id: checkoutId, customerId },
    { confirmedCheckoutAt: new Date() },
    { returnOriginal: true },
  ).exec()

  const [customer, product] = await Promise.all([
    fetchCustomerDetails(customerId),
    fetchProductDetails(result.productId),
  ])

  await sendSQSMessage(process.env.EMAIL_QUEUE_URL, { customer, product })
}
