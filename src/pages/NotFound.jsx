import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="page-container not-found-page">
      <div className="error-card not-found-card">
        <div className="not-found-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          The page you are looking for does not exist or has been moved. Use the navigation links below to return to the store.
        </p>
        <div className="error-actions">
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
          <Link to="/products" className="btn btn-secondary">
            View All Products
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
