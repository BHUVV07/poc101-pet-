import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotals: () => {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
}

export const useCartStore = create<CartState>((set, get) => {
  // Helper to load cart from local storage
  const getInitialItems = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('pawluxury_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveItems = (items: CartItem[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pawluxury_cart', JSON.stringify(items));
    }
  };

  return {
    items: getInitialItems(),

    addItem: (product: Product, quantity = 1) => {
      const currentItems = get().items;
      const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);
      
      let newItems: CartItem[];
      
      if (existingItemIndex > -1) {
        newItems = currentItems.map((item, idx) => 
          idx === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...currentItems, { id: `cart-item-${Date.now()}`, product, quantity }];
      }

      set({ items: newItems });
      saveItems(newItems);
    },

    removeItem: (productId: string) => {
      const newItems = get().items.filter(item => item.product.id !== productId);
      set({ items: newItems });
      saveItems(newItems);
    },

    updateQuantity: (productId: string, quantity: number) => {
      if (quantity <= 0) {
        get().removeItem(productId);
        return;
      }
      const newItems = get().items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      );
      set({ items: newItems });
      saveItems(newItems);
    },

    clearCart: () => {
      set({ items: [] });
      saveItems([]);
    },

    getTotals: () => {
      const items = get().items;
      const subtotal = items.reduce((acc, item) => {
        const itemPrice = item.product.salePrice ?? item.product.price;
        return acc + itemPrice * item.quantity;
      }, 0);
      
      // Luxury pet shipping logic: free shipping over 10,000 INR, else 350 INR flat rate
      const shipping = subtotal > 10000 || subtotal === 0 ? 0 : 350;
      
      // 5% premium convenience/tax fee
      const tax = Math.round(subtotal * 0.05);
      
      const total = subtotal + shipping + tax;
      
      return { subtotal, shipping, tax, total };
    }
  };
});
