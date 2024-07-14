import { getDeliveryOption } from "./deliveryOptions";
class Cart {
    cartItems;
    #localStorageKey;
    constructor(localStorageKey) {
        this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }];
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }
    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }];
    }
    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        if (!matchingItem || !getDeliveryOption(deliveryOptionId)) {
            return;
        }
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
    updateCartQuantity(productId, newQuantity) {
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                cartItem.quantity = newQuantity;
            }
        });
        this.saveToStorage();
    }
    calculateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    }
    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    addToCart(productId, quantity) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        if (matchingItem) {
            matchingItem.quantity += quantity;
        }
        else {
            this.cartItems.push({
                productId,
                quantity,
                deliveryOptionId: '1'
            });
        }
        this.saveToStorage();
    }
    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
    }
    async loadCartFetch() {
        const response = await fetch('https://supersimplebackend.dev/cart');
        const message = await response.text();
        console.log(message);
        return message;
    }
    loadCart(fun) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            console.log(xhr.response);
            fun();
        });
        xhr.open('GET', 'https://supersimplebackend.dev/cart');
        xhr.send();
    }
}
export const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
