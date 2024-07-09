import { cart } from "../../data/cart-class.js"

export function updateCartQuantity() {
  document.querySelector('.js-cart-quantity')
    .innerHTML = cart.calculateCartQuantity()
}