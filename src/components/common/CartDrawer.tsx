'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const { isCartOpen, setCartOpen } = useUIStore();
  const { items, updateQuantity, removeItem, getTotals } = useCartStore();
  const router = useRouter();

  const { subtotal, shipping, tax, total } = getTotals();

  const handleCheckout = () => {
    setCartOpen(false);
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black cursor-pointer"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[450px] bg-brand-bg shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-surface p-6">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-xl font-semibold text-text-dark">Your Cart</h3>
                <span className="text-xs text-text-light">
                  ({items.reduce((acc, item) => acc + item.quantity, 0)} items)
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full p-1.5 hover:bg-surface text-text-dark transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="rounded-full bg-surface p-6 text-text-light">
                    <ShoppingBag className="h-10 w-10" />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-text-dark">Your cart is empty</h4>
                  <p className="text-sm text-text-light max-w-[250px] leading-relaxed">
                    Explore our Gourmet Dining or Haute Couture categories to find items for your companion.
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      router.push('/shop');
                    }}
                    className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-brand-bg hover:bg-primary/95 transition-colors cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const activePrice = item.product.salePrice ?? item.product.price;
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-surface/50 pb-6 last:border-0"
                    >
                      {/* Image */}
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-20 w-20 rounded-md object-cover bg-surface"
                      />
                      
                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-serif text-sm font-semibold text-text-dark line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-text-light mt-0.5">
                              ₹{activePrice.toLocaleString('en-IN')} each
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-text-light hover:text-red-500 transition-colors p-1 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        {/* Adjust Quantities */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-surface rounded-full">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-text-light hover:text-text-dark cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-text-dark">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-text-light hover:text-text-dark cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          <span className="text-sm font-semibold text-text-dark">
                            ₹{(activePrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Checkout Pricing Block */}
            {items.length > 0 && (
              <div className="border-t border-surface p-6 bg-surface/30 space-y-4">
                <div className="space-y-2.5 text-sm text-text-light">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-text-dark font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Apothecary Convenience Fee (5%)</span>
                    <span className="text-text-dark font-medium">₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Premium Shipping</span>
                    <span className="text-text-dark font-medium">
                      {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-surface/80 pt-2 text-base font-semibold text-text-dark">
                    <span>Total Estimated</span>
                    <span className="text-primary font-serif">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full rounded-full bg-primary py-3 text-center text-sm font-semibold text-brand-bg hover:bg-primary/95 transition-all shadow-md cursor-pointer"
                  id="checkout-drawer-btn"
                >
                  Proceed to Checkout
                </button>

                <p className="text-center text-[10px] text-text-light">
                  Free premium shipping on orders above ₹10,000.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
