const path = require('path')
const dotenv = require('dotenv')
const mysql = require('mysql2')
dotenv.config({path: path.resolve(__dirname, '.env')})

const pool = mysql.createPool({
  host: process.env['MYSQL_HOST'],
  port: process.env['MYSQL_PORT'],
  user: process.env['MYSQL_USER'],
  password: process.env['MYSQL_PASSWORD'],
  database: process.env['MYSQL_DATABASE']
}).promise()


module.exports = {
  pool
}