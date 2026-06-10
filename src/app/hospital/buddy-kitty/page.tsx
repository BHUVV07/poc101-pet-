'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Stethoscope, Clock, ShieldCheck, Heart, User, Calendar, Phone, Activity } from 'lucide-react';
import { dbService } from '../../../services/dbService';
import { Product } from '../../../types';
import ProductCard from '../../../components/product/ProductCard';
import { useUIStore } from '../../../store/uiStore';

export default function PetHospital() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedBranchId } = useUIStore();

  useEffect(() => {
    setSelectedBranchId('buddy-kitty'); // Sync UI store
    async function loadHospitalProducts() {
      setLoading(true);
      // Fetch products stocked at buddy-kitty (Healthcare / Vet Nutrition / Supplements / Wellness)
      const prods = await dbService.getProducts(undefined, undefined, 'buddy-kitty');
      setProducts(prods);
      setLoading(false);
    }
    loadHospitalProducts();
  }, [setSelectedBranchId]);

  const doctors = [
    { name: 'Dr. Evelyn Sterling, DVM', role: 'Chief Veterinarian', specialty: 'Pediatric & Internal Medicine', exp: '14+ Yrs' },
    { name: 'Dr. Anoop Kumar, MVSc', role: 'Senior Veterinary Surgeon', specialty: 'Orthopedics & Soft Tissue Surgery', exp: '11+ Yrs' },
    { name: 'Dr. Priya Sharma, DVM', role: 'Clinical Dietitian', specialty: 'Apothecary & Renal Care', exp: '8+ Yrs' }
  ];

  return (
    <div className="w-full space-y-16 pb-16">
      {/* Hero Header */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-45 scale-103"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center space-y-4 text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent px-4 py-1 text-xs uppercase tracking-widest font-bold">
            <Activity className="h-4 w-4 animate-pulse" />
            Buddy & Kitty Hospital
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
            Ecosystem of Trust & Medical Care
          </h1>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Multi-speciality veterinary diagnostics, advanced sterile surgery, and certified apothecary therapeutics. Located in Shivamogga, Karnataka.
          </p>
        </div>
      </section>

      {/* Trust Badges & Clinical Highlights */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-surface/30 border border-surface/20 space-y-3">
            <Stethoscope className="h-10 w-10 text-accent" />
            <h3 className="font-serif text-lg font-bold text-text-dark">Complete Diagnostics</h3>
            <p className="text-xs text-text-light leading-relaxed">
              Equipped with digital X-Ray, high-resolution ultrasound, and complete hematology laboratories for precise cellular evaluations.
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-surface/30 border border-surface/20 space-y-3">
            <Clock className="h-10 w-10 text-accent" />
            <h3 className="font-serif text-lg font-bold text-text-dark">Critical Response</h3>
            <p className="text-xs text-text-light leading-relaxed">
              Dedicated trauma and surgical emergency stabilization lines open daily, serving companions needing immediate medical support.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-surface/30 border border-surface/20 space-y-3">
            <ShieldCheck className="h-10 w-10 text-accent" />
            <h3 className="font-serif text-lg font-bold text-text-dark">Clinical Pharmacy</h3>
            <p className="text-xs text-text-light leading-relaxed">
              Our in-house apothecary houses certified vaccines, specific cardiac and renal compounds, and direct recovery formulations.
            </p>
          </div>
        </div>
      </section>

      {/* Specialist Registry */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-bold text-accent">Specialists</span>
          <h2 className="font-serif text-3xl font-bold text-text-dark mt-1">Our Veterinary Directorate</h2>
          <p className="text-xs text-text-light mt-2 leading-relaxed">
            Consolidated clinical experience from board-certified veterinarians. Dedicated to absolute wellness, geriatric diagnostics, and recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doc, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-surface/20 border border-surface/20 text-center space-y-4 shadow-sm hover:border-accent/40 transition-colors">
              <div className="h-16 w-16 mx-auto rounded-full bg-surface border border-surface flex items-center justify-center text-accent">
                <User className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-text-dark">{doc.name}</h3>
                <p className="text-xs text-accent font-semibold">{doc.role}</p>
                <p className="text-[11px] text-text-light leading-normal">{doc.specialty}</p>
              </div>
              <div className="border-t border-surface/60 pt-3 flex justify-between text-[10px] text-text-light font-mono">
                <span>EXPERIENCE: {doc.exp}</span>
                <span>AVAILABILITY: DAILY</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link 
            href="/consultation"
            className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/95 text-white px-8 py-3 text-xs uppercase tracking-wider font-semibold shadow transition-all duration-300"
          >
            <Calendar className="h-4 w-4" />
            Book Clinical Consultation
          </Link>
        </div>
      </section>

      {/* Apothecary Clinical Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-baseline border-b border-surface pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-accent">Clinical Diets & Recovery</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark mt-1">Prescription Apothecary Products</h2>
          </div>
          <a 
            href="tel:+919876543213" 
            className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors flex items-center gap-1.5"
          >
            <Phone className="h-4 w-4" />
            Call Vet Desk
          </a>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-surface border-t-accent" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-surface/20 border border-surface/20 rounded-lg">
            <p className="text-xs text-text-light">Prescription items not loaded. Check connection.</p>
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
