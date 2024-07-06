import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
// import '../data/backend-practice.js' 

async function loadPage() {  
  try {
    // throw 'error1'

    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ])
    
    // await loadProductsFetch()
  
    // const value = await loadCartFetch()
  
  } catch (error) {
    console.log('Unexpected error. Please try again later.')
  }

  renderOrderSummary()
  renderPaymentSummary()
}
 
loadPage()

// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve('value2')
//     })
//   })
// ]).then((values) => {
//   console.table(values)
//   renderOrderSummary()
//   renderPaymentSummary()
// })

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve('value1') 
//   })
// }).then((value) => {
//   console.log(value)

//   return new Promise((resolve) => {
//     loadCart(() => {
//       resolve()
//     })
//   })
// }).then(() => {
//   renderOrderSummary()
//   renderPaymentSummary()
// })

// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary()
//     renderPaymentSummary()     
//   })
// })
