import { useEffect } from "react";
import updateCartQuantity from "../../scripts/utils/updateCartQuantity";
import RenderPage from "../shared/RenderPage";
import OrderHeader from "./OrderHeader";
import OrderDetails from "./OrderDetails";
import AmazonHeader from "../shared/AmazonHeader";
import { orders } from "../../data/orders";
import '../../../styles-sass/pages/orders.scss'

function Orders() {
  useEffect(() => {
    updateCartQuantity()
  }, [])

  return (
    <>
      <AmazonHeader/>
        <div className="main">
          <div className="page-title">Your Orders</div>
          <div className="orders-grid js-orders-grid">
            {
              orders.map((order) => {
                const orderObject = {
                  order
                }
                return (
                  <div key={order.id}>
                    <OrderHeader {...orderObject}/>
                    <OrderDetails {...orderObject}/>        
                  </div>
                )
              })
            }
          </div>
        </div>
    </>
  )
}

RenderPage(Orders)