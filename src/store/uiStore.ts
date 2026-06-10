import { create } from 'zustand';
import { Product } from '../types';

interface UIState {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  quickViewProduct: Product | null;
  notificationMessage: { title: string; message: string; type?: 'success' | 'info' | 'warning' } | null;
  selectedBranchId: string;
  setCartOpen: (isOpen: boolean) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setSelectedBranchId: (branchId: string) => void;
  showNotification: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  clearNotification: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isMobileMenuOpen: false,
  quickViewProduct: null,
  notificationMessage: null,
  selectedBranchId: typeof window !== 'undefined' ? (localStorage.getItem('pawluxury_selected_branch') || 'garden-area') : 'garden-area',

  setCartOpen: (isOpen: boolean) => set({ isCartOpen: isOpen }),
  setMobileMenuOpen: (isOpen: boolean) => set({ isMobileMenuOpen: isOpen }),
  setQuickViewProduct: (product: Product | null) => set({ quickViewProduct: product }),
  setSelectedBranchId: (branchId: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pawluxury_selected_branch', branchId);
    }
    set({ selectedBranchId: branchId });
  },
  
  showNotification: (title: string, message: string, type = 'success') => {
    set({ notificationMessage: { title, message, type } });
    // Auto clear notification after 4 seconds
    setTimeout(() => {
      set({ notificationMessage: null });
    }, 4000);
  },
  
  clearNotification: () => set({ notificationMessage: null })
}));
