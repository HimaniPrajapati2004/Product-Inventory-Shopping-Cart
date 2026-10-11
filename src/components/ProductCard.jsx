import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, getItemQuantityInCart } = useCart();
  const quantityInCart = getItemQuantityInCart(product.id);
  const isOutOfStock = product.quantity <= 0;
  const isMaxInCart = quantityInCart >= product.quantity;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <article className="product-card" id={`product-card-${product.id}`}>
      <div className="product-card-image-wrap">
        <Link to={`/products/${product.id}`} className="product-image-link" tabIndex="-1">
          <img
            src={product.image}
            alt={product.name}
            className="product-card-image"
            loading="lazy"
          />
        </Link>
        <span className="product-card-category-badge">{product.category}</span>
      </div>

      <div className="product-card-body">
        <h3 className="product-card-title">
          <Link to={`/products/${product.id}`} className="product-title-link">
            {product.name}
          </Link>
        </h3>

        <div className="product-card-price-row">
          <span className="product-card-price">{formatPrice(product.price)}</span>
          <div className="product-stock-badge-wrap">
            {isOutOfStock ? (
              <span className="stock-indicator out-of-stock">Out of Stock</span>
            ) : (
              <span className="stock-indicator in-stock">
                <span className="stock-dot"></span>
                In Stock ({product.quantity})
              </span>
            )}
          </div>
        </div>

        {quantityInCart > 0 && (
          <div className="in-cart-indicator">
            <span className="cart-check-icon">✓</span> {quantityInCart} currently in cart
          </div>
        )}

        <div className="product-card-actions">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-secondary btn-sm"
            id={`view-details-${product.id}`}
          >
            View Details
          </Link>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            id={`add-to-cart-${product.id}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock || isMaxInCart}
            title={
              isOutOfStock
                ? 'Product is out of stock'
                : isMaxInCart
                ? 'All available stock already added to cart'
                : 'Add to cart'
            }
          >
            {isOutOfStock ? 'Sold Out' : isMaxInCart ? 'Max in Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
