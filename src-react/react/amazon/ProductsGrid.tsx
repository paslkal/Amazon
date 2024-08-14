import { products, loadProductsFetch } from '../../data/products';
import { cart } from '../../data/cart-class';
import updateCartQuantity from '../../scripts/utils/updateCartQuantity';
import { addMessage } from '../../scripts/amazon';

await loadProductsFetch()

export default function ProductsGrid() {
  return (
    <div className='main'>
      <div className="products-grid js-products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-container">
            <div className="product-image-container">
              <img className="product-image" src={product.image} alt={product.name} />
            </div>

            <div className="product-name limit-text-to-2-lines">
              {product.name}
            </div>

            <div className="product-rating-container">
              <img className="product-rating-stars" src={product.getStartsUrl()} alt="Rating stars" />
              <div className="product-rating-count link-primary">
                {product.rating.count}
              </div>
            </div>

            <div className="product-price">
              {product.getPrice()}
            </div>

            <div className="product-quantity-container">
              <select className={`js-quantity-selector-${product.id}`}>
                {[...Array(10).keys()].map((value) => (
                  <option key={value + 1} value={value + 1}>
                    {value + 1}
                  </option>
                ))}
              </select>
            </div>

            <div dangerouslySetInnerHTML={{ __html: product.extraInfoHTML() }} />

            <div className="product-spacer"></div>

            <div className={`added-to-cart js-added-to-cart-${product.id}`}>
              <img src="images/icons/checkmark.png" alt="Checkmark" />
              Added
            </div>

            <button
              className="add-to-cart-button js-add-to-cart button-primary"
              data-product-id={product.id}
              onClick={() => handleAddToCart(product.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const handleAddToCart = async (productId: string) => {
  const selector = document.querySelector(
    `.js-quantity-selector-${productId}`
  ) as HTMLSelectElement

  if (!selector) {
    return
  }
  const quantity = Number(selector.value)
  
  const addedMessage = document.querySelector(
    `.js-added-to-cart-${productId}`
  ) as HTMLDivElement
  
  const addedMessageTimeouts = {}

  addMessage({
    addedMessage, productId, addedMessageTimeouts
  })      
  
  await cart.addToCart(productId, quantity)
  updateCartQuantity()
}