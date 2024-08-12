const {pool} = require('./pool.js')
const {convertToCamelCase} = require('./camelCase.js')
async function getProducts() {
  try {
    const [products] = await pool.query(`
      select * from products  
    `)
    
    const camelCaseProducts = convertToCamelCase(products)

    return camelCaseProducts    
  } catch (error) {
    console.log(error)
    return
  }
}

module.exports = {
  getProducts
}

