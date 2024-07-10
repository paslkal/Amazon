import {getProduct} from '../data/products.js'
import { orders } from '../data/orders.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateCartQuantity } from './amazon.js';

updateCartQuantity()

function formatDate(date) {
  return dayjs(date).format('dddd, MMMM D') 
}

function findProductDetails(orderId, productId) {
  for (const order of orders) {
    if (orderId === order.id) {
      const {products} = order
      for (const product of products) {
        if (productId === product.productId) {
          return {
            quantity: product.quantity,
            orderTime:order.orderTime,
            deliveryTime: product.estimatedDeliveryTime
          }
        }
      }
    }
  }
}

function calculateProgress(orderTime, deliveryTime) {
  const currentTime = dayjs()
  orderTime = dayjs(orderTime)
  deliveryTime = dayjs(deliveryTime)

  const percent = ((currentTime - orderTime)/(deliveryTime - orderTime)) * 100
  
  
  let status

  if (percent>=0 && percent<=49) {
    status = 1
  } else if (percent >= 50 && percent <= 99) {
    status = 2
  } else if (percent >= 100){
    status = 3
  }

  return {percent, status}
}

async function renderTracking() {
  const url = new URL(window.location.href)
  const orderId = url.searchParams.get('orderId')
  const productId = url.searchParams.get('productId')

  const product = await getProduct(productId) 
  const {image, name} = product
  const {quantity, orderTime, deliveryTime} = findProductDetails(orderId, productId)
  const {percent, status} = calculateProgress(orderTime, deliveryTime)

  const html = `
    <a class="back-to-orders-link link-primary" 
      href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${formatDate(deliveryTime)}
    </div>

    <div class="product-info">
      ${name}
    </div>

    <div class="product-info">
      Quantity: ${quantity}
    </div>

    <img class="product-image" src="${image}">

    <div class="progress-labels-container">
      <div class="progress-label ${status === 1 && 'current-status'}">
        Preparing
      </div>
      <div class="progress-label ${status === 2 && 'current-status'}">
        Shipped
      </div>
      <div class="progress-label ${status === 3 && 'current-status'}">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percent}%"></div>
    </div>
  `

  document.querySelector('.js-order-tracking').innerHTML = html
}

renderTracking()