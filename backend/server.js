const express = require('express')
const app = express()
const http = require('http')
const port = process.env.port || 1000
const host = '127.0.0.1'
const products = require('./data/products.json')
const {v4 : uuidv4} = require('uuid')
const dayjs = require('dayjs')
const Cart = require('./cart.js')

app.use('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', false);  
  // res.setHeader("Access-Control-Allow-Private-Network", true);
  next()
})

app.get('/products', (req, res, next) => {
  res.json(products)
})

app.post('/orders', async (req, res, next) => {
  const body = await getCart(req)
  const cart = JSON.parse(body)
  const products = getProducts(cart)
  const order = {
    id: uuidv4(),
    orderTime: dayjs(),
    totalCostCents: calculateTotal(cart),
    products
  }
  Cart.removeAllFromCart()
  res.json(order)
})

app.get('/cart', (req, res, next) => {
  const cart = Cart.getCart()
  res.json(cart)
})

app.post('/cart', (req, res, next) => {
  body = ''
  req.on('data', (chunk) => {
    body += chunk
  }).on('end', async () => {
    const {productId, quantity} = JSON.parse(body)
    const cart = await Cart.addToCart(productId, quantity)
    res.json(cart)
  })
})

app.put('/cart', (req, res, next) => {
  body = ''
  req.on('data', (chunk) => {
    body += chunk
  }).on('end',async () => {
    const {productId, quantity} = JSON.parse(body)
    const cart = await Cart.updateCartQuantity(productId, quantity)
    res.json(cart)
  })
})

app.delete('/cart', (req, res, next) => {
  body=''
  req.on('data', (chunk) => {
    body += chunk
  }).on('end', async () => {
    const {productId} = JSON.parse(body)
    const cart = await Cart.removeFromCart(productId)
    res.json(cart)
  })
})

app.options('*', (req, res, next) => {
  res.send('Server recieves OPTIONS method, he is ok with it')
})

app.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`)
})

function getProduct(productId) {
  let matchingProduct

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product
    }
  })

  return matchingProduct
}


function getCart(req) {
  let body = ''
  return new Promise((resolve, reject) => {
    try {
      req.on('data', (chunk) => {
        body += chunk
      }).on('end', () => {
        resolve(body)
      })
    } catch (error) {
      console.log(error)
    }
  })
}

function getProducts(cart) {
  const products = []
  cart.forEach((cartItem) => {
    const product = {
      estimatedDeliveryTime : calculateEstimatedDeliveryDate(
        getDeliveryOption(cartItem.deliveryOptionId)
      ),
      productId : cartItem.productId,
      quantity : cartItem.quantity,
      variation : null,  
    }
    products.push(product)
  })
  
  return products
}
// TODO: Переписать это, используя ts и webpack/vite
//!start

function calculateTotal(cart) {
  let productPriceCents = 0
  let shippingPriceCents = 0

  cart.forEach(cartItem => {
    const product = getProduct(cartItem.productId)
    productPriceCents+= product.priceCents * cartItem.quantity

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
    shippingPriceCents+=deliveryOption.priceCents
  })

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents
  const taxCents = totalBeforeTaxCents * 0.1
  const totalCents = totalBeforeTaxCents + taxCents

  return totalCents
}

function isWeekend(date) {
  const dayOfWeek = date.format('dddd')
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'
}

function calculateEstimatedDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays
  let deliveryDate = dayjs()

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day')

    if (!isWeekend(deliveryDate)) {
      remainingDays--
    }
  }

  return deliveryDate
}

function getDeliveryOption(deliveryOptionId) {
  let deliveryOption = {
    id : 'someId',
    deliveryDays : -1,
    priceCents : -1
  }

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption
}

const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]
//!end