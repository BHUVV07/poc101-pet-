'use client';

import { motion } from 'framer-motion';
import { Pill, Check } from 'lucide-react';
import { productsData, ProductCategory } from '../../data/products';

export default function ProductsPage() {
  return (
    <div className="w-full space-y-16 pb-16 bg-brand-bg text-text-dark">
      {/* Hero Header */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-103"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center space-y-4 text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent px-4 py-1 text-xs uppercase tracking-widest font-bold font-mono">
            ECOSYSTEM CATALOG
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
            Certified Pharmacy & Clinic Supplies
          </h1>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Review the categories of veterinary medicines, diagnostic sets, and therapeutic diets maintained within our network.
          </p>
        </div>
      </section>

      {/* Product Categories Layout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {productsData.map((category, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Category Image */}
              <div className="w-full lg:w-1/2 aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden border border-surface bg-surface/10">
                <img 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                />
              </div>

              {/* Category Info */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary">
                    <Pill className="h-4 w-4" />
                    CATEGORY {index + 1}
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-text-dark">
                    {category.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="border-t border-surface/50 pt-4">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-text-dark mb-3">
                    Available Preparations:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-text-light">
                    {category.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Informational Callout */}
      <section className="mx-auto max-w-4xl px-4 text-center">
        <div className="p-8 rounded-lg bg-surface/30 border border-surface/20 space-y-3">
          <h4 className="font-serif text-lg font-bold text-text-dark">Procurement Coordination</h4>
          <p className="text-xs text-text-light leading-relaxed max-w-lg mx-auto">
            Our pharmacies and wholesale depots operate strictly in compliance with companion animal healthcare regulations. To verify medication stock or establish bulk clinic accounts, please contact our network head desk.
          </p>
        </div>
      </section>
    </div>
  );
}
