const { addCustomer, fetchCustomers } = require('../services/customersService')

const router = require('express').Router()

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    await addCustomer(req.body)
    res.status(201).send()
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/', async (req, res) => {
  try {
    res.json(await fetchCustomers())
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/:customerId', async (req, res) => {
  try {
    res.json(await fetchCustomers(req.params.customerId))
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router
