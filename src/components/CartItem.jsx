import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const subtotal = item.price * item.cartQuantity;
  const isAtMaxStock = item.cartQuantity >= item.quantity;
  const isAtMinQuantity = item.cartQuantity <= 1;

  return (
    <div className="cart-item-row" id={`cart-item-${item.id}`}>
      <div className="cart-item-image-col">
        <Link to={`/products/${item.id}`}>
          <img src={item.image} alt={item.name} className="cart-item-thumb" />
        </Link>
      </div>

      <div className="cart-item-info-col">
        <span className="cart-item-category">{item.category}</span>
        <h4 className="cart-item-name">
          <Link to={`/products/${item.id}`} className="cart-item-title-link">
            {item.name}
          </Link>
        </h4>
        <div className="cart-item-unit-price">
          Unit Price: <strong>{formatPrice(item.price)}</strong>
        </div>
        <div className="cart-item-stock-limit">
          Max Stock Available: {item.quantity}
        </div>
      </div>

      <div className="cart-item-quantity-col">
        <label className="quantity-label">Quantity</label>
        <div className="quantity-controls">
          <button
            type="button"
            className="qty-btn qty-decrease-btn"
            id={`qty-decrease-${item.id}`}
            onClick={() => decreaseQuantity(item.id)}
            disabled={isAtMinQuantity}
            title={isAtMinQuantity ? 'Minimum quantity is 1' : 'Decrease quantity'}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="qty-value" id={`qty-value-${item.id}`}>
            {item.cartQuantity}
          </span>
          <button
            type="button"
            className="qty-btn qty-increase-btn"
            id={`qty-increase-${item.id}`}
            onClick={() => increaseQuantity(item.id)}
            disabled={isAtMaxStock}
            title={
              isAtMaxStock
                ? `Maximum available stock is ${item.quantity}`
                : 'Increase quantity'
            }
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        {isAtMaxStock && (
          <span className="max-stock-notice">Max stock reached</span>
        )}
      </div>

      <div className="cart-item-subtotal-col">
        <span className="subtotal-label">Subtotal</span>
        <span className="subtotal-value">{formatPrice(subtotal)}</span>
      </div>

      <div className="cart-item-remove-col">
        <button
          type="button"
          className="remove-btn"
          id={`remove-item-${item.id}`}
          onClick={() => removeFromCart(item.id)}
          title={`Remove ${item.name} from cart`}
          aria-label={`Remove ${item.name} from cart`}
        >
          <span className="remove-icon" aria-hidden="true">🗑️</span>
          <span className="remove-text">Remove</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
