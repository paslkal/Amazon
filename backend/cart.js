let cart = require('./data/cart.json')
const fs = require('fs')
const path = require('path')

function getCart() {
  const cartFromFile = JSON.parse(fs.readFileSync(
    path.resolve(__dirname,'./data', 'cart.json'), 'utf-8', (err, data) => {
      if (err) throw err
      return data
    }
  ))
  return cartFromFile
}

async function addToCart(productId, quantity) {
  let matchingItem

  const cartItems = getCart()

  cartItems.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem
    }
  })

  if (matchingItem) {
    matchingItem.quantity+=quantity
  } else {
    cartItems.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    })
  }

  fs.writeFileSync(
    path.resolve(__dirname,'./data', 'cart.json'), JSON.stringify(cartItems)
  )

  return cart
}

async function removeFromCart(productId) {
  const newCart = []

  const cartItems = getCart()

  cartItems.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  })

  // cart = newCart

  fs.writeFileSync(
    path.resolve(__dirname,'./data', 'cart.json'), JSON.stringify(cart)
  )

  return cart
}

async function updateCartQuantity(productId, newQuantity) {
  const cartItems = getCart()
  
  cartItems.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity
    } 
  })

  fs.writeFileSync(
    path.resolve(__dirname,'./data', 'cart.json'), JSON.stringify(cartItems)
  )

  return cart
}

function removeAllFromCart() {
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