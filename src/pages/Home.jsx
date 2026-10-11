import React from 'react';
import { Link } from 'react-router-dom';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { totalItems, totalPrice } = useCart();
  const totalStockUnits = products.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <main className="page-container home-page">
      {/* Hero Welcome Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">Welcome to our Online Shop</span>
          <h1 className="hero-title">PRODUCT STORE</h1>
          <p className="hero-description">
            Explore our curated inventory of high-quality electronics, ergonomic furniture, and essential stationery. 
            Enjoy real-time search, category filtering, instant stock updates, and a dynamic shopping cart.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary btn-lg" id="browse-products-btn">
              Browse Products →
            </Link>
            <Link to="/cart" className="btn btn-secondary btn-lg" id="view-cart-btn">
              View Cart ({totalItems})
            </Link>
          </div>
        </div>
      </section>

      {/* Inventory & Cart Summary Stats Cards */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap blue-bg">📦</div>
            <div className="stat-info">
              <span className="stat-number">{products.length}</span>
              <span className="stat-label">Unique Products</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap amber-bg">🏷️</div>
            <div className="stat-info">
              <span className="stat-number">3</span>
              <span className="stat-label">Product Categories</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap green-bg">📊</div>
            <div className="stat-info">
              <span className="stat-number">{totalStockUnits}</span>
              <span className="stat-label">Total Units in Stock</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap purple-bg">🛒</div>
            <div className="stat-info">
              <span className="stat-number">{totalItems}</span>
              <span className="stat-label">Cart Items ({formatPrice(totalPrice)})</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">A glimpse of our most popular inventory items</p>
          </div>
          <Link to="/products" className="view-all-link">
            See All Catalog →
          </Link>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Quick Category Banner */}
      <section className="category-showcase-section">
        <h2 className="section-title text-center">Shop by Department</h2>
        <div className="category-showcase-grid">
          <Link to="/products" className="category-banner-card electronics-card">
            <div className="category-icon">💻</div>
            <h3>Electronics</h3>
            <p>Laptops, optical mice, and smart computer peripherals.</p>
          </Link>

          <Link to="/products" className="category-banner-card furniture-card">
            <div className="category-icon">🪑</div>
            <h3>Furniture</h3>
            <p>Ergonomic executive chairs and workspace essentials.</p>
          </Link>

          <Link to="/products" className="category-banner-card stationery-card">
            <div className="category-icon">📓</div>
            <h3>Stationery</h3>
            <p>Hardcover journals, notebooks, and writing materials.</p>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
