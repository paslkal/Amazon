import { cart } from "../../data/cart-class.js";

export function renderCheckoutHeader() {
  document.querySelector('.js-checkout-header')
    .innerHTML = cart.calculateCartQuantity();

}