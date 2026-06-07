'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Star, ShoppingBag, Eye } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useCartStore } from '../../store/cartStore';
import { useState } from 'react';
import Link from 'next/link';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, showNotification } = useUIStore();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const activePrice = quickViewProduct.salePrice ?? quickViewProduct.price;
  const hasDiscount = quickViewProduct.salePrice !== null;

  const handleAddToCart = () => {
    addItem(quickViewProduct, quantity);
    setQuickViewProduct(null);
    showNotification(
      'Added to Cart',
      `${quantity}x ${quickViewProduct.name} added to your cart.`,
      'success'
    );
    setQuantity(1); // reset quantity
  };

  const handleClose = () => {
    setQuickViewProduct(null);
    setQuantity(1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-4xl bg-brand-bg rounded-lg shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 rounded-full p-2 bg-brand-bg/95 backdrop-blur-sm border border-surface text-text-dark hover:bg-surface transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left Column: Image */}
          <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:min-h-[450px] bg-surface relative">
            <img
              src={quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="h-full w-full object-cover"
            />
            {hasDiscount && (
              <span className="absolute top-6 left-6 bg-primary text-brand-bg text-xs font-semibold px-3 py-1 rounded-sm uppercase tracking-wider">
                Sale Offer
              </span>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category */}
              <span className="text-xs text-secondary uppercase tracking-widest font-bold">
                {quickViewProduct.categoryId === 'cat-1' && 'Gourmet Dining'}
                {quickViewProduct.categoryId === 'cat-2' && 'Haute Couture'}
                {quickViewProduct.categoryId === 'cat-3' && 'Living & Comfort'}
                {quickViewProduct.categoryId === 'cat-4' && 'Wellness & Care'}
              </span>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark leading-tight">
                {quickViewProduct.name}
              </h2>

              {/* Rating and Price */}
              <div className="flex flex-wrap items-center gap-4 border-b border-surface/50 pb-4">
                <div className="flex items-center space-x-2 text-primary font-serif text-xl font-bold">
                  <span>₹{activePrice.toLocaleString('en-IN')}</span>
                  {hasDiscount && (
                    <span className="text-sm text-text-light line-through font-sans font-normal">
                      ₹{quickViewProduct.price.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-amber-500 border-l border-surface pl-4">
                  <Star className="h-4.5 w-4.5 fill-current" />
                  <span className="text-sm font-bold text-text-dark">
                    {quickViewProduct.rating.toFixed(1)} / 5.0
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-text-light leading-relaxed line-clamp-4">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4 border-t border-surface/50 pt-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-surface rounded-full w-full sm:w-auto justify-between">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-3 text-text-light hover:text-text-dark transition-colors cursor-pointer"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 font-semibold text-sm text-text-dark">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="p-3 text-text-light hover:text-text-dark transition-colors cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 w-full flex items-center justify-center gap-2 rounded-full bg-primary py-3 px-6 text-sm font-semibold text-brand-bg hover:bg-primary/95 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="h-4.5 w-4.5" />
                  Add to Cart
                </button>
              </div>

              {/* View Full details */}
              <Link
                href={`/product/${quickViewProduct.slug}`}
                onClick={handleClose}
                className="flex items-center justify-center gap-1.5 text-xs text-secondary hover:text-primary transition-colors font-semibold py-1.5"
              >
                <Eye className="h-4 w-4" />
                View Full Product Narrative & Reviews
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
