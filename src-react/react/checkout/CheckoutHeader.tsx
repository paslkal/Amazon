import { useEffect, useState } from 'react';
import '../../../styles-sass/pages/checkout/checkout-header.scss'
import { cart } from '../../data/cart-class';

export default function CheckoutHeader() {
  const [cartQuantity, setCartQuantity] = useState('0')
  useEffect(() => {
      const fectchData = async () => {
        const cartQuantitySrting = await cart.calculateCartQuantity()
        setCartQuantity(cartQuantitySrting)
      }

      fectchData()
  }, [])
  
  return (
    <div className="checkout-header">
    <div className="header-content">
      <div className="checkout-header-left-section">
        <a href="amazon.html">
          <img className="amazon-logo" src="images/amazon-logo.png"/>
          <img className="amazon-mobile-logo" src="images/amazon-mobile-logo.png"/>
        </a>
      </div>
      <div className="checkout-header-middle-section">
        Checkout (<a className="return-to-home-link js-checkout-header"
          href="amazon.html">{cartQuantity}</a>)
      </div>
      <div className="checkout-header-right-section">
        <img src="images/icons/checkout-lock-icon.png"/>
      </div>
    </div>
  </div>
  );
}
