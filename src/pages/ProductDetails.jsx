import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getItemQuantityInCart } = useCart();

  const numericId = parseInt(id, 10);
  const product = products.find((p) => p.id === numericId);

  // If product is not found, render friendly error state
  if (!product) {
    return (
      <main className="page-container details-error-page">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h1 className="error-title">Product Not Found</h1>
          <p className="error-message">
            We could not find any product matching ID <code>#{id}</code> in our inventory. It may have been removed or the link might be incorrect.
          </p>
          <div className="error-actions">
            <Link to="/products" className="btn btn-primary">
              ← Back to Products
            </Link>
            <Link to="/" className="btn btn-secondary">
              Go to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const quantityInCart = getItemQuantityInCart(product.id);
  const isOutOfStock = product.quantity <= 0;
  const isMaxInCart = quantityInCart >= product.quantity;
  const remainingStock = Math.max(0, product.quantity - quantityInCart);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <main className="page-container product-details-page">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/products">Products</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </nav>

      <div className="product-details-card">
        {/* Product Media Column */}
        <div className="details-image-section">
          <div className="details-image-wrap">
            <img
              src={product.image}
              alt={product.name}
              className="details-product-image"
            />
          </div>
          <span className="details-category-pill">{product.category}</span>
        </div>

        {/* Product Information Column */}
        <div className="details-info-section">
          <div className="details-header">
            <span className="product-id-tag">Product ID: #{product.id}</span>
            <h1 className="details-title">{product.name}</h1>
            <div className="details-price-badge">
              {formatPrice(product.price)}
            </div>
          </div>

          <div className="details-stock-row">
            <span className="stock-label">Stock Status:</span>
            {isOutOfStock ? (
              <span className="stock-indicator out-of-stock">Out of Stock (0 units)</span>
            ) : (
              <span className="stock-indicator in-stock">
                <span className="stock-dot"></span>
                In Stock ({product.quantity} units available)
              </span>
            )}
          </div>

          {quantityInCart > 0 && (
            <div className="details-in-cart-box">
              <span className="in-cart-check">✓</span> You currently have <strong>{quantityInCart}</strong> in your cart. ({remainingStock} more available to add).
            </div>
          )}

          <div className="details-description-block">
            <h3>Description</h3>
            <p className="details-description-text">{product.description}</p>
          </div>

          {/* Highlights */}
          <div className="details-specs-grid">
            <div className="spec-card">
              <span className="spec-label">Category</span>
              <strong className="spec-value">{product.category}</strong>
            </div>
            <div className="spec-card">
              <span className="spec-label">Warehouse Stock</span>
              <strong className="spec-value">{product.quantity} Units</strong>
            </div>
            <div className="spec-card">
              <span className="spec-label">Shipping</span>
              <strong className="spec-value">Free Express</strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="details-actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              id="details-add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={isOutOfStock || isMaxInCart}
            >
              {isOutOfStock
                ? 'Out of Stock'
                : isMaxInCart
                ? 'Maximum Stock in Cart'
                : `Add to Cart (${formatPrice(product.price)})`}
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-lg"
              id="details-back-btn"
              onClick={() => navigate('/products')}
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
