import { Product } from "../../data/products";
import { CartItem } from "../../data/cart-class";

export default interface DeliveryOptionsProps {
  product: Product;
  cartItem: CartItem;
  handleDeliveryOptionChange: (productId: string, deliveryOptionId: string) => void;
}
