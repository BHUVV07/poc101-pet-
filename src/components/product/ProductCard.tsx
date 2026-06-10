'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Star } from 'lucide-react';
import { Product } from '../../types';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUIStore } from '../../store/uiStore';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { setQuickViewProduct, showNotification } = useUIStore();
  const [isHovered, setIsHovered] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showNotification(
      isFavorite ? 'Removed from Wishlist' : 'Saved to Wishlist',
      isFavorite 
        ? `${product.name} was removed from your favorites.`
        : `${product.name} has been saved to your favorites.`,
      'info'
    );
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-brand-bg rounded-lg border border-surface/40 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Product Image Panel */}
      <div className="relative aspect-[4/5] w-full bg-surface overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-full w-full object-cover"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-4 right-4 h-9 w-9 rounded-full bg-brand-bg/90 backdrop-blur-sm flex items-center justify-center shadow-sm cursor-pointer transition-colors ${
            isFavorite ? 'text-red-500 hover:text-red-600' : 'text-text-dark hover:text-primary'
          }`}
          title="Add to Wishlist"
        >
          <Heart className="h-4.5 w-4.5" fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Quick View Overlay Actions */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleQuickView}
            className="h-10 px-5 rounded-full bg-brand-bg flex items-center justify-center gap-1.5 text-xs font-bold text-text-dark hover:bg-primary hover:text-brand-bg shadow-lg transition-colors cursor-pointer"
            title="Quick View"
          >
            <Eye className="h-4.5 w-4.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Details Panel */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Brand/Category Tag */}
          <span className="text-[10px] text-text-light uppercase tracking-widest font-semibold block mb-0.5">
            {product.categoryId === 'cat-1' && 'Gourmet Dining'}
            {product.categoryId === 'cat-2' && 'Haute Couture'}
            {product.categoryId === 'cat-3' && 'Living & Comfort'}
            {product.categoryId === 'cat-4' && 'Wellness & Care'}
          </span>
          
          {/* Name */}
          <Link href={`/product/${product.slug}`} className="hover:text-primary transition-colors block">
            <h3 className="font-serif text-base font-semibold text-text-dark line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between pt-1">
          {/* Inquiry Indicator */}
          <span className="text-[11px] font-bold text-primary tracking-wider uppercase">
            Showcase Catalog
          </span>

          {/* Ratings */}
          <div className="flex items-center space-x-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-[11px] font-bold text-text-dark">{product.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
