import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { cart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  /**
   * Filter products based on search term and category dropdown
   * Memoized using useMemo to avoid re-calculation unless search or category changes
   */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <main className="page-container products-page">
      {/* Page Title & Terminal-style Header Reference Accent */}
      <section className="products-header-section">
        <h1 className="page-main-heading">PRODUCT STORE</h1>
        <p className="page-subtitle">
          Browse our live inventory catalog. Filter by department or search by product name.
        </p>
      </section>

      {/* Filter & Search Bar Controls */}
      <section className="filters-section" aria-label="Product Search and Filters">
        <div className="filters-row">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClearSearch={() => setSearchTerm('')}
          />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Filter State Feedback */}
        {(searchTerm || selectedCategory !== 'All') && (
          <div className="active-filters-bar">
            <span className="results-count">
              Showing <strong>{filteredProducts.length}</strong> of {products.length} products
            </span>
            <button
              type="button"
              className="btn btn-outline btn-xs"
              onClick={handleResetFilters}
            >
              Reset Filters ✕
            </button>
          </div>
        )}
      </section>

      {/* Products Grid / Empty Results State */}
      <section className="products-grid-section" aria-label="Available Products">
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products-box" role="alert">
            <div className="no-results-icon">🔍</div>
            <h3>No Products Found</h3>
            <p>
              No items in stock matched your search criteria{' '}
              {searchTerm && <strong>"{searchTerm}"</strong>}
              {selectedCategory !== 'All' && ` in "${selectedCategory}" category`}.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleResetFilters}
            >
              Clear Search & Show All Products
            </button>
          </div>
        )}
      </section>

      {/* Live Shopping Cart Summary Bar (Matching Screenshot Reference) */}
      <section className="products-cart-bar-section" aria-label="Shopping Cart Summary">
        <div className="cart-bar-card">
          <div className="cart-bar-info">
            <div className="cart-bar-badge">
              <span className="cart-icon">🛒</span>
              <span className="cart-items-text">
                Cart: <strong>{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</strong>
              </span>
            </div>
            <div className="cart-bar-total">
              <span className="total-label">Total:</span>{' '}
              <strong className="total-amount">{formatPrice(totalPrice)}</strong>
            </div>
          </div>

          <div className="cart-bar-actions">
            <Link to="/cart" className="btn btn-secondary" id="cart-bar-view-cart">
              View Cart Details
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              id="cart-bar-checkout"
              onClick={() => navigate('/cart')}
              disabled={cart.length === 0}
            >
              Checkout →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Products;
