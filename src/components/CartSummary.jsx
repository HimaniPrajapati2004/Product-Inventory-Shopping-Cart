import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

const CartSummary = ({ showCheckoutDetails = true }) => {
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    setIsCheckingOut(true);

    // Simulate order generation
    const orderData = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      itemsCount: totalItems,
      totalAmount: totalPrice,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [...cart]
    };

    setTimeout(() => {
      setOrderCompleted(orderData);
      clearCart();
      setIsCheckingOut(false);
    }, 600);
  };

  const handleCloseModal = () => {
    setOrderCompleted(null);
    navigate('/products');
  };

  return (
    <div className="cart-summary-card">
      <h3 className="cart-summary-title">Order Summary</h3>

      <div className="summary-row">
        <span className="summary-label">Total Units:</span>
        <span className="summary-value" id="summary-total-items">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="summary-row">
        <span className="summary-label">Standard Delivery:</span>
        <span className="summary-value free-delivery">FREE</span>
      </div>

      <div className="summary-divider"></div>

      <div className="summary-row grand-total-row">
        <span className="summary-label total-label">Grand Total:</span>
        <span className="summary-value total-value" id="summary-grand-total">
          {formatPrice(totalPrice)}
        </span>
      </div>

      <div className="cart-summary-actions">
        <button
          type="button"
          className="btn btn-primary btn-block checkout-btn"
          id="checkout-button"
          onClick={handleCheckout}
          disabled={cart.length === 0 || isCheckingOut}
        >
          {isCheckingOut ? (
            <span className="spinner-text">Processing Order...</span>
          ) : (
            `Proceed to Checkout (${formatPrice(totalPrice)})`
          )}
        </button>
      </div>

      {showCheckoutDetails && (
        <div className="checkout-perks">
          <div className="perk-item">
            <span className="perk-icon">🔒</span>
            <span>Simulated Secure Checkout</span>
          </div>
          <div className="perk-item">
            <span className="perk-icon">🚚</span>
            <span>Fast Dispatch on all orders</span>
          </div>
        </div>
      )}

      {/* Simulated Order Confirmation Modal */}
      {orderCompleted && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="order-modal-content">
            <div className="modal-success-icon">🎉</div>
            <h2 className="modal-title">Order Placed Successfully!</h2>
            <p className="modal-desc">
              Thank you for shopping at <strong>PRODUCT STORE</strong>. Your simulated order has been processed.
            </p>

            <div className="order-details-box">
              <div className="order-detail-row">
                <span>Order Reference:</span>
                <strong>{orderCompleted.orderId}</strong>
              </div>
              <div className="order-detail-row">
                <span>Total Items:</span>
                <strong>{orderCompleted.itemsCount} units</strong>
              </div>
              <div className="order-detail-row">
                <span>Total Paid:</span>
                <strong className="order-total-price">
                  {formatPrice(orderCompleted.totalAmount)}
                </strong>
              </div>
              <div className="order-detail-row">
                <span>Time:</span>
                <span>{orderCompleted.placedAt}</span>
              </div>
            </div>

            <div className="modal-items-summary">
              <h4>Ordered Items:</h4>
              <ul>
                {orderCompleted.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.cartQuantity} ({formatPrice(item.price * item.cartQuantity)})
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block modal-continue-btn"
              onClick={handleCloseModal}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
