const http = require('http')
const fs = require('fs')
const port = process.env.port || 1000
const host = '127.0.0.1'
const products = require('./products.json')
const {v4 : uuidv4} = require('uuid')
const dayjs = require('dayjs')

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', false);

  if (req.url === '/products' && req.method === 'GET') {
    res.writeHead(200, {"Content-Type" : "application/json"})
    // res.write(JSON.stringify(products))
    res.end(JSON.stringify(products))
  } else if (req.url === '/cart' && req.method === 'GET') {
    res.writeHead(200, {"Content-Type" : "text-html"})
    res.write('load cart from local server')
    res.end()
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
    res.write(JSON.stringify(order))
    res.end()
  } else {
    res.writeHead(404, {"Content-Type" : "text/html"})
    // res.write({"Error" : "Unexpected error"})
    res.end('Unexpected Error 404')
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
  console.log(cart)
  const products = []
  for (const cartItem of cart) {
    const product = {
      estimatedDeliveryTime : calculateEstimatedDeliveryDate(getDeliveryOption(cartItem.deliveryOptionId)),
      productId : cartItem.productId,
      quantity : cartItem.quantity,
      variation : null,  
    }
    products.push(product)
  }

  return products
}
// TODO: Переписать это, используя ts и webpack/vite
//!start
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
server.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`)
})
