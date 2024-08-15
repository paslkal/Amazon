import CheckoutHeader from "./CheckoutHeader";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import RenderPage from "../shared/RenderPage";
import { cart } from "../../data/cart-class";
import { loadProductsFetch } from "../../data/products";
import '../../../styles-sass/shared/general.scss'
import '../../../styles-sass/pages/checkout/checkout.scss'
import { useEffect } from "react";

function Checkout() {
  useEffect(() => {
    loadPage()    
  }, [])

  return (
    <>
      <CheckoutHeader/>
      <div className="main">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary/>
          <PaymentSummary/>
        </div>
      </div>
    </>
  )
}

async function loadPage() {  
  try {
    await Promise.all([
      loadProductsFetch(),
      cart.loadCartFetch()
    ])
  
  } catch (error) {
    console.log('Unexpected error. Please try again later.')
  }
}

RenderPage(<Checkout/>)

