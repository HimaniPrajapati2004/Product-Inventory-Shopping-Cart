import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">📦</span>
          <div className="brand-text">
            <span className="brand-title">PRODUCT STORE</span>
            <span className="brand-subtitle">Inventory & Cart</span>
          </div>
        </Link>

        <nav className="navbar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'nav-link active cart-nav-link' : 'nav-link cart-nav-link')}
          >
            <span className="cart-icon">🛒</span>
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="cart-badge" aria-label={`${totalItems} items in cart`}>
                {totalItems}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
