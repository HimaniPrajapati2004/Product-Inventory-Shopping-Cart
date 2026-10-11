import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import './styles/App.css';

/**
 * Toast Notification Banner connected to CartContext
 */
const ToastBanner = () => {
  const { toastMessage, dismissToast } = useCart();
  if (!toastMessage) return null;

  return (
    <div
      className={`toast-banner toast-${toastMessage.type}`}
      role="status"
      aria-live="polite"
    >
      <span>{toastMessage.message}</span>
      <button
        type="button"
        className="toast-close"
        onClick={dismissToast}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
};

const AppContent = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastBanner />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
