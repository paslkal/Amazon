import { cart } from "../data/cart-class";
import { products, loadProducts } from "../data/products";
import updateCartQuantity from "./utils/updateCartQuantity";
import '../../styles-sass/shared/general.scss'
import '../../styles-sass/shared/amazon-header.scss'
import '../../styles-sass/pages/amazon.scss'

updateCartQuantity()

interface addedMessageTimeouts {
  [productId : string] : ReturnType<typeof setTimeout>
} 

interface addMessage {
  readonly addedMessage: HTMLDivElement
  readonly productId: string,
  readonly addedMessageTimeouts: addedMessageTimeouts
}

function addMessage({addedMessage, productId, addedMessageTimeouts} : addMessage) {
  addedMessage.classList.add('added-to-cart-visible')

  const previousTimeoutId = addedMessageTimeouts[productId]
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId)
  }

  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-visible')        
  }, 2000)

  addedMessageTimeouts[productId] = timeoutId
}

loadProducts(renderProductsGrid)

function changeUrl() {
  const input = (<HTMLInputElement>document.querySelector('.js-search-bar')).value
  if (input) {
    window.location.href = `amazon.html?search=${input}`
  } else {
    window.location.href = `amazon.html`
  }
}

function renderProductsGrid() {
  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src=${product.image}>
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStartsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button 
          js-add-to-cart 
          button-primary"
          data-product-id="${product.id}"
        >
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid')!.innerHTML = productsHTML;

  const addedMessageTimeouts = {}
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) : void => {
      button.addEventListener('click', async() => {
        const {productId} = (<HTMLButtonElement>button).dataset
        if (!productId) {
          return
        }
        const quantity = Number((<HTMLSelectElement>document
          .querySelector(`.js-quantity-selector-${productId}`)).value)

        const addedMessage = <HTMLDivElement>document.querySelector(
          `.js-added-to-cart-${productId}`
        )

        addMessage({addedMessage, productId, addedMessageTimeouts})

        await cart.addToCart(productId, quantity)

        updateCartQuantity()
      })
    })

  document.querySelector('.js-search-button')!.addEventListener('click', () => {
    changeUrl()
  })

  document.querySelector('.js-search-bar')!
    .addEventListener('keypress', (e : Event) => {
      if ((<KeyboardEvent>e).key === 'Enter') {
        changeUrl()
      }
    })
}



