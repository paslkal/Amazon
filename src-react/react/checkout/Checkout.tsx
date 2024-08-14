import Header from "../shared/Header";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import { cart } from "../../data/cart-class";
import { loadProductsFetch } from "../../data/products";
import '../../../styles-sass/shared/general.scss'
import '../../../styles-sass/pages/checkout/checkout-header.scss'
import '../../../styles-sass/pages/checkout/checkout.scss'
import RenderPage from "../shared/RenderPage";

function Checkout() {
  return (
    <>
      <Header/>
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

export default async function loadPage() {  
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

