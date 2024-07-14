import { cart } from "../../data/cart-class";
export function renderCheckoutHeader() {
    document.querySelector('.js-checkout-header')
        .innerHTML = cart.calculateCartQuantity().toString();
}
