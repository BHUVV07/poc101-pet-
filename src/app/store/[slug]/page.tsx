'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';
import { dbService } from '../../../services/dbService';
import { Branch, Product } from '../../../types';
import ProductCard from '../../../components/product/ProductCard';
import { useUIStore } from '../../../store/uiStore';

export default function StoreLanding({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [branch, setBranch] = useState<Branch | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedBranchId } = useUIStore();

  useEffect(() => {
    async function loadBranchData() {
      setLoading(true);
      const b = await dbService.getBranchBySlug(slug);
      if (b) {
        setBranch(b);
        setSelectedBranchId(b.id); // Sync UI store
        const prods = await dbService.getProducts(undefined, undefined, b.id);
        setProducts(prods);
      }
      setLoading(false);
    }
    loadBranchData();
  }, [slug, setSelectedBranchId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-surface border-t-primary" />
      </div>
    );
  }

  if (!branch) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-text-dark">Boutique Not Found</h2>
        <p className="text-text-light text-sm">We could not locate the specific outlet you are searching for.</p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-primary text-brand-bg px-8 py-3 text-sm font-semibold transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="relative h-[45vh] min-h-[350px] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 scale-103"
          style={{ 
            backgroundImage: `url(${
              branch.id === 'garden-area' 
                ? 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1200' 
                : 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=1200'
            })` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center space-y-4 text-white">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-secondary">
            Bespoke Outlet
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
            {branch.name}
          </h1>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Experience premium curated lifestyles, human-grade nutrition, and personalized companion services locally in Shivamogga.
          </p>
        </div>
      </section>

      {/* Info Panel & Payment Details */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Outlet details */}
          <div className="lg:col-span-2 p-8 rounded-lg bg-surface/25 border border-surface/20 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-text-dark">Outlet Directory</h2>
              <p className="text-xs text-text-light leading-relaxed">
                Visit our physical store to inspect our collections, consult with companion styling specialists, and experience the PawLuxury standard in person.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <span className="font-bold text-text-dark block">Address</span>
                    <span className="text-text-light mt-1 block">{branch.address}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <span className="font-bold text-text-dark block">Contact</span>
                    <span className="text-text-light mt-1 block">{branch.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a 
                href={`https://wa.me/${branch.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-2.5 text-xs font-semibold shadow transition-all duration-300"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp Boutique
              </a>
              <Link 
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/95 text-brand-bg px-6 py-2.5 text-xs font-semibold shadow transition-all duration-300"
              >
                <ShoppingBag className="h-4 w-4" />
                Explore Master Catalog
              </Link>
            </div>
          </div>

          {/* Inquiry Details Card */}
          <div className="p-8 rounded-lg bg-surface/40 border border-surface/30 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-text-dark flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Concierge Desk
              </h3>
              <p className="text-xs text-text-light leading-relaxed">
                Connect with our branch concierge team directly to check showcase product availability, request branch pickup, or arrange premium services.
              </p>
              
              <div className="space-y-3 pt-2 text-xs divide-y divide-surface/60">
                <div className="py-2.5 flex justify-between">
                  <span className="text-text-light font-medium">Branch Hours:</span>
                  <span className="text-text-dark font-bold">9:00 AM - 9:00 PM</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-text-light font-medium">WhatsApp Support:</span>
                  <span className="text-emerald-700 font-bold">Online</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-text-light font-medium">Diagnostics Slot:</span>
                  <span className="text-accent font-bold">By Appointment</span>
                </div>
              </div>
            </div>

            <a 
              href={`https://wa.me/${branch.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I am contacting ${branch.name} from PawLuxury.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white py-3 text-xs font-semibold shadow transition-all duration-300"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </section>

      {/* Outlet Catalog */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-baseline border-b border-surface pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-secondary">Current Inventory</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark mt-1">In Stock at this Outlet</h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            All Outlets Catalog <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-surface/20 border border-surface/20 rounded-lg">
            <p className="text-xs text-text-light font-medium">All creations currently sold out at this branch. Check other locations.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 9).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
