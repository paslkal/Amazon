import {getProduct} from '../data/products.js'
import { orders } from '../data/orders.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

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
            deliveryTime: product.estimatedDeliveryTime
          }
        }
      }
    }
  }
}

async function renderTracking() {
  const url = new URL(window.location.href)
  const orderId = url.searchParams.get('orderId')
  const productId = url.searchParams.get('productId')

  const product = await getProduct(productId) 
  const {image} = product
  const {name} = product
  const {quantity} = findProductDetails(orderId, productId)
  const {deliveryTime} = findProductDetails(orderId, productId)
  
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
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `

  document.querySelector('.js-order-tracking').innerHTML = html
}

renderTracking()