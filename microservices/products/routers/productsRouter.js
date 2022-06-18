const { addProduct, fetchProducts } = require('../services/productsServices')

const router = require('express').Router()

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    await addProduct(req.body)
    res.status(201).send()
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/', async (req, res) => {
  try {
    res.json(await fetchProducts())
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/:productId', async (req, res) => {
  try {
    res.json(await fetchProducts(req.params.productId))
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
