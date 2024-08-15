import { useEffect, useState } from "react"
import { Order } from "../../data/orders"
import { getProduct } from "../../data/products"
import { formatDate } from "../../scripts/orders"
import { Product } from "../../data/products"
import { cart } from "../../data/cart-class"
import updateCartQuantity from "../../scripts/utils/updateCartQuantity"

export default function OrderDetails({order} : {order: Order}) {
  const { products: orderProducts } = order
  const orderId = order.id

  const [productsDetails, setProductsDetails] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const promises = orderProducts.map((product) => getProduct(product.productId));
      const awaitProductsDetails = await Promise.all(promises);
      setProductsDetails(awaitProductsDetails);
    };
    
    fetchData();
    
  }, [])

  return (
    orderProducts.map((product) => {
      const {productId} = product
      const {quantity} = product
      const deliveryTime = product.estimatedDeliveryTime
      
      const productDetails = productsDetails.find((p) => p.id === productId)
      if (!productDetails) return null;
      const image = productDetails.image
      const name = productDetails.name
      
      const handleBuyAgain = async (productId : string) => {
        if (!productId) return
        await cart.addToCart(productId, 1)
        updateCartQuantity()
      }

      return (
        <div key={productId}>
          <div className="product-image-container">
            <img src={image}/>
          </div>

          <div className="product-details">
            <div className="product-name">
              {name}
            </div>
            <div className="product-delivery-date">
              Arriving on: {formatDate(deliveryTime)}
            </div>
            <div className="product-quantity">
              Quantity: {quantity}
            </div>
            <button className="buy-again-button js-buy-again-button button-primary"
            data-product-id={productId} 
            onClick={() => handleBuyAgain(productId)}>
              <img className="buy-again-icon" src="images/icons/buy-again.png"/>
              <span className="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div className="product-actions">
            <a href={`tracking.html?orderId=${orderId}&productId=${productId}`}>
              <button className="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        </div>
      )
    })    
  )
}