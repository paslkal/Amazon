import { useEffect, useState } from "react"
import { getProduct } from "../../data/products"
import { getDeliveryOption } from "../../data/deliveryOptions"
import { cart } from "../../data/cart-class"
import { formatCurrency } from "../../scripts/utils/money"
import { addOrder } from "../../data/orders"
import CheckoutProps from "./checkoutProps"
import getEnv from "../getEnv"

const { port, host } = getEnv()

export default function PaymentSummary(props: CheckoutProps) {
  const {cartItems} = props
  const [cartQuantity, setCartQuantity] = useState('0')
  const [productPrice, setProductPrice] = useState(0)
  const [shippingPrice, setShippingPrice] = useState(0)
  const [totalBeforeTax, setTotalBeforeTax] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {    
    const fetchData = async () => {
      let productPriceCents = 0
      let shippingPriceCents = 0

      setCartQuantity(await cart.calculateCartQuantity()) 
      
      for (const cartItem of cartItems) {
        const product = await getProduct(cartItem.productId)
        productPriceCents += product.priceCents * cartItem.quantity

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
        shippingPriceCents += deliveryOption.priceCents
      }

      const totalBeforeTaxCents = productPriceCents + shippingPriceCents
      const taxCents = totalBeforeTaxCents * 0.1
      const totalCents = totalBeforeTaxCents + taxCents


      setProductPrice(productPriceCents)
      setShippingPrice(shippingPriceCents)
      setTotalBeforeTax(totalBeforeTaxCents) 
      setTax(taxCents)
      setTotal(totalCents)
    }

    fetchData()
  }, [cartItems])

  const handlePlaceOrder = async() => {
    try {
      const response = await fetch(`http://${host}:${port}/orders`, {
        method: 'POST',
        body: JSON.stringify(cart.cartItems),
        headers: {
          'Content-type': 'application/json'
        }
      })
  
      const order = await response.json()
      addOrder(order)
      window.location.href = 'orders.html'
    } catch (error) {
      console.log('Unexpected error. Try again later')
      console.log(error)
    }
  }

  return (
    <div id="payment-summary">
      <div className="payment-summary js-payment-summary">
        <div className="payment-summary-title">
          Order Summary
        </div>
        <div className="payment-summary-row">
          <div className="js-items-quantity">Items ({cartQuantity}):</div>
          <div className="payment-summary-money">{formatCurrency(productPrice)}</div>
        </div>
        <div className="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div className="payment-summary-money js-shipping-price">
            {formatCurrency(shippingPrice)}
          </div>
        </div>
        <div className="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div className="payment-summary-money">{formatCurrency(totalBeforeTax)}</div>
        </div>
        <div className="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div className="payment-summary-money">{formatCurrency(tax)}</div>
        </div>
        <div className="payment-summary-row total-row">
          <div>Order total:</div>
          <div className="payment-summary-money js-total-price">
            {formatCurrency(total)}
          </div>
        </div>

        <button className="place-order-button button-primary js-place-order"
          onClick={() => handlePlaceOrder()}  
        >
          Place your order
        </button>    
      </div>
    </div>
  )
}

