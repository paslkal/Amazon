const {pool} = require('./pool.js')
const {getCart} = require('./cartSQL.js')

async function updateDeliveryOption(productId, deliveryOptionId) {
  try {
    await pool.query(`
      update cart
      set delivery_option_id = ?
      where product_id = ?
    `, [deliveryOptionId, productId])

    return await getCart()    
  } catch (error) {
    console.log(error)
    return
  }
}

module.exports = {
  updateDeliveryOption
}