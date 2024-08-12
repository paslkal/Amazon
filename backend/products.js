const {calculateDeliveryDate, getDeliveryOption} = require('./deliveryOptions.js')
const {getProducts} = require('./sql/productsSQL.js')

async function getProduct(productId) {
  let matchingProduct

  const products = await getProducts()

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product
    }
  })

  return matchingProduct
}

function getProductsForOrder(cart) {
  const products = []
  cart.forEach((cartItem) => {
    const estimatedDeliveryTime = calculateDeliveryDate(
      getDeliveryOption(cartItem.deliveryOptionId)
    )
    const product = {
      estimatedDeliveryTime,
      productId : cartItem.productId,
      quantity : cartItem.quantity,
      variation : null,  
    }
    products.push(product)
  })
  
  return products
}

module.exports = {
  getProduct,
  getProductsForOrder
}