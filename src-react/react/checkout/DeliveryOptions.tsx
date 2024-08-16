import { deliveryOptions, calculateDeliveryDate } from "../../data/deliveryOptions";
import { formatCurrency } from "../../scripts/utils/money";
import DeliveryOptionsProps from "./deliveryOptionsProps";

export default function DeliveryOptions(props: DeliveryOptionsProps) {
  const { product, cartItem, handleDeliveryOptionChange } = props
  return (
    <div className="delivery-options">
      {deliveryOptions.map((deliveryOption) => {
        const dateString = calculateDeliveryDate(deliveryOption);
        const priceString = deliveryOption.priceCents === 0
          ? 'Free'
          : `$${formatCurrency(deliveryOption.priceCents)} -`;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        return (
          <div
            key={deliveryOption.id}
            className={`delivery-option js-delivery-option js-delivery-option-${product.id}-${deliveryOption.id}`}
            data-product-id={product.id}
            data-delivery-option-id={deliveryOption.id}
            onClick={() => handleDeliveryOptionChange(product.id, deliveryOption.id)}
          >
            <input
              type="radio"
              checked={isChecked}
              className={`delivery-option-input js-delivery-option-input-${product.id}-${deliveryOption.id}`}
              name={`delivery-option-${product.id}`}
              onChange={() => {}}
            />
            <div>
              <div className="delivery-option-date">
                {dateString}
              </div>
              <div className="delivery-option-price">
                {priceString} Shipping
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
