const express = require('express')
const app = express()
const port = 1000
const host = '127.0.0.1'
const {v4 : uuidv4} = require('uuid')
const dayjs = require('dayjs')
const Cart = require('./sql/cartSQL.js')
const {getProducts} = require('./sql/productsSQL.js')
const {calculateTotal} = require('./paymentSummary.js')
const {getProductsForOrder} = require('./products.js')
const {updateDeliveryOption} = require('./sql/deliveryOptionSQL.js')

app.use('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'false');  
  // res.setHeader("Access-Control-Allow-Private-Network", true);
  next()
})

app.use(express.json())

app.get('/products', async (req, res, next) => {
  const products = await getProducts()
  res.json(products)
})

app.post('/orders', async (req, res, next) => {
  const cart = req.body
  const products = getProductsForOrder(cart)
  const totalCostCents = await calculateTotal(cart) 
  const order = {
    id: uuidv4(),
    orderTime: dayjs(),
    totalCostCents,
    products
  }
  await Cart.removeAllFromCart()
  res.json(order)
})

app.get('/cart', async (req, res, next) => {
  const cart = await Cart.getCart()
  res.json(cart)
})

app.get('/cart/quantity', async (req, res, next) => {
  const cartQuantity = await Cart.calculateCartQuantity()
  res.send(cartQuantity)
})

// TODO: instead of cart send only product that have been added
app.post('/cart', async (req, res, next) => {
  const {productId, quantity} = req.body
  const cart = await Cart.addToCart(productId, quantity)
  res.json(cart)
})

// TODO: instead of cart send only product that have been updated
app.put('/cart', async (req, res, next) => {
  const {productId, quantity} = req.body
  const cart = await Cart.updateCartQuantity(productId, quantity)
  res.json(cart)
})

// TODO: instead of cart send only sorted cart by product id that been removed
app.delete('/cart', async (req, res, next) => {
  const {productId} = req.body
  const cart = await Cart.removeFromCart(productId)
  res.json(cart)
})

app.put('/delivery-option', async (req, res, next) => {
  try {
    const {productId, deliveryOptionId} = req.body
    const ids = ['1', '2', '3']
    if (!ids.includes(deliveryOptionId)) {
      throw Error(`There is no delivery_option_id = ${deliveryOptionId}`)
    }
    const cart = await updateDeliveryOption(productId, deliveryOptionId)  
    res.json(cart)    
  } catch (error) {
    console.log(error)
  }
})

app.options('*', (req, res, next) => {
  res.send('Server recieves OPTIONS method, he is ok with it')
})

app.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`)
})