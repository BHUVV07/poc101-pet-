'use client';

import Link from 'next/link';
import { ShoppingBag, MessageSquare, Calendar, Store, ArrowLeft } from 'lucide-react';

export default function CheckoutOffline() {
  const handleWhatsAppSupport = () => {
    const text = encodeURIComponent('Hello PawLuxury! I would like to inquire about purchasing products from your showcase catalog.');
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="bg-surface/20 border border-surface/30 rounded-xl p-8 sm:p-12 text-center space-y-8 shadow-sm">
        {/* Luxury Icon header */}
        <div className="mx-auto h-16 w-16 rounded-full bg-surface/50 border border-primary/20 flex items-center justify-center text-primary">
          <Store className="h-8 w-8" />
        </div>

        {/* Narrative */}
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-secondary">Ecosystem Catalog Update</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark">Boutique Checkout Offline</h1>
          <p className="text-sm text-text-light max-w-md mx-auto leading-relaxed">
            PawLuxury has transitioned from transactional e-commerce to a premium brand showcase and veterinary diagnostic portal. Direct purchases are now settled in-store at our retail locations or via our WhatsApp inquiry concierge.
          </p>
        </div>

        {/* Context Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto pt-4 border-t border-surface/30">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-text-dark uppercase font-mono">Retail Storefronts</h4>
            <p className="text-[11px] text-text-light leading-relaxed">
              Explore products in person at our **Garden Area Store** and **Police Chowki Store** in Shivamogga.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-text-dark uppercase font-mono">Concierge Delivery</h4>
            <p className="text-[11px] text-text-light leading-relaxed">
              Inquire about custom delivery parameters, trade accounts, and pharmacy wholesale distributions.
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 max-w-md mx-auto">
          {/* Primary WhatsApp */}
          <button
            onClick={handleWhatsAppSupport}
            className="flex items-center justify-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white py-3 px-8 text-xs uppercase tracking-wider font-semibold shadow transition-all cursor-pointer"
          >
            <MessageSquare className="h-4 w-4" />
            WhatsApp Inquiry
          </button>

          {/* Secondary Consult */}
          <Link
            href="/consultation"
            className="flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/95 text-brand-bg py-3 px-8 text-xs uppercase tracking-wider font-semibold shadow transition-all cursor-pointer"
          >
            <Calendar className="h-4 w-4 text-brand-bg" />
            Book Vet Consultation
          </Link>
        </div>

        {/* Return link */}
        <div className="pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary transition-colors font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Boutique Showcase
          </Link>
        </div>
      </div>
    </div>
  );
}
