import dayjs from 'dayjs';
/*
import { orders } from "../data/orders";
import { formatCurrency } from "./utils/money";
import { getProduct } from "../data/products";
import { cart } from "../data/cart-class";
import updateCartQuantity from "./utils/updateCartQuantity";
import '../../styles-sass/shared/general.scss'
import '../../styles-sass/shared/amazon-header.scss'
import '../../styles-sass/pages/orders.scss'
*/
export function formatDate(date : dayjs.Dayjs | string) {
  return dayjs(date).format('MMMM D')
}
/*
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

  document.querySelector('.js-orders-grid')!.innerHTML = html
  
    document.querySelectorAll('.js-buy-again-button')
      .forEach((button) => {
        button.addEventListener('click', async () => {
          const {productId} = (<HTMLButtonElement>button).dataset
          if (!productId) {
            return
          }
          await cart.addToCart(productId, 1)
          updateCartQuantity()
        })
    })
}

updateCartQuantity()
renderOrders()
*/