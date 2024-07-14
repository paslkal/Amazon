import {getProduct} from '../data/products'
import { orders } from '../data/orders'
import dayjs from 'dayjs';  
import { updateCartQuantity } from './amazon';

updateCartQuantity()

function formatDate(date : dayjs.Dayjs | string) {
  return dayjs(date).format('dddd, MMMM D') 
}

function findProductDetails(orderId : string, productId : string) {
  const fakeProductDetails = {
    quantity: 1,
    orderTime: '2024-01-01',
    deliveryTime: '2025-01-01'
  } 
  for (const order of orders) {
    if (orderId === order.id) {
      const {products} = order
      for (const product of products) {
        if (productId === product.productId) {
          
          const productDetails = {
            quantity: product.quantity,
            orderTime : order.orderTime,
            deliveryTime: product.estimatedDeliveryTime
          } 

          return productDetails
        }
      }
    }
  }

  return fakeProductDetails
}

function calculateProgress(orderTime : dayjs.Dayjs | string, deliveryTime : dayjs.Dayjs | string) {
  const newCurrentTime = dayjs().get('date')
  const newOrderTime = dayjs(orderTime).get('date')
  const newDeliveryTime = dayjs(deliveryTime).get('date')

  const percent = 
    ((newCurrentTime - newOrderTime)/(newDeliveryTime - newOrderTime)) * 100
  
  let status : number = 0

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
  if (!productId || !orderId) {
    return
  }

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

  document.querySelector('.js-order-tracking')!.innerHTML = html
}

renderTracking()