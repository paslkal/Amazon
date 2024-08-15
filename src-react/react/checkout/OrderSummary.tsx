import { cart } from "../../data/cart-class";
import { getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions";
import DeliveryOptions from "./DeliveryOptions";
import CheckoutProps from "./checkoutProps";

export default function OrderSummary(props: CheckoutProps) {  
  const {cartItems,setCartItems, products} = props

  const handleRemoveFromCart = async (productId: string) => {
    await cart.removeFromCart(productId);
    setCartItems([...cart.cartItems]); 
  };

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity <= 0 || newQuantity >= 1000) {
      alert("Quantity must be at least 1 and less than 1000");
      return;
    }
    await cart.updateCartQuantity(productId, newQuantity);
    setCartItems([...cart.cartItems]); 
  };

  const handleDeliveryOptionChange = (productId: string, deliveryOptionId: string) => {
    cart.updateDeliveryOption(productId, deliveryOptionId);
    setCartItems([...cart.cartItems]); 
  };

  return (
    <div className="order-summary">
      {cartItems.map((cartItem, index) => {
        const product = products[index];
        if (!product) return null; // Wait for product data to load
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        const dateString = calculateDeliveryDate(deliveryOption);
        const deliveryOptionsProps = {
          product,
          cartItem,
          handleDeliveryOptionChange
        }
        return (
          <div
            key={product.id}
            className={`cart-item-container js-cart-item-container js-cart-item-container-${product.id}`}
          >
            <div className="delivery-date">Delivery date: {dateString}</div>

            <div className="cart-item-details-grid">
              <img className="product-image" src={product.image} alt={product.name} />

              <div className="cart-item-details">
                <div className={`product-name js-product-name-${product.id}`}>
                  {product.name}
                </div>
                <div className={`product-price js-product-price-${product.id}`}>
                  {product.getPrice()}
                </div>
                <div className={`product-quantity js-product-quantity-${product.id}`}>
                  <span>
                    Quantity: <span className="quantity-label js-quantity-label">
                      {cartItem.quantity}
                    </span>
                  </span>
                  <span
                    className="update-quantity-link link-primary js-update-link"
                    onClick={() => {
                      const container = document.querySelector(`.js-cart-item-container-${product.id}`);
                      container!.classList.add("is-editing-quantity");
                    }}
                  >
                    Update
                  </span>
                  <input
                    className="quantity-input js-quantity-input"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        const newQuantity = Number((event.target as HTMLInputElement).value);
                        handleUpdateQuantity(product.id, newQuantity);
                      }
                    }}
                  />
                  <span
                    className="save-quantity-link link-primary js-save-quantity-link"
                    onClick={() => {
                      const input = document.querySelector(`.js-cart-item-container-${product.id} .js-quantity-input`) as HTMLInputElement;
                      handleUpdateQuantity(product.id, Number(input.value));
                    }}
                  >
                    Save
                  </span>
                  <span
                    className={`delete-quantity-link link-primary js-delete-link js-delete-link-${product.id}`}
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">Choose a delivery option:</div>
                <DeliveryOptions {...deliveryOptionsProps}/>
              </div>  
            </div>
          </div>
        );
      })}
    </div>
  );
}
