'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Eye } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import Link from 'next/link';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useUIStore();

  if (!quickViewProduct) return null;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(`Hi, I am interested in inquiring about the product "${quickViewProduct.name}" at PawLuxury.`);
    const whatsappUrl = `https://wa.me/919876543210?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleClose = () => {
    setQuickViewProduct(null);
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

              {/* Rating */}
              <div className="flex items-center gap-1.5 text-amber-500 border-b border-surface/50 pb-4">
                <Star className="h-4.5 w-4.5 fill-current" />
                <span className="text-sm font-bold text-text-dark">
                  {quickViewProduct.rating.toFixed(1)} / 5.0 (Showcase)
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-text-light leading-relaxed line-clamp-4">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4 border-t border-surface/50 pt-4">
              <button
                onClick={handleWhatsAppInquiry}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-600 py-3.5 px-6 text-sm font-semibold text-white shadow-md transition-colors cursor-pointer"
              >
                Enquire on WhatsApp
              </button>

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
