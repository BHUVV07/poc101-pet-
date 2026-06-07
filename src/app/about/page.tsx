'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, Activity, ShieldCheck, Heart, Hospital, 
  Store, Truck, Building2, MapPin, ArrowRight, Star
} from 'lucide-react';

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24 bg-brand-bg text-text-dark">
      
      {/* 1. OUR STORY: THE ORIGIN AND THE MISSION */}
      <section className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="w-full lg:w-1/2 space-y-6">
          <span className="text-xs uppercase tracking-widest font-bold text-secondary">Our Story</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-dark leading-tight">
            Established Locally. <br/>Built to Scale Nationally.
          </h1>
          <p className="text-sm text-text-light leading-relaxed">
            PawLuxury did not begin as an abstract digital concept. Our foundations were forged in the real-world operational demands of pet healthcare and retail services in Shivamogga, Karnataka. 
          </p>
          <p className="text-sm text-text-light leading-relaxed">
            By serving thousands of pet parents offline through our retail outlets and multi-speciality veterinary hospital, we realized that pet care deserves a unified, high-end ecosystem. We created PawLuxury to bridge the gap between premium design aesthetics, organic nutritional integrity, and veterinary science—scaling our local authority into a trusted national standard.
          </p>
        </div>

        {/* Cinematic Illustration */}
        <div className="w-full lg:w-1/2 aspect-[16/10] rounded-lg overflow-hidden bg-surface shadow-md relative group">
          <img
            src="https://images.unsplash.com/photo-1513360309081-36f20c3803db?auto=format&fit=crop&q=80&w=800"
            alt="Premium Pet Companionship"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white font-mono text-[10px] uppercase tracking-widest bg-primary/80 backdrop-blur-sm px-3 py-1.5 rounded">
            Shivamogga, KA
          </div>
        </div>
      </section>

      {/* 2. OUR ECOSYSTEM: VISUAL CARDS OF 4 DIVISIONS */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-secondary font-mono">Infrastructure Overview</span>
          <h2 className="font-serif text-3xl font-bold text-text-dark">The PawLuxury Care Network</h2>
          <p className="text-xs text-text-light leading-relaxed">
            Our multi-division business ecosystem forms a complete care infrastructure, connecting wholesale resources with clinical excellence and luxury retail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1: Hospital */}
          <div className="bg-surface/20 border border-surface/30 p-6 rounded-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded bg-accent/10 flex items-center justify-center text-accent">
                <Hospital className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-text-dark">Buddy & Kitty Hospital</h3>
              <p className="text-xs text-text-light leading-relaxed">
                Located on <strong>100 Ft Road</strong>, Shivamogga. A state-of-the-art clinical environment managing advanced pediatrics, surgeries, and digital consultation.
              </p>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">100 Ft Road, KA</span>
          </div>

          {/* Card 2: Retail Stores */}
          <div className="bg-surface/20 border border-surface/30 p-6 rounded-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                <Store className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-text-dark">Retail Outlets</h3>
              <p className="text-xs text-text-light leading-relaxed">
                Premium retail pet storefronts located in the **Garden Area** and **Police Chowki**, offering bespoke nutrition, custom styling, and toys.
              </p>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Garden Area & Police Chowki</span>
          </div>

          {/* Card 3: B2B Wholesale */}
          <div className="bg-surface/20 border border-surface/30 p-6 rounded-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded bg-secondary/10 flex items-center justify-center text-secondary">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-text-dark">Apothecary Wholesale</h3>
              <p className="text-xs text-text-light leading-relaxed">
                Our wholesale veterinary medicines business near **Kote, Old Barline Road**, supplying licensed therapeutics directly to professional clinics.
              </p>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Kote, Old Barline Road</span>
          </div>

          {/* Card 4: Petstep Distribution */}
          <div className="bg-surface/20 border border-surface/30 p-6 rounded-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded bg-accent/10 flex items-center justify-center text-accent">
                <Truck className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-text-dark">Petstep Logistics</h3>
              <p className="text-xs text-text-light leading-relaxed">
                **Petstep Integrated Service Pvt. Ltd.** located beside **Royal Orchid Hotel**, distributing top pet food and lifestyle creations.
              </p>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">GSKM Road, KA</span>
          </div>
        </div>
      </section>

      {/* 3. VETERINARY CARE EXCELLENCE: CLINICAL DEPTH */}
      <section className="flex flex-col lg:flex-row-reverse gap-12 items-center">
        <div className="w-full lg:w-1/2 space-y-6">
          <span className="text-xs uppercase tracking-widest font-bold text-accent">Medical Authority</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark leading-tight">
            Clinical Rigor: Buddy & Kitty Pet Hospital
          </h2>
          <p className="text-sm text-text-light leading-relaxed">
            We believe that veterinary medicine requires absolute expertise and state-of-the-art facilities. Our primary care division, <strong>Buddy & Kitty Multi Speciality Pet Hospital</strong> (100 Ft Road, near Kariyanna Building, Shivamogga), provides advanced diagnostics, pediatric care, surgical operations, and post-surgery rehabilitation support.
          </p>
          <p className="text-sm text-text-light leading-relaxed">
            This operational medical infrastructure backs every virtual consultation requested on the PawLuxury platform. Customers gain access to direct video and chat sessions operated by verified, board-licensed clinical professionals.
          </p>
          
          <div className="pt-2">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-secondary font-bold uppercase tracking-wider transition-colors"
            >
              Learn About Consultations <ArrowRight className="h-4 w-4" />
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
          <span className="text-xs uppercase tracking-widest font-bold text-secondary">Operational Scale</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark leading-tight">
            Petstep Distribution & Apothecary Wholesale
          </h2>
          <p className="text-sm text-text-light leading-relaxed">
            Scalability is driven by our robust logistics framework. <strong>Petstep Integrated Service Pvt. Ltd.</strong> (beside Royal Orchid Hotel, GSKM Road) specializes in distributing multi-brand pet foods and premium accessories across the region.
          </p>
          <p className="text-sm text-text-light leading-relaxed">
            Alongside our logistics division, our veterinary pharmaceutical wholesale unit operates near **Kote, Old Barline Road**. This setup ensures that PawLuxury maintains a robust supply of pharmaceutical-grade remedies and specialty veterinary diets, resolving inventory issues and supporting prompt order deliveries.
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

      {/* 5. PREMIUM PET LIFESTYLE VISION */}
      <section className="bg-surface/30 border border-surface/30 p-8 sm:p-12 rounded-lg text-center max-w-4xl mx-auto space-y-6">
        <span className="text-xs uppercase tracking-widest font-bold text-secondary">The Vision</span>
        <h2 className="font-serif text-3xl font-bold text-text-dark">Aesthetic Comfort & Biological Science</h2>
        <p className="text-sm text-text-light leading-relaxed max-w-2xl mx-auto">
          We reject the notion that pet furniture must look cheap or that pet recipes should rely on heavy chemical fillers. PawLuxury champions an editorial design language—Apple-inspired spacing, warm minimal materials, and neutral palettes—alongside apothecary-grade grooming and organic venison/salmon freeze-dried diets. Your companion deserves a lifestyle that matches the architectural styling of your home.
        </p>
      </section>

      {/* 6. FUTURE EXPANSION VISION */}
      <section className="text-center max-w-2xl mx-auto space-y-6 py-8">
        <span className="text-xs uppercase tracking-widest font-bold text-primary">Moving Forward</span>
        <h2 className="font-serif text-3xl font-bold text-text-dark">The Path to National Scale</h2>
        <p className="text-sm text-text-light leading-relaxed">
          From our established roots in Shivamogga, we are expansion-ready. We are building the platform to scale our premium pet care values nationwide, bringing bespoke accessories, verified online veterinary consults, and next-day pharmaceutical delivery to pet parents all over India.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/shop"
            className="rounded-full bg-primary hover:bg-primary/95 text-brand-bg px-8 py-3 text-xs uppercase tracking-wider font-semibold shadow-md transition-transform hover:translate-y-[-1px]"
          >
            Enter Boutique
          </Link>
          <Link
            href="/consultation"
            className="rounded-full border border-surface hover:bg-surface px-8 py-3 text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            Request Diagnostic Check
          </Link>
        </div>
      </section>

    </div>
  );
}
