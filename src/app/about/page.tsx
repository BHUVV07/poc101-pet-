'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Hospital, Store, Truck, Building2, ArrowRight
} from 'lucide-react';
import { companyDetails } from '../../data/company';

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24 bg-brand-bg text-text-dark">
      
      {/* 1. OUR STORY */}
      <section className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="w-full lg:w-1/2 space-y-6">
          <span className="text-xs uppercase tracking-widest font-bold text-secondary font-mono">Our Story</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-dark leading-tight">
            Established Locally. <br/>Built to Scale.
          </h1>
          <p className="text-sm text-text-light leading-relaxed">
            {companyDetails.aboutOverview}
          </p>
          <p className="text-sm text-text-light leading-relaxed">
            By serving thousands of companion animal caretakers and clinical practices offline through our retail pharmacies and multi-speciality veterinary hospital, we realized that veterinary medicine deserves a unified, high-integrity ecosystem. We bridge the gap between B2B medicine logistics, clinical care excellence, and veterinary science.
          </p>
        </div>

        {/* Cinematic Illustration */}
        <div className="w-full lg:w-1/2 aspect-[16/10] rounded-lg overflow-hidden bg-surface shadow-md relative group">
          <img
            src="https://images.unsplash.com/photo-1513360309081-36f20c3803db?auto=format&fit=crop&q=80&w=800"
            alt="Veterinary Science & Companionship"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white font-mono text-[10px] uppercase tracking-widest bg-primary/80 backdrop-blur-sm px-3 py-1.5 rounded">
            Shivamogga, KA
          </div>
        </div>
      </section>

      {/* 2. OUR ECOSYSTEM */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-secondary font-mono">Infrastructure Overview</span>
          <h2 className="font-serif text-3xl font-bold text-text-dark">The Care Network</h2>
          <p className="text-xs text-text-light leading-relaxed">
            Our multi-division business ecosystem forms a complete care infrastructure, connecting wholesale resources with clinical excellence and pharmacy retail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1: Hospital */}
          <Link href="/divisions/buddy-kitty" className="bg-surface/20 hover:border-primary/45 border border-surface/30 p-6 rounded-lg flex flex-col justify-between space-y-6 cursor-pointer transition-all">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded bg-accent/10 flex items-center justify-center text-accent">
                <Hospital className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-text-dark">Buddy & Kitty Hospital</h3>
              <p className="text-xs text-text-light leading-relaxed">
                Located on <strong>100 Ft Road</strong>, Shivamogga. A state-of-the-art clinical environment managing advanced diagnostics, surgery, and consultations.
              </p>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">100 Ft Road, KA</span>
          </Link>

          {/* Card 2: Retail Pharmacies */}
          <Link href="/divisions/garden-area" className="bg-surface/20 hover:border-primary/45 border border-surface/30 p-6 rounded-lg flex flex-col justify-between space-y-6 cursor-pointer transition-all">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                <Store className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-text-dark">Retail Pharmacies</h3>
              <p className="text-xs text-text-light leading-relaxed">
                Premium clinical outlets in the **Garden Area** and **Police Chowki**, providing prescription medicines, medical treatments, and therapeutic diets.
              </p>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Garden Area & Police Chowki</span>
          </Link>

          {/* Card 3: B2B Wholesale */}
          <Link href="/divisions/wholesale" className="bg-surface/20 hover:border-primary/45 border border-surface/30 p-6 rounded-lg flex flex-col justify-between space-y-6 cursor-pointer transition-all">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded bg-secondary/10 flex items-center justify-center text-secondary">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-text-dark">Apothecary Wholesale</h3>
              <p className="text-xs text-text-light leading-relaxed">
                Our wholesale veterinary medicines business near **Kote, Old Barline Road**, supplying licensed therapeutics directly to regional practices.
              </p>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Kote, Old Barline Road</span>
          </Link>

          {/* Card 4: Logistics & Distribution */}
          <Link href="/divisions/petstep" className="bg-surface/20 hover:border-primary/45 border border-surface/30 p-6 rounded-lg flex flex-col justify-between space-y-6 cursor-pointer transition-all">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded bg-accent/10 flex items-center justify-center text-accent">
                <Truck className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-text-dark">Petstep Logistics</h3>
              <p className="text-xs text-text-light leading-relaxed">
                **Petstep Integrated Service Pvt. Ltd.** beside **Royal Orchid Hotel**, distributing pharmaceutical lines, vaccine shipments, and clinic inventory.
              </p>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">GSKM Road, KA</span>
          </Link>
        </div>
      </section>

      {/* 3. VETERINARY CARE EXCELLENCE */}
      <section className="flex flex-col lg:flex-row-reverse gap-12 items-center">
        <div className="w-full lg:w-1/2 space-y-6">
          <span className="text-xs uppercase tracking-widest font-bold text-accent font-mono">Medical Authority</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark leading-tight">
            Clinical Rigor: Buddy & Kitty Pet Hospital
          </h2>
          <p className="text-sm text-text-light leading-relaxed">
            We believe that veterinary medicine requires absolute expertise and state-of-the-art facilities. Our primary care division, <strong>Buddy & Kitty Multi Speciality Pet Hospital</strong> (100 Ft Road, near Kariyanna Building, Shivamogga), provides advanced diagnostics, pediatric care, surgical operations, and post-surgery rehabilitation support.
          </p>
          <p className="text-sm text-text-light leading-relaxed">
            This operational medical infrastructure backs every pharmaceutical consult requested on our platform. Veterinary queries gain immediate reference to verified, board-licensed clinical professionals.
          </p>
          
          <div className="pt-2">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-secondary font-bold uppercase tracking-wider transition-colors"
            >
              Learn About Clinical Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Vet image */}
        <div className="w-full lg:w-1/2 aspect-[4/3] rounded-lg overflow-hidden bg-surface shadow-md">
          <img
            src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800"
            alt="Veterinary Clinical Care"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* 4. RETAIL & DISTRIBUTION NETWORK */}
      <section className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="w-full lg:w-1/2 space-y-6">
          <span className="text-xs uppercase tracking-widest font-bold text-secondary font-mono">Operational Scale</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark leading-tight">
            Petstep Logistics & Apothecary Wholesale
          </h2>
          <p className="text-sm text-text-light leading-relaxed">
            Scalability is driven by our robust logistics framework. <strong>Petstep Integrated Service Pvt. Ltd.</strong> (beside Royal Orchid Hotel, GSKM Road) specializes in distributing multi-brand veterinary medicines and clinical equipment across the region.
          </p>
          <p className="text-sm text-text-light leading-relaxed">
            Alongside our logistics division, our veterinary pharmaceutical wholesale unit operates near **Kote, Old Barline Road**. This setup ensures that we maintain a robust supply of pharmaceutical-grade remedies and specialty veterinary diets, resolving inventory issues and supporting prompt clinical deliveries.
          </p>
        </div>

        {/* Distribution network image */}
        <div className="w-full lg:w-1/2 aspect-[4/3] rounded-lg overflow-hidden bg-surface shadow-md">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
            alt="Logistics & Warehousing"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* 5. QUALITY ASSURANCE VISION */}
      <section className="bg-surface/30 border border-surface/30 p-8 sm:p-12 rounded-lg text-center max-w-4xl mx-auto space-y-6">
        <span className="text-xs uppercase tracking-widest font-bold text-secondary font-mono">Quality Assurance</span>
        <h2 className="font-serif text-3xl font-bold text-text-dark">Apothecary Standards & Clinical Storage</h2>
        <p className="text-sm text-text-light leading-relaxed max-w-2xl mx-auto">
          We reject the notion that veterinary medicine logistics can be handled casually. We maintain temperature-controlled storage ranges (2°C to 8°C for biological vaccines) and audit batch tracking, providing premium quality assurance for veterinary pharmacies, clinical diets, and specialty pharmaceuticals.
        </p>
      </section>

      {/* 6. VALUES SECTION */}
      <section className="text-center max-w-3xl mx-auto space-y-8 py-8">
        <span className="text-xs uppercase tracking-widest font-bold text-primary font-mono">Our Values</span>
        <h2 className="font-serif text-3xl font-bold text-text-dark">What Guides Our Network</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {companyDetails.values.map((v, i) => (
            <div key={i} className="p-5 rounded-lg bg-surface/20 border border-surface/20 space-y-2">
              <h4 className="text-sm font-bold text-text-dark">{v.title}</h4>
              <p className="text-xs text-text-light leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/divisions/wholesale"
            className="rounded-full bg-primary hover:bg-primary/95 text-brand-bg px-8 py-3.5 text-xs uppercase tracking-wider font-semibold shadow-md transition-transform hover:translate-y-[-1px]"
          >
            Explore B2B Wholesale
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-surface hover:bg-surface px-8 py-3.5 text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            Our Services
          </Link>
        </div>
      </section>

    </div>
  );
}
