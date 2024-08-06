let cart = require('./data/cart.json')
const fs = require('fs')
const path = require('path')
function getCart() {
  return cart
}

async function addToCart(productId, quantity) {
  let matchingItem
    
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem
    }
  })

  if (matchingItem) {
    matchingItem.quantity+=quantity
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    })
  }

  fs.writeFileSync(
    path.resolve(__dirname,'./data', 'cart.json'), JSON.stringify(cart)
  )

  return cart
}

async function removeFromCart(productId) {
  const newCart = []

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  })

  cart = newCart

  fs.writeFileSync(
    path.resolve(__dirname,'./data', 'cart.json'), JSON.stringify(cart)
  )

  return cart
}

async function updateCartQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity
    } 
  })

  fs.writeFileSync(
    path.resolve(__dirname,'./data', 'cart.json'), JSON.stringify(cart)
  )

  return cart
}

async function removeAllFromCart() {
  fs.writeFileSync(
    path.resolve(__dirname,'./data', 'cart.json'), JSON.stringify([])
  )
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  removeAllFromCart
}