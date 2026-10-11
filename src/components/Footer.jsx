import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand-col">
          <div className="footer-brand-title">
            <span className="brand-icon">📦</span> PRODUCT STORE
          </div>
          <p className="footer-tagline">
            Product Inventory & Shopping Cart — A React.js eCommerce Application built with functional components, hooks, React Router, and dynamic state management.
          </p>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Quick Navigation</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
          </ul>
        </div>

        <div className="footer-info-col">
          <h4 className="footer-heading">Features</h4>
          <ul className="footer-features-list">
            <li>⚡ Instant Search & Category Filter</li>
            <li>🛒 Real-time Inventory Bounds</li>
            <li>🇮🇳 Dynamic INR Currency Calculation</li>
            <li>✨ Modern Responsive UI</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Product Inventory & Shopping Cart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
