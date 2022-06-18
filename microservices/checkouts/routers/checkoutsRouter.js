const {
  createCheckout,
  confirmCheckout,
} = require('../services/checkoutsServices')

const router = require('express').Router()

router.post('/', async (req, res) => {
  try {
    await createCheckout(req.body)
    res.status(201).send()
  } catch (error) {
    res.status(500).json(error)
  }
})

router.put('/confirm', async (req, res) => {
  try {
    const { checkoutId, customerId } = req.body
    await confirmCheckout(checkoutId, customerId)
    res.status(201).send()
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router
