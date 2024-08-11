const {pool} = require('./pool.js')

async function getCart() {
  try {
    const [cart] = await pool.query(`
      select * from cart  
    `)
 
    return cart    
  } catch (error) {
    console.log(error)
    return
  }
}

async function addToCart(productId, quantity) {
  try {
    let matchingItem
  
    const cartItems = await getCart()
  
    cartItems.forEach((cartItem) => {
      if (productId === cartItem['product_id']) {
        matchingItem = cartItem
      }
    })
  
    if (matchingItem) {
      const newQuantity = quantity + matchingItem['quantity']
      await pool.query(`
        update cart 
        set quantity = ? 
        where product_id = ?;
      `, [newQuantity, productId])
    } else {
      await pool.query(`
        insert into cart (product_id, quantity, delivery_option_id)
        values (?, ?, '1');
      `, [productId, quantity])
    }
    
    return await getCart()
  } catch (error) {
    console.log(error)
    return
  }
}

async function removeFromCart(productId) {
  try {
    await pool.query(`
      delete from cart 
      where product_id = ?;  
    `, [productId])

    return await getCart()
  } catch (error) {
    console.log(error)
    return
  }
}


async function updateCartQuantity(productId, newQuantity) {
  try {
    await pool.query(`
      update cart
      set quantity = ?
      where product_id = ?  
      `, [newQuantity, productId])
      
    return await getCart()    
  } catch (error) {
    console.log(error)
  }
}

async function removeAllFromCart() {
  try {
    await pool.query(`
      delete from cart  
    `)

    return await getCart()
  } catch (error) {
    console.log(error)
    return
  }
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  removeAllFromCart
}