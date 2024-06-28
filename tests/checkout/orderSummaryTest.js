import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js'
import { cart } from '../../data/cart-class.js'

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

  beforeEach(() => {
    document.querySelector('.js-test-container').innerHTML =  `
    <div class="checkout-header-middle-section">
      Checkout (<a class="return-to-home-link js-checkout-header"
        href="amazon.html"></a>)
    </div>  
    
    <div class="js-order-summary"></div>

    <div class="js-payment-summary"></div>
    `
    cart.cartItems = [{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId:productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }]

    renderOrderSummary()
    
  })

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML =  ''
  })
  it('displays the cart', () => {  
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2)
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2')
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1')
    expect(document.querySelector(`.js-product-name-${productId1}`).innerText)
      .toContain('Black and Gray Athletic Cotton Socks - 6 Pairs')
    expect(document.querySelector(`.js-product-price-${productId1}`).innerText)
      .toContain('$10.90')
  })

  it('removes a product', () => {
      spyOn(localStorage, 'setItem') 

      document.querySelector(`.js-delete-link-${productId1}`).click()

      expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1)
      expect(document.querySelector(`.js-cart-item-container-${productId1}`))
        .toEqual(null)
      expect(document.querySelector(`.js-cart-item-container-${productId2}`))
        .not.toEqual(null)
      expect(cart.cartItems.length).toEqual(1)
      expect(cart.cartItems[0].productId).toEqual(productId2)
    })

    it('updating the delivery option', () => {
      document.querySelector(`.js-delivery-option-${productId1}-3`).click()
      
      expect(document.querySelector(
        `.js-delivery-option-input-${productId1}-3`
      ).checked).toEqual(true)
      expect(cart.cartItems.length).toEqual(2)
      expect(cart.cartItems[0].productId).toEqual(productId1)
      expect(cart.cartItems[0].deliveryOptionId).toEqual('3')
      expect(document.querySelector(
        '.js-shipping-price'
      ).innerText).toEqual('$14.98')
      expect(document.querySelector(
        '.js-total-price'
      ).innerText).toEqual('$63.50')
      
    })
})

