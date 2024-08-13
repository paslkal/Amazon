import { cart } from "../../data/cart-class";

export async function renderCheckoutHeader() {
  document.querySelector('.js-checkout-header')!
    .innerHTML = await cart.calculateCartQuantity()
}