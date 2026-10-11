import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  /**
   * Display a temporary feedback toast
   */
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage((current) => (current && current.message === message ? null : current));
    }, 2800);
  };

  /**
   * Get current quantity of a product currently in the cart
   */
  const getItemQuantityInCart = (productId) => {
    const item = cart.find((i) => i.id === productId);
    return item ? item.cartQuantity : 0;
  };

  /**
   * Add a product to the cart
   * Enforces inventory limit (cannot exceed product.quantity)
   */
  const addToCart = (product) => {
    let result = { success: false, message: '' };

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.cartQuantity >= product.quantity) {
          result = {
            success: false,
            message: `Cannot add more. Only ${product.quantity} units available in stock.`
          };
          return prevCart;
        }

        result = {
          success: true,
          message: `Increased quantity of ${product.name} in cart (${existingItem.cartQuantity + 1} total)`
        };

        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        );
      } else {
        if (product.quantity <= 0) {
          result = { success: false, message: `${product.name} is currently out of stock.` };
          return prevCart;
        }

        result = {
          success: true,
          message: `${product.name} added to cart.`
        };

        return [...prevCart, { ...product, cartQuantity: 1 }];
      }
    });

    if (result.success) {
      showToast(result.message, 'success');
    } else if (result.message) {
      showToast(result.message, 'warning');
    }

    return result;
  };

  /**
   * Increase quantity of an item in the cart
   */
  const increaseQuantity = (productId) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          if (item.cartQuantity < item.quantity) {
            return { ...item, cartQuantity: item.cartQuantity + 1 };
          } else {
            showToast(`Maximum stock limit (${item.quantity}) reached for ${item.name}.`, 'warning');
            return item;
          }
        }
        return item;
      });
    });
  };

  /**
   * Decrease quantity of an item in the cart (minimum 1)
   */
  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          if (item.cartQuantity > 1) {
            return { ...item, cartQuantity: item.cartQuantity - 1 };
          }
          return item;
        }
        return item;
      });
    });
  };

  /**
   * Remove a product completely from the cart
   */
  const removeFromCart = (productId) => {
    const itemToRemove = cart.find((item) => item.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    if (itemToRemove) {
      showToast(`${itemToRemove.name} removed from cart.`, 'info');
    }
  };

  /**
   * Clear the entire cart
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Dynamic calculation of total units in cart using useMemo
   */
  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.cartQuantity, 0);
  }, [cart]);

  /**
   * Dynamic calculation of grand total price using useMemo
   */
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.cartQuantity, 0);
  }, [cart]);

  const value = {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    getItemQuantityInCart,
    toastMessage,
    dismissToast: () => setToastMessage(null)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
