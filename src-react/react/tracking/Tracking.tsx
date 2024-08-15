import { useEffect, useState } from 'react'
import RenderPage from '../shared/RenderPage'
import { exampleProduct, getProduct } from '../../data/products'
import { formatDate, findProductDetails, calculateProgress } from '../../scripts/tracking'
import '../../../styles-sass/pages/tracking.scss'
import AmazonHeader from '../shared/AmazonHeader'

function Tracking() {
  const url = new URL(window.location.href)
  const orderId = url.searchParams.get('orderId')
  const productId = url.searchParams.get('productId')
  if (!productId || !orderId) {
    return
  }
  
  const [product, setProduct] = useState(exampleProduct)
  useEffect(() => {
    const fetchProduct = async () => {
      const awaitProduct = await getProduct(productId)
      setProduct(awaitProduct)
    }

    fetchProduct()
  }, [])


  const {image, name} = product
  const {quantity, orderTime, deliveryTime} = findProductDetails(orderId, productId)
  const {percent, status} = calculateProgress(orderTime, deliveryTime)

  return (
    <>
      <AmazonHeader/>
      <div className='main'>
        <div className="order-tracking js-order-tracking">
          <a className="back-to-orders-link link-primary" 
            href="orders.html">
            View all orders
          </a>

          <div className="delivery-date">
            Arriving on {formatDate(deliveryTime)}
          </div>

          <div className="product-info">
            {name}
          </div>

          <div className="product-info">
            Quantity: ${quantity}
          </div>

          <img className="product-image" src={image}/>

          <div className="progress-labels-container">
            <div className={`progress-label ${status === 1 ? 'current-status' : ''}`}>
              Preparing
            </div>
            <div className={`progress-label ${status === 2 ? 'current-status' : ''}`}>
              Shipped
            </div>
            <div className={`progress-label ${status === 3 ? 'current-status' : ''}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${percent}%`}}></div>
          </div>    
        </div>
      </div>
    </>
  )
}

RenderPage(Tracking)