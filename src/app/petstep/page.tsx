'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Truck, Award, Users, ShoppingBag, Send, Check } from 'lucide-react';
import { dbService } from '../../services/dbService';
import { Product } from '../../types';
import ProductCard from '../../components/product/ProductCard';
import { useUIStore } from '../../store/uiStore';

export default function PetstepDistribution() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedBranchId, showNotification } = useUIStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    gstin: '',
    location: '',
    contactName: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    setSelectedBranchId('petstep'); // Sync UI store
    async function loadPetstepProducts() {
      setLoading(true);
      const prods = await dbService.getProducts(undefined, undefined, 'petstep');
      setProducts(prods);
      setLoading(false);
    }
    loadPetstepProducts();
  }, [setSelectedBranchId]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    showNotification(
      'Application Submitted',
      'Your Petstep retail partner application has been submitted. Our dealer accounts desk will verify your details.',
      'success'
    );
  };

  const brands = [
    { name: 'Orijen & Acana', origin: 'Canada', type: 'Biological Raw Kibble' },
    { name: 'Taste of the Wild', origin: 'USA', type: 'Ancestral Grain-Free' },
    { name: 'Royal Heritage', origin: 'Europe', type: 'Organic Freeze-Dried' },
    { name: 'Tuscan Leather', origin: 'Italy', type: 'Artisanal Accessories' }
  ];

  return (
    <div className="w-full space-y-16 pb-16">
      {/* Hero Header */}
      <section className="relative h-[45vh] min-h-[350px] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-103"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center space-y-4 text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary px-4 py-1 text-xs uppercase tracking-widest font-bold">
            <Truck className="h-4 w-4" />
            Petstep Integrated Service Pvt. Ltd.
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
            Premium Brand Distribution Network
          </h1>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Exclusive importer and logistics distributor of world-class pet food, couture, and lifestyle essentials. GSKM Road, Shivamogga.
          </p>
        </div>
      </section>

      {/* Grid: Form and Brands */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Brand Portfolio */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-text-dark">Brand Portfolio</h2>
              <p className="text-xs text-text-light leading-relaxed">
                We manage supply chains for international pet brands across the region. Connect your retail storefront to our central logistics engine.
              </p>
            </div>

            <div className="space-y-4">
              {brands.map((br, idx) => (
                <div key={idx} className="p-4 rounded bg-surface/30 border border-surface/20 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-bold text-text-dark">{br.name}</h4>
                    <span className="text-[9px] uppercase font-mono font-bold text-primary">{br.origin}</span>
                  </div>
                  <p className="text-[10px] text-text-light">{br.type}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Registration form */}
          <div className="lg:col-span-2 p-8 rounded-lg bg-surface/30 border border-surface/20 shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-text-dark flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Retail Partner / Dealership Signup
            </h3>
            
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="h-12 w-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-text-dark">Application Received</h4>
                <p className="text-xs text-text-light max-w-sm mx-auto leading-relaxed">
                  Thank you for applying. Our distributor relationship team is auditing your trade details and will reach out to <strong>{formData.businessName}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-text-dark block">Business / Store Name</label>
                    <input 
                      type="text" 
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleFormChange}
                      placeholder="e.g. Royal Pet Boutique"
                      className="w-full px-3 py-2.5 rounded bg-brand-bg border border-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-text-dark block">GSTIN (Optional)</label>
                    <input 
                      type="text" 
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleFormChange}
                      placeholder="e.g. 29AAAAA0000A1Z5"
                      className="w-full px-3 py-2.5 rounded bg-brand-bg border border-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-text-dark block">Store Location / City</label>
                    <input 
                      type="text" 
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleFormChange}
                      placeholder="e.g. Bhadravathi, KA"
                      className="w-full px-3 py-2.5 rounded bg-brand-bg border border-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-text-dark block">Contact Person</label>
                    <input 
                      type="text" 
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleFormChange}
                      placeholder="e.g. Anish Hegde"
                      className="w-full px-3 py-2.5 rounded bg-brand-bg border border-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-text-dark block">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2.5 rounded bg-brand-bg border border-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-text-dark block">Message / Brands of Interest</label>
                  <textarea 
                    name="message"
                    rows={3}
                    required
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Tell us about your retail outlet size, current brands stocked, and distribution requirements..."
                    className="w-full px-3 py-2.5 rounded bg-brand-bg border border-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full rounded bg-primary hover:bg-primary/95 text-brand-bg py-3 font-semibold flex items-center justify-center gap-2 cursor-pointer shadow transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                  Submit Dealership Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Petstep Catalog */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-surface pb-4 flex justify-between items-baseline">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-primary">Imported Logistics</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark mt-1">International Collections</h2>
            <p className="text-[10px] text-primary font-semibold font-mono mt-1">*Displaying landing dealer pricing index (25% off standard retail).</p>
          </div>
          <Link 
            href="/shop"
            className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            All Products <ShoppingBag className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-surface border-t-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-surface/20 border border-surface/20 rounded-lg">
            <p className="text-xs text-text-light">Distribution catalog empty. Check config.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
