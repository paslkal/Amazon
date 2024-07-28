import { getDeliveryOption } from "./deliveryOptions"
const port : number = 1000
const host : string = '127.0.0.1'

export interface CartItem {
  productId : string,
  quantity : number,
  deliveryOptionId : string
}

class Cart {
  cartItems : CartItem[]
  #localStorageKey : string

  constructor(localStorageKey : string) {
    this.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }]
    this.#localStorageKey = localStorageKey
    this.#loadFromStorage()
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)!) || [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }]
  }

    updateDeliveryOption(productId : string, deliveryOptionId : string) {
      let matchingItem : CartItem | undefined
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem
        }
      })

      if (!matchingItem || !getDeliveryOption(deliveryOptionId)) {
        return
      }
    
      matchingItem.deliveryOptionId = deliveryOptionId
    
      this.saveToStorage()
    }
  
    updateCartQuantity(productId : string, newQuantity : number) {
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.quantity = newQuantity
        } 
      })
    
      this.saveToStorage()
    }
  
    calculateCartQuantity() {
      let cartQuantity = 0
    
      this.cartItems.forEach((cartItem) => {
        cartQuantity+= cartItem.quantity
      })
    
      return cartQuantity
    }
  
    saveToStorage() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
    }
    
    addToCart(productId : string, quantity : number) {
      let matchingItem : CartItem | undefined
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem
        }
      })
    
      if (matchingItem) {
        matchingItem.quantity+=quantity
      } else {
        this.cartItems.push({
          productId,
          quantity,
          deliveryOptionId: '1'
        })
      }
    
      this.saveToStorage()
    }
  
    removeFromCart(productId : string) {
      const newCart : CartItem[] = []
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem)
        }
      })
    
      this.cartItems = newCart
    
      this.saveToStorage()
    }

    async loadCartFetch() {
      const response = await fetch(`http://${host}:${port}/cart`)
      const message = await response.text()
      console.log(message)
      return message
    }
    
    loadCart(fun : Function) {
      const xhr = new XMLHttpRequest()
      xhr.addEventListener('load', () => {
        console.log(xhr.response)
    
        fun()
      })
      xhr.open('GET', `http://${host}:${port}/cart`)
      xhr.send()
    }
    
}  


export const cart = new Cart('cart-oop')
// const businessCart = new Cart('cart-business')
