import { CartItem } from "../../data/cart-class"
import { Product } from "../../data/products"

export default interface CheckoutProps {
  cartItems: CartItem[],
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
  products: Product[]
}
