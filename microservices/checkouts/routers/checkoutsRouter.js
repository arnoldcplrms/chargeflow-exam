const {
  createCheckout,
  confirmCheckout,
  fetchCheckouts,
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

router.get('/', async (req, res) => {
  try {
    res.json(await fetchCheckouts())
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/:checkoutId', async (req, res) => {
  try {
    res.json(await fetchCheckouts(req.params.checkoutId))
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
