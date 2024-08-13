import ReactDOM from "react-dom/client";
import Header from "../Header";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import loadPage from "../../scripts/checkout";
import '../../../styles-sass/shared/general.scss'
import '../../../styles-sass/pages/checkout/checkout-header.scss'
import '../../../styles-sass/pages/checkout/checkout.scss'

loadPage()

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

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Checkout/>);
}
