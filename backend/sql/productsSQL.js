const {pool} = require('./pool.js')

async function getProducts() {
  try {
    const [products] = await pool.query(`
      select * from products  
    `)
  
    return products    
  } catch (error) {
    console.log(error)
    return
  }
}

module.exports = {
  getProducts
}

