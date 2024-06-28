import {cart } from "../../data/cart-class.js";

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem')
  })
  
  it('adds existing product to the cart', () => {
    cart.cartItems = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: '1'
    }]
    
    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop', JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      }]))
    expect(cart.cartItems.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart.cartItems[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
    expect(cart.cartItems[0].quantity).toEqual(2)
  })

  it('adds a new product to the cart', () => {
    cart.cartItems = []
    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop', JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      }]))
    expect(cart.cartItems.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart.cartItems[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
    expect(cart.cartItems[0].quantity).toEqual(1)
  })
})

describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem')

    cart.cartItems = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: '1'
    }]
  })

  it('remove a product that is in the cart', () => {
    cart.removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")

    expect(cart.cartItems.length).toEqual(0)
  })

  it('remove a product that is not in the cart', () => {
    cart.removeFromCart("15b6fc6f-327a-4ec4-896f-486349e85a3d")

    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop', JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      }])
    )
    expect(cart.cartItems.length).toEqual(1)
    expect(cart.cartItems[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
    expect(cart.cartItems[0].quantity).toEqual(1)
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1')
  })
})

describe('test suite: updateDeliveryOption', () => {
  const productId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6" 
  beforeEach(() => {
    spyOn(localStorage, 'setItem')

    cart.cartItems = [{
      productId,
      quantity: 1,
      deliveryOptionId: '1'
    }]
  })
  it('update delivery option when productId is in the cart', () => {
    cart.updateDeliveryOption(productId, '3')

    expect(cart.cartItems[0].deliveryOptionId).toEqual('3')
    expect(cart.cartItems.length).toEqual(1)
    expect(cart.cartItems[0].productId).toEqual(productId)
    expect(cart.cartItems[0].quantity).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId,
      quantity: 1,  
      deliveryOptionId: '3'
    }]))
  })
  
  it('do not update delivery option when productId is not in the cart', () => {
    cart.updateDeliveryOption('abc', '3')

    expect(cart.cartItems[0].deliveryOptionId).toEqual('1')
    expect(cart.cartItems.length).toEqual(1)
    expect(cart.cartItems[0].productId).toEqual(productId)
    expect(cart.cartItems[0].quantity).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
  })

  it('do not update delivery option when deliveryOptionId that does not exist', () => {
    cart.updateDeliveryOption(productId, 'abc')

    expect(cart.cartItems[0].deliveryOptionId).toEqual('1')
    expect(cart.cartItems.length).toEqual(1)
    expect(cart.cartItems[0].productId).toEqual(productId)
    expect(cart.cartItems[0].quantity).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
  })
  
})    