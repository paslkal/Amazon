const fs = require('fs')
const path = require('path')

function getCart() {
  const filePath = path.resolve(__dirname,'./data', 'cart.json')
  const cartString = fs.readFileSync(filePath, 'utf-8')
  const cartFromFile = JSON.parse(cartString)
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

  return cartItems
}

async function removeFromCart(productId) {
  const newCart = []

  const cartItems = getCart()

  cartItems.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  })

  fs.writeFileSync(
    path.resolve(__dirname,'./data', 'cart.json'), JSON.stringify(newCart)
  )

  return cartItems
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

  return cartItems
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