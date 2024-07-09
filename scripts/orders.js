import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from "./utils/money.js";
import { getProduct } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import { updateCartQuantity } from "./utils/cartQuantity.js";

function formatDate(date) {
  return dayjs(date).format('MMMM D')
}

async function renderOrders() {
  let html = ''

  for (const order of orders) {
    const orderId = order.id
    const {orderTime} = order
    const {totalCostCents} = order
    const {products} = order

    const orderHeaderHTML = `
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${formatDate(orderTime)}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${formatCurrency(totalCostCents)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${orderId}</div>
      </div>
    `
    
    let orderDetailsHTML = ''

    for (const product of products) {
      const {productId} = product
      const {quantity} = product
      const deliveryTime = product.estimatedDeliveryTime
      
      const productDetails = await getProduct(productId)
      const image = productDetails.image
      const name = productDetails.name

      orderDetailsHTML += `
        <div class="product-image-container">
          <img src="${image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formatDate(deliveryTime)}
          </div>
          <div class="product-quantity">
            Quantity: ${quantity}
          </div>
          <button class="buy-again-button js-buy-again-button button-primary"
          data-product-id="${productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${orderId}&productId=${productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `

    }
    
    html += `
      <div class="order-container">
        <div class="order-header">
          ${orderHeaderHTML}
        </div>
        <div class="order-details-grid">
          ${orderDetailsHTML}
        </div>
      </div>
    `
  }

  document.querySelector('.js-orders-grid').innerHTML = html
  
  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const {productId} = button.dataset
      cart.addToCart(productId, 1)
      updateCartQuantity()
    })
  })
}

updateCartQuantity()
renderOrders()