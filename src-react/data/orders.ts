export const orders : Order[] = JSON.parse(localStorage.getItem('orders')!) || []

interface Order {
  id: string,
  orderTime: string,
  totalCostCents: number,
  products: Product[]
}


interface Product {
  productId : string,
  quantity: number,
  estimatedDeliveryTime: string,
  variation: null
}

export function addOrder(order : Order) {
  orders.unshift(order)
  saveToStorage()
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders))
}