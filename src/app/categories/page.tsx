'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { dbService } from '../../services/dbService';
import { Category } from '../../types';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const cats = await dbService.getCategories();
      setCategories(cats);
    }
    loadCategories();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest font-bold text-secondary">The Collections</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-dark mt-2">Boutiques by Category</h1>
        <p className="text-sm text-text-light mt-3 leading-relaxed">
          Navigate our structured ecosystems. Each boutique houses products crafted for high-performance pet care and luxury living.
        </p>
      </div>

      {/* Grid List */}
      <div className="space-y-12">
        {categories.map((cat, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col lg:flex-row gap-8 items-center bg-surface/20 border border-surface/20 rounded-lg overflow-hidden ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 aspect-[4/3] bg-surface relative overflow-hidden shrink-0">
                <img
                  src={cat.imageUrl || ''}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
                />
              </div>

              {/* Text */}
              <div className="p-8 sm:p-12 flex-1 space-y-6">
                <span className="text-xs uppercase tracking-widest font-bold text-secondary">
                  Collection 0{idx + 1}
                </span>
                <h2 className="font-serif text-3xl font-bold text-text-dark">
                  {cat.name}
                </h2>
                <p className="text-sm text-text-light leading-relaxed">
                  {cat.description}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/95 text-brand-bg px-6 py-3 text-xs uppercase tracking-wider font-semibold shadow transition-all duration-300"
                    id={`cat-btn-${cat.slug}`}
                  >
                    Enter Boutique
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
