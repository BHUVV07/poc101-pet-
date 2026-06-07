'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWishlistStore } from '../../store/wishlistStore';
import { dbService } from '../../services/dbService';
import { Product } from '../../types';
import ProductCard from '../../components/product/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';

export default function Wishlist() {
  const { items: wishlistIds } = useWishlistStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlistProducts() {
      setLoading(true);
      const allProds = await dbService.getProducts();
      // Filter products that are in the wishlist
      const filtered = allProds.filter(p => wishlistIds.includes(p.id));
      setProducts(filtered);
      setLoading(false);
    }
    loadWishlistProducts();
  }, [wishlistIds]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest font-bold text-secondary">Your Selection</span>
        <h1 className="font-serif text-4xl font-bold text-text-dark mt-2">Saved Favorites</h1>
        <p className="text-sm text-text-light mt-3 leading-relaxed">
          Review the luxury creations, orthopedic comfort, and bespoke styling pieces you have bookmarked for your companion.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-surface border-t-primary" />
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-surface/20 border border-surface/20 rounded-lg max-w-xl mx-auto">
          <div className="rounded-full bg-surface p-6 text-text-light">
            <Heart className="h-10 w-10" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-text-dark">Your Wishlist is Empty</h2>
          <p className="text-sm text-text-light max-w-xs leading-relaxed">
            Mark items you admire with the heart icon while exploring our boutiques, and they will be saved here.
          </p>
          <Link
            href="/shop"
            className="rounded-full bg-primary text-brand-bg px-8 py-3 text-sm font-semibold hover:bg-primary/95 transition-all shadow-md"
            id="wishlist-empty-shop-btn"
          >
            Explore Creations
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
