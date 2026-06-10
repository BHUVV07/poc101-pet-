'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { dbService } from '../../services/dbService';
import { Product, Category } from '../../types';
import ProductCard from '../../components/product/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [prevCategoryParam, setPrevCategoryParam] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const { selectedBranchId } = useUIStore();

  const categoryParam = searchParams.get('category') || '';
  if (categoryParam !== prevCategoryParam) {
    setPrevCategoryParam(categoryParam);
    setSelectedCategory(categoryParam);
  }

  // Load Categories & filter by branch
  useEffect(() => {
    async function loadCategories() {
      const cats = await dbService.getCategories();
      const branchProds = await dbService.getProducts(undefined, undefined, selectedBranchId);
      const activeCatIds = new Set(branchProds.map(p => p.categoryId));
      const filteredCats = cats.filter(c => activeCatIds.has(c.id));
      setCategories(filteredCats);
    }
    loadCategories();
  }, [selectedBranchId]);

  // Load Products when filters change
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const catId = selectedCategory 
        ? categories.find(c => c.slug === selectedCategory)?.id 
        : undefined;
      
      let prods = await dbService.getProducts(catId, searchTerm, selectedBranchId);

      // Sorting
      if (sortBy === 'price-low') {
        prods = [...prods].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
      } else if (sortBy === 'price-high') {
        prods = [...prods].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
      } else if (sortBy === 'rating') {
        prods = [...prods].sort((a, b) => b.rating - a.rating);
      } else {
        // newest default
        prods = [...prods].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }

      setProducts(prods);
      setLoading(false);
    }
    
    // Only load once categories are loaded if selectedCategory is set
    if (!selectedCategory || categories.length > 0) {
      loadProducts();
    }
  }, [selectedCategory, searchTerm, sortBy, categories]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-dark">The Boutique</h1>
        <p className="text-sm text-text-light mt-3 leading-relaxed">
          Discover a curated ecosystem of premium pet care, organic nutrition, orthopedic styling, and artisanal couture.
        </p>
      </div>

      {/* Filters and Search Panel */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between border-b border-surface pb-6 mb-8">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <input
            type="text"
            placeholder="Search our luxury collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-surface bg-brand-bg text-sm text-text-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            id="shop-search-input"
          />
          <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-text-light" />
        </div>

        {/* Filters dropdown */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto justify-end">
          {/* Category Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <SlidersHorizontal className="h-4 w-4 text-primary shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-48 bg-brand-bg border border-surface rounded-full py-2 px-3 text-xs font-semibold text-text-dark focus:outline-none cursor-pointer"
              id="shop-category-select"
            >
              <option value="">All Collections</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ArrowUpDown className="h-4 w-4 text-primary shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-44 bg-brand-bg border border-surface rounded-full py-2 px-3 text-xs font-semibold text-text-dark focus:outline-none cursor-pointer"
              id="shop-sort-select"
            >
              <option value="newest">Sort: New Releases</option>
              <option value="rating">Sort: By Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid listing */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-surface border-t-primary" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-surface/20 border border-surface/20 rounded-lg space-y-4">
          <p className="text-base text-text-light font-medium">No creations match your search parameters.</p>
          <button
            onClick={() => {
              setSelectedCategory('');
              setSearchTerm('');
              setSortBy('newest');
            }}
            className="rounded-full bg-primary py-2 px-6 text-sm font-semibold text-brand-bg hover:bg-primary/95 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
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

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-surface border-t-primary" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
