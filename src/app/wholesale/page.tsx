'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, FileText, ClipboardList, Briefcase, Mail, Send, Check } from 'lucide-react';
import { dbService } from '../../services/dbService';
import { Product } from '../../types';
import ProductCard from '../../components/product/ProductCard';
import { useUIStore } from '../../store/uiStore';

export default function WholesaleB2B() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedBranchId, showNotification } = useUIStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    clinicName: '',
    dlNumber: '',
    contactName: '',
    phone: '',
    email: '',
    inquiryDetails: ''
  });

  useEffect(() => {
    setSelectedBranchId('wholesale'); // Sync UI store
    async function loadWholesaleProducts() {
      setLoading(true);
      const prods = await dbService.getProducts(undefined, undefined, 'wholesale');
      setProducts(prods);
      setLoading(false);
    }
    loadWholesaleProducts();
  }, [setSelectedBranchId]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    showNotification(
      'Inquiry Logged',
      'Your B2B trade account request has been logged. Our apothecary operations desk will verify your Drug License.',
      'success'
    );
  };

  return (
    <div className="w-full space-y-16 pb-16">
      {/* Hero Header */}
      <section className="relative h-[45vh] min-h-[350px] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-103"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center space-y-4 text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary px-4 py-1 text-xs uppercase tracking-widest font-bold">
            <Briefcase className="h-4 w-4" />
            PawLuxury B2B Wholesale
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
            Veterinary Medicines & Supplies
          </h1>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Direct distribution hub supplying certified clinics, pharmacies, and pet care retailers. Old Barline Road near Kote, Shivamogga.
          </p>
        </div>
      </section>

      {/* Grid: Form and Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Features and Credentials */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-text-dark">Trade Accounts</h2>
              <p className="text-xs text-text-light leading-relaxed">
                Unlock bulk trade contracts, automated dispatch logs, and payment credit limits. Accounts require a valid Drug License (DL) or Veterinary Registry ID.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded bg-surface border border-surface flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-text-dark font-mono">Certified Apothecary</h4>
                  <p className="text-[11px] text-text-light mt-1 leading-relaxed">
                    100% genuine pharmaceutical chain. Cold chain logistics maintained for critical biologicals and vaccines.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 rounded bg-surface border border-surface flex items-center justify-center text-primary shrink-0">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-text-dark font-mono">Consolidated Dispatch</h4>
                  <p className="text-[11px] text-text-light mt-1 leading-relaxed">
                    Daily regional routing across Shivamogga, Bhadravathi, and Sagar. Instant shipment tracking.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 rounded bg-surface border border-surface flex items-center justify-center text-primary shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-text-dark font-mono">GST Compliant Ledger</h4>
                  <p className="text-[11px] text-text-light mt-1 leading-relaxed">
                    Fully automated accounting logs. Direct invoicing linked with GSTIN declarations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration form */}
          <div className="lg:col-span-2 p-8 rounded-lg bg-surface/30 border border-surface/20 shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-text-dark flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Apply for Trade Account / Bulk Query
            </h3>
            
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="h-12 w-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-text-dark">Inquiry Submitted Successfully</h4>
                <p className="text-xs text-text-light max-w-sm mx-auto leading-relaxed">
                  Our wholesale operations desk is auditing your clinical details. We will contact you at <strong>{formData.phone}</strong> within 12 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-text-dark block">Clinic / Pharmacy Name</label>
                    <input 
                      type="text" 
                      name="clinicName"
                      required
                      value={formData.clinicName}
                      onChange={handleFormChange}
                      placeholder="e.g. Sterling Veterinary Clinic"
                      className="w-full px-3 py-2.5 rounded bg-brand-bg border border-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-text-dark block">Drug License (DL) / Registry Number</label>
                    <input 
                      type="text" 
                      name="dlNumber"
                      required
                      value={formData.dlNumber}
                      onChange={handleFormChange}
                      placeholder="e.g. KA-SMG-10293"
                      className="w-full px-3 py-2.5 rounded bg-brand-bg border border-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-text-dark block">Contact Name</label>
                    <input 
                      type="text" 
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleFormChange}
                      placeholder="e.g. Dr. Sterling"
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
                  <div className="space-y-1">
                    <label className="font-bold text-text-dark block">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="e.g. doctor@sterling.com"
                      className="w-full px-3 py-2.5 rounded bg-brand-bg border border-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-text-dark block">Bulk Query Details</label>
                  <textarea 
                    name="inquiryDetails"
                    rows={3}
                    required
                    value={formData.inquiryDetails}
                    onChange={handleFormChange}
                    placeholder="List specific pharmaceutical or bulk nutrition products..."
                    className="w-full px-3 py-2.5 rounded bg-brand-bg border border-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full rounded bg-primary hover:bg-primary/95 text-brand-bg py-3 font-semibold flex items-center justify-center gap-2 cursor-pointer shadow transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                  Submit B2B Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Wholesale Catalog */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-surface pb-4">
          <span className="text-xs uppercase tracking-widest font-bold text-secondary">Apothecary Catalog</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark mt-1">Wholesale Inventory Listings (B2B Catalog)</h2>
          <p className="text-[10px] text-secondary font-semibold font-mono mt-1">*Inquire for B2B contract options and stock availability.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-surface border-t-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-surface/20 border border-surface/20 rounded-lg">
            <p className="text-xs text-text-light">Wholesale catalog empty. Check config.</p>
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
