const {getDeliveryOption} = require('./deliveryOptions.js')
const {getProduct} = require('./products.js')

async function calculateTotal(cart) {
  let productPriceCents = 0
  let shippingPriceCents = 0

  for (const cartItem of cart) {
    const product = await getProduct(cartItem.productId)
    productPriceCents+= product.priceCents * cartItem.quantity

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
    shippingPriceCents+=deliveryOption.priceCents
  }

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents
  const taxCents = totalBeforeTaxCents * 0.1
  const totalCostCents = totalBeforeTaxCents + taxCents
  
  return totalCostCents
}

module.exports = {
  calculateTotal
}