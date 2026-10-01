'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { OrderItem } from '@/types/order';
import { Product } from '@/types/product';

interface CartContextType {
  items: OrderItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize with mock item or localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('apna_bazar_cart');
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        // Initial sample item for preview/foundation
        setItems([
          {
            productId: 'prod-1',
            productName: 'Luxury Chronograph Obsidian Black Watch',
            productImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
            price: 3499,
            quantity: 1,
          },
        ]);
      }
    } catch {
      // fallback
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('apna_bazar_cart', JSON.stringify(items));
      } catch {
        // ignore storage errors
      }
    }
  }, [items, isInitialized]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      const effectivePrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          productImage: product.images[0] || '',
          price: effectivePrice,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
