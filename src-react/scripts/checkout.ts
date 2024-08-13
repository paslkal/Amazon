import { renderOrderSummary } from "./checkout/orderSummary";
import { renderPaymentSummary } from "./checkout/paymentSummary";
import { loadProductsFetch } from "../data/products";
import { cart } from "../data/cart-class";
import '../../styles-sass/shared/general.scss'
import '../../styles-sass/pages/checkout/checkout-header.scss'
import '../../styles-sass/pages/checkout/checkout.scss'

// import '../data/backend-practice.js' 

export default async function loadPage() {  
  try {
    // throw 'error1'

    await Promise.all([
      loadProductsFetch(),
      cart.loadCartFetch()
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
