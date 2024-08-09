import { cart } from "../../data/cart-class"

export default async function updateCartQuantity() {
  document.querySelector('.js-cart-quantity')!
    .innerHTML = await cart.calculateCartQuantity()
}
