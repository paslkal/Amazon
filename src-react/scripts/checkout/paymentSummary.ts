import { cart } from "../../data/cart-class"
import { getProduct } from "../../data/products";
import { getDeliveryOption } from "../../data/deliveryOptions";
import { formatCurrency } from "../utils/money";
import { addOrder } from "../../data/orders";
const port : number = 1000
const host : string = '127.0.0.1'

export async function renderPaymentSummary() {
  let productPriceCents = 0
  let shippingPriceCents = 0

  for (const cartItem of cart.cartItems) {
    const product = await getProduct(cartItem.productId)
    productPriceCents+= product.priceCents * cartItem.quantity

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
    shippingPriceCents+=deliveryOption.priceCents
  };

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents
  const taxCents = totalBeforeTaxCents * 0.1
  const totalCents = totalBeforeTaxCents + taxCents

  const paymentSummaryHTML =
  `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div class="js-items-quantity">Items ():</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-shipping-price">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-total-price">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary
      js-place-order  
    ">
      Place your order
    </button>
  `

  document.querySelector('.js-payment-summary')!
    .innerHTML = paymentSummaryHTML
 
  document.querySelector('.js-items-quantity')!
    .innerHTML = `Quantity: ${await cart.calculateCartQuantity()}`

  document.querySelector('.js-place-order')!
    .addEventListener('click',async () => {
      try {
        const response = await fetch(`http://${host}:${port}/orders`, {
          method: 'POST',
          body: JSON.stringify(cart.cartItems),
          headers: {
            'Content-type': 'application/json'
          }
        })
  
        const order = await response.json()
        addOrder(order)
        window.location.href = 'orders.html'
      } catch (error) {
        console.log('Unexpected error. Try again later')
        console.log(error)
      }
    })  
}