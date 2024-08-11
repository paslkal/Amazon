const fs = require('fs')
const mysql = require('mysql2');
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path: path.resolve(__dirname, '.env')})

connection = mysql.createConnection({
  host: process.env['MYSQL_HOST'],
  port: process.env['MYSQL_PORT'],
  user: process.env['MYSQL_USER'],
  password: process.env['MYSQL_PASSWORD'],
  database: process.env['MYSQL_DATABASE']
});

function loadProductsIntoSQL() {
  const products = require('../data/products.json')
  
  products.forEach(product => {
    connection.query(
      `INSERT INTO products (id, image, name, rating, price_cents, keywords, type, size_chart_link, appliance_instructions, appliance_warranty) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        product.id, 
        product.image, 
        product.name, 
        JSON.stringify(product.rating), 
        product.priceCents, 
        JSON.stringify(product.keywords), 
        product.type || null, 
        product.sizeChartLink || null, 
        product.applienceInstructions || null,
        product.applienceWarranty || null
      ],
      (err, results) => {
        if (err) throw err;
        console.log('Inserted product:', product.name);
      }
    );
  });
  
}

function loadCartIntoSQL() {
  const cart = require('../data/cart.json');
  
  cart.forEach(cartItem => {
    connection.query(
      `INSERT INTO cart (product_id, quantity, delivery_option_id) 
      VALUES (?, ?, ?)`,
      [cartItem.productId, cartItem.quantity, cartItem.deliveryOptionId],
      (err, results) => {
        if (err) throw err;
        console.log('Inserted cart item for product ID:', cartItem.productId);
      }
    );
  });
}

loadProductsIntoSQL()
loadCartIntoSQL()

connection.end();
