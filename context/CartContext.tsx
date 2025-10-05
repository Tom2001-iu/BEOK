
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, selectedSize: string, selectedColor: string) => void;
  removeFromCart: (productId: string, selectedSize: string, selectedColor: string) => void;
  updateQuantity: (productId: string, selectedSize: string, selectedColor: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart items from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number, selectedSize: string, selectedColor: string) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity, selectedSize, selectedColor }];
    });
  };

  const removeFromCart = (productId: string, selectedSize: string, selectedColor: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor))
    );
  };
  
  const updateQuantity = (productId: string, selectedSize: string, selectedColor: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
