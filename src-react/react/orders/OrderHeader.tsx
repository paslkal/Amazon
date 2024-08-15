import { formatCurrency } from "../../scripts/utils/money";
import { formatDate } from "../../scripts/orders";
import { Order } from "../../data/orders";

export default function OrderHeader({order} : {order: Order}) {
  const orderId = order.id
  const {orderTime} = order
  const {totalCostCents} = order

  return (
    <>
      <div className="order-header-left-section">
        <div className="order-date">
          <div className="order-header-label">Order Placed:</div>
          <div>{formatDate(orderTime)}</div>
        </div>
        <div className="order-total">
          <div className="order-header-label">Total:</div>
          <div>{formatCurrency(totalCostCents)}</div>
        </div>
      </div>

      <div className="order-header-right-section">
        <div className="order-header-label">Order ID:</div>
        <div>{orderId}</div>
      </div>
    </>
  )
}