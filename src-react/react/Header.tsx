import { changeUrl } from "../scripts/amazon";

export default function Header() {
  return (
    <div className="amazon-header">
      <div className="amazon-header-left-section">
        <a href="amazon.html" className="header-link">
          <img
            className="amazon-logo"
            src="images/amazon-logo-white.png"
            alt="Amazon Logo"
          />
          <img
            className="amazon-mobile-logo"
            src="images/amazon-mobile-logo-white.png"
            alt="Amazon Mobile Logo"
          />
        </a>
      </div>

      <div className="amazon-header-middle-section">
        <input
          className="search-bar js-search-bar"
          type="text"
          placeholder="Search"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              changeUrl()
            } 
          }}
        />
        <button className="search-button js-search-button">
          <img
            className="search-icon"
            src="images/icons/search-icon.png"
            alt="Search"
            onClick={() => {
              changeUrl()
            }}
          />
        </button>
      </div>

      <div className="amazon-header-right-section">
        <a className="orders-link header-link" href="orders.html">
          <span className="returns-text">Returns</span>
          <span className="orders-text">& Orders</span>
        </a>

        <a className="cart-link header-link" href="checkout.html">
          <img
            className="cart-icon"
            src="images/icons/cart-icon.png"
            alt="Cart"
          />
          <div className="cart-quantity js-cart-quantity"></div>
          <div className="cart-text">Cart</div>
        </a>
      </div>
    </div>
  );
}
