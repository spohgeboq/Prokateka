"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { EquipmentItem } from "@/data/catalog";

export interface CartItem {
  equipment: EquipmentItem;
  addedAt: number;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (equipment: EquipmentItem) => void;
  removeItem: (equipmentId: string) => void;
  clearCart: () => void;
  isInCart: (equipmentId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "prokateka_cart_items_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage:", e);
    } finally {
      setInitialized(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!initialized) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  }, [items, initialized]);

  const addItem = useCallback((equipment: EquipmentItem) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.equipment.id === equipment.id);
      if (exists) return prev;
      return [...prev, { equipment, addedAt: Date.now() }];
    });
  }, []);

  const removeItem = useCallback((equipmentId: string) => {
    setItems((prev) => prev.filter((i) => i.equipment.id !== equipmentId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (equipmentId: string) => {
      return items.some((i) => i.equipment.id === equipmentId);
    },
    [items]
  );

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount: items.length,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
