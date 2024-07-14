import { cart } from "../../data/cart-class";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions";
import { getProduct } from "../../data/products";
import { formatCurrency } from "../utils/money";
import { renderPaymentSummary } from './paymentSummary';
import { renderCheckoutHeader } from './checkoutHeader';
function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
        const dateString = calculateDeliveryDate(deliveryOption);
        const priceString = deliveryOption.priceCents === 0
            ? 'Free'
            : `$${formatCurrency(deliveryOption.priceCents)} -`;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId && 'checked';
        html +=
            `
      <div class="delivery-option 
        js-delivery-option
        js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}"  
      >
        <input type="radio" ${isChecked}
          class="delivery-option-input
          js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>  
      </div>
    `;
    });
    return html;
}
export async function renderOrderSummary() {
    let cartSummaryHTML = '';
    renderCheckoutHeader();
    for (const cartItem of cart.cartItems) {
        const { productId } = cartItem;
        const matchingProduct = await getProduct(productId);
        const { deliveryOptionId } = cartItem;
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        const dateString = calculateDeliveryDate(deliveryOption);
        cartSummaryHTML +=
            `
      <div class="cart-item-container 
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}
      ">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name
              js-product-name-${matchingProduct.id}
            ">
              ${matchingProduct.name}
            </div>
            <div class="product-price
              js-product-price-${matchingProduct.id}
            ">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity
              js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label
                  js-quantity-label
                ">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary
                js-update-link" data-product-id="${matchingProduct.id}" 
              >
                Update
              </span>
              <input class="quantity-input js-quantity-input"/>
              <span class="save-quantity-link link-primary
                js-save-quantity-link" data-product-id="${matchingProduct.id}"
              ">
                Save
              </span>
              <span class="delete-quantity-link link-primary
              js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
      </div>
    `;
    }
    ;
    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML;
    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            if (!productId) {
                return;
            }
            cart.removeFromCart(productId);
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
    document.querySelectorAll('.js-update-link')
        .forEach((link) => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');
        });
    });
    document.querySelectorAll('.js-save-quantity-link')
        .forEach((link) => {
        const { productId } = link.dataset;
        if (!productId) {
            return;
        }
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        const input = container.querySelector('.js-quantity-input');
        const updateQuantity = () => {
            const newQuantity = Number(input.value);
            if (newQuantity <= 0 || newQuantity >= 1000) {
                alert('Quantity must be at least 1 and less than 1000');
                return;
            }
            cart.updateCartQuantity(productId, newQuantity);
            input.value = '';
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
            container.classList.remove('is-editing-quantity');
        };
        link.addEventListener('click', updateQuantity);
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                updateQuantity();
            }
        });
    });
    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
        element.addEventListener('click', () => {
            const { productId, deliveryOptionId } = element.dataset;
            if (!productId || !deliveryOptionId) {
                return;
            }
            cart.updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
