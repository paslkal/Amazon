import CheckoutHeader from "./CheckoutHeader";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import RenderPage from "../shared/RenderPage";
import { cart } from "../../data/cart-class";
import { useEffect, useState } from "react";
import { Product, getProduct, loadProductsFetch } from "../../data/products";
import '../../../styles-sass/pages/checkout/checkout.scss'

function Checkout() {
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadPage()
    const fetchProducts = async () => {
      const productPromises = cartItems.map((cartItem) =>
        getProduct(cartItem.productId)
      );
      const productsData = await Promise.all(productPromises);
      setProducts(productsData);
    };
    fetchProducts();
  }, [cartItems]);

  const props = {
    cartItems,
    setCartItems,
    products
  }

  return (
    <>
      <CheckoutHeader/>
      <div className="main">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary {...props}/>
          <PaymentSummary {...props}/>
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

RenderPage(Checkout)

