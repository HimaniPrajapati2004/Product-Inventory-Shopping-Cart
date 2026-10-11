import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

const Cart = () => {
  const { cart, totalItems, clearCart } = useCart();

  return (
    <main className="page-container cart-page">
      <div className="cart-page-header">
        <div>
          <h1 className="page-main-heading">Shopping Cart</h1>
          <p className="page-subtitle">
            Review and adjust your selected items before proceeding to checkout.
          </p>
        </div>
        {cart.length > 0 && (
          <button
            type="button"
            className="btn btn-outline btn-sm clear-cart-btn"
            onClick={clearCart}
            title="Clear all items from your cart"
          >
            Clear Entire Cart
          </button>
        )}
      </div>

      {cart.length > 0 ? (
        <div className="cart-layout-grid">
          {/* Cart Items List */}
          <section className="cart-items-section" aria-label="Cart Items List">
            <div className="cart-table-header">
              <span className="th-item">Product</span>
              <span className="th-qty">Quantity</span>
              <span className="th-subtotal">Subtotal</span>
              <span className="th-action">Action</span>
            </div>

            <div className="cart-items-list">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="cart-actions-row">
              <Link to="/products" className="btn btn-secondary" id="continue-shopping-btn">
                ← Continue Shopping
              </Link>
            </div>
          </section>

          {/* Cart Summary & Checkout Sidebar */}
          <aside className="cart-summary-section" aria-label="Order Summary">
            <CartSummary showCheckoutDetails={true} />
          </aside>
        </div>
      ) : (
        /* Empty Cart State */
        <section className="empty-cart-card" role="status">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Currently Empty</h2>
          <p>
            Looks like you haven't added any products to your shopping cart yet. Explore our product catalogue and discover great tech, furniture, and stationery.
          </p>
          <div className="empty-cart-actions">
            <Link to="/products" className="btn btn-primary btn-lg" id="empty-cart-browse-btn">
              Explore Products Now
            </Link>
            <Link to="/" className="btn btn-secondary btn-lg">
              Return to Home
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default Cart;
