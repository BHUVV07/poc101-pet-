import { create } from 'zustand';

interface WishlistState {
  items: string[]; // List of product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => {
  const getInitialItems = (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('pawluxury_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveItems = (items: string[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pawluxury_wishlist', JSON.stringify(items));
    }
  };

  return {
    items: getInitialItems(),
    
    toggleWishlist: (productId: string) => {
      const current = get().items;
      const isAlreadyIn = current.includes(productId);
      
      const updated = isAlreadyIn
        ? current.filter(id => id !== productId)
        : [...current, productId];
        
      set({ items: updated });
      saveItems(updated);
    },
    
    isInWishlist: (productId: string) => {
      return get().items.includes(productId);
    },
    
    clearWishlist: () => {
      set({ items: [] });
      saveItems([]);
    }
  };
});
