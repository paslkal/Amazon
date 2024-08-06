const http = require('http')
const fs = require('fs')
const port = process.env.port || 1000
const host = '127.0.0.1'
const products = require('./data/products.json')
// const cart = require('./data/cart.json')
const {v4 : uuidv4} = require('uuid')
const dayjs = require('dayjs')
const Cart = require('./cart.js')

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', false);
  // res.setHeader("Access-Control-Allow-Private-Network", true);

  if (req.url === '/products' && req.method === 'GET') {
    res.writeHead(200, {"Content-Type" : "application/json"})
    // res.write(JSON.stringify(products))
    res.end(JSON.stringify(products))
  } else if (req.url === '/orders' && req.method === 'POST') {
    res.writeHead(200, {"Content-Type" : "application/json"})
    const body = await getCart(req)
    const cart = JSON.parse(body)
    /*
    estimatedDeliveryTime : "2024-07-18T19:51:49.023Z"
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d"
    quantity : 2
    variation : null
    */
    const products = getProducts(cart)
    const order = {
      id: uuidv4(),
      orderTime: dayjs(),
      totalCostCents: calculateTotal(cart),
      products
    }
    await Cart.removeAllFromCart()
    res.end(JSON.stringify(order))
  } else if (req.url === '/cart' && req.method === 'GET') {
    res.writeHead(200, {"Content-Type" : "application/json"})
    const cart = Cart.getCart()
    res.end(JSON.stringify(cart))
  } else if (req.url === '/cart' && req.method === 'POST') { // add new product
    body = ''
    req.on('data', (chunk) => {
      body += chunk
    }).on('end', async () => {
      const {productId, quantity} = JSON.parse(body)
      const cart = await Cart.addToCart(productId, quantity)
      res.writeHead(200, {"Content-Type" : "application/json"})
      res.end(JSON.stringify(cart))
    })
  } else if (req.url === '/cart' && req.method === 'PUT') { // update cart
    body = ''
    req.on('data', (chunk) => {
      body += chunk
    }).on('end',async () => {
      const {productId, quantity} = JSON.parse(body)
      const cart = await Cart.updateCartQuantity(productId, quantity)
      res.writeHead(200, {"Content-Type" : "application/json"})
      res.end(JSON.stringify(cart))
    })
  } else if (req.url === '/cart' && req.method === 'DELETE') {
    body=''
    req.on('data', (chunk) => {
      body += chunk
    }).on('end', async () => {
      const {productId} = JSON.parse(body)
      const cart = await Cart.removeFromCart(productId)
      res.writeHead(200, {"Content-Type" : "application/json"})
      res.end(JSON.stringify(cart))
    })
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, {"Content-type":"text/html"})
    res.end('Server recieves OPTIONS method, he is ok with it')
  } 
  else {
    res.writeHead(404, {"Content-Type" : "text/html"})
    res.end("Unexpected error 404: Not Found")
  }
})

function calculateTotal(cart) {
  let total = 0
  for (const cartItem of cart) {
    for (const product of products) {
      if (product.id === cartItem.productId) {
        total += product.priceCents
      }
    }
  }

  return total
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
function isWeekend(date) {
  const dayOfWeek = date.format('dddd')
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'
}

//!except that(start)
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
//!end
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
server.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`)
})
