'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, ShoppingBag, Eye, X } from 'lucide-react';

interface FeaturedProduct {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  priceLabel: string;
  description: string;
  imageUrl: string;
}

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<FeaturedProduct | null>(null);

  const featured = [
    {
      id: 'prod-1',
      name: 'Cardiology Support Formula (Rx)',
      category: 'Veterinary Medicines',
      rating: 4.9,
      reviewCount: 38,
      priceLabel: 'B2B Wholesale / Prescription',
      description: 'Specialized cardiovascular therapeutic compound to manage chronic cardiac conditions in canine/feline breeds.',
      imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-2',
      name: 'Joint Rejuvenator Mobility Paste',
      category: 'Therapeutic Supplements',
      rating: 4.8,
      reviewCount: 54,
      priceLabel: 'In Stock & Retail Available',
      description: 'High-absorption glucosamine, chondroitin, and hyaluronic acid paste to reinforce companion joint integrity.',
      imageUrl: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-3',
      name: 'Critical Recovery Wet Food',
      category: 'Clinical Nutrition',
      rating: 5.0,
      reviewCount: 42,
      priceLabel: 'Prescribed Dietary Formula',
      description: 'Hypoallergenic high-protein recovery diet formulated to restabilize gut flora and sustain metabolic recovery.',
      imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-4',
      name: 'Rapid Antigen Diagnostic Strips',
      category: 'Clinical & Lab Supplies',
      rating: 4.7,
      reviewCount: 19,
      priceLabel: 'B2B Exclusive',
      description: 'Rapid diagnostic lateral flow assay tests for veterinarians to detect critical antigens within 10 minutes.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-5',
      name: 'Medicated Antifungal Shampoo',
      category: 'Grooming & Hygiene',
      rating: 4.9,
      reviewCount: 65,
      priceLabel: 'Retail Counter Collection',
      description: 'Clinical-strength pH-balanced botanical anti-parasitic wash to restore the companion epidermal barrier.',
      imageUrl: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-6',
      name: 'Orthopedic Joint Support Bed',
      category: 'Safety & Accessories',
      rating: 4.8,
      reviewCount: 29,
      priceLabel: 'Specialist Triage Support',
      description: 'High-density memory foam bedding to minimize skeletal stress and cushion geriatric companion breeds.',
      imageUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=600',
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-surface/10 border-b border-surface/50" id="featured-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 text-xs uppercase tracking-widest font-bold font-mono">
              Medical & Retail Store
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight leading-tight">
              Featured Apothecary & Products
            </h2>
            <p className="text-sm text-text-light leading-relaxed">
              Explore our verified pharmaceutical stock, clinical nutrition formulas, and advanced diagnostic consumables.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-surface/30 border border-surface/80 text-text-dark px-6 py-3.5 text-xs font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-secondary self-start sm:self-auto"
          >
            Explore Catalog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Horizontal Slider Area */}
        <div className="w-full overflow-x-auto no-scrollbar flex gap-6 pb-6 scroll-smooth snap-x snap-mandatory">
          {featured.map((prod) => (
            <div 
              key={prod.id}
              className="w-80 shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-surface/40 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              
              {/* Product Image Panel */}
              <div className="relative aspect-[4/3] w-full bg-surface/20 overflow-hidden">
                <img 
                  src={prod.imageUrl} 
                  alt={prod.name} 
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Floating Quick view hover button */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => setSelectedProduct(prod)}
                    className="p-3 rounded-full bg-white text-text-dark shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label={`Quick view details for ${prod.name}`}
                  >
                    <Eye className="h-5 w-5 text-primary" />
                  </button>
                </div>

                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold text-text-light uppercase tracking-wider shadow-sm">
                  {prod.category}
                </div>
              </div>

              {/* Product Body Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  
                  {/* Rating block */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-500 gap-0.5">
                      <Star className="h-3 w-3 fill-current" />
                    </div>
                    <span className="text-[10px] font-bold text-text-dark">{prod.rating}</span>
                    <span className="text-[9px] text-text-light">({prod.reviewCount} reviews)</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-text-dark leading-tight group-hover:text-primary transition-colors line-clamp-1">
                    {prod.name}
                  </h3>
                  <p className="text-[11px] text-text-light leading-relaxed line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface/30 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-primary">
                    {prod.priceLabel}
                  </span>
                  
                  <button 
                    onClick={() => setSelectedProduct(prod)}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-primary hover:text-secondary transition-colors cursor-pointer"
                  >
                    Details &rarr;
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Quick View Modal Box */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedProduct(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-surface/30 p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface/30 text-text-light hover:text-text-dark transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-surface/20">
              <img 
                src={selectedProduct.imageUrl} 
                alt={selectedProduct.name} 
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-secondary">
                {selectedProduct.category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-text-dark">
                {selectedProduct.name}
              </h3>
              <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                {selectedProduct.description}
              </p>
              
              <div className="flex items-center gap-2 pt-2 border-t border-surface/30 text-xs text-text-dark font-medium">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <span>Availability: {selectedProduct.priceLabel}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Link 
                href="/products"
                onClick={() => setSelectedProduct(null)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/95 text-white py-3 text-xs font-semibold shadow transition-colors"
              >
                Inquire Apothecary
              </Link>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="w-full inline-flex items-center justify-center rounded-full bg-white hover:bg-surface/30 border border-surface/80 text-text-dark py-3 text-xs font-semibold transition-colors"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
