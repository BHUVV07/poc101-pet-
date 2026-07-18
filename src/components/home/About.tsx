'use client';

import { companyDetails } from '../../data/company';
import { Award, Compass, Shield, CalendarDays } from 'lucide-react';

export default function About() {
  const valueIcons = [Award, Compass, Shield];

  // Timeline events representing corporate milestones
  const milestones = [
    { year: '2011', event: 'Founded flagship retail pharmacy in Garden Area.' },
    { year: '2018', event: 'Launched B2B wholesale division near Kote, old Barline.' },
    { year: '2021', event: 'Established Petstep cold-chain distribution network.' },
    { year: '2024', event: 'Opened Buddy & Kitty Specialty Hospital on 100 Ft Road.' },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-brand-bg border-b border-surface/50" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Split Introduction Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Panel: Description and Values */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-bold font-mono">
              Ecosystem Legacy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight leading-tight">
              A Structured Circle of Trust for Animal Health
            </h2>
            <p className="text-sm sm:text-base text-text-light leading-relaxed text-pretty font-sans">
              {companyDetails.aboutOverview}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-white border border-surface/40 shadow-sm space-y-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-primary">
                  <Award className="h-3.5 w-3.5" />
                  Our Mission
                </span>
                <p className="text-xs text-text-light leading-relaxed">{companyDetails.mission}</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-surface/40 shadow-sm space-y-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-accent">
                  <Compass className="h-3.5 w-3.5" />
                  Our Vision
                </span>
                <p className="text-xs text-text-light leading-relaxed">{companyDetails.vision}</p>
              </div>
            </div>
          </div>

          {/* Right Panel: Large Clinical Imagery */}
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden border-[6px] border-white shadow-xl bg-surface/20">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
              alt="Veterinarian testing blood chemistry profile in clinic laboratory" 
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-surface/20 shadow-lg max-w-sm">
              <p className="font-serif italic text-xs sm:text-sm text-text-dark leading-relaxed">
                &ldquo;Diagnostic integrity is the foundation of therapeutic success.&rdquo;
              </p>
            </div>
          </div>

        </div>

        {/* Corporate Growth Timeline Block */}
        <div className="pt-8 border-t border-surface/40 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark">
              Growth Chronology
            </h3>
            <p className="text-xs sm:text-sm text-text-light">
              How we expanded from a single neighborhood apothecary into a complete regional pet healthcare loop.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-surface z-0 pointer-events-none" />
            
            {milestones.map((ms) => (
              <div key={ms.year} className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 group">
                <div className="h-10 w-10 rounded-full bg-white border border-surface flex items-center justify-center text-primary shadow-sm group-hover:border-primary transition-colors duration-300">
                  <CalendarDays className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1">
                  <span className="block font-serif text-xl font-bold text-primary">
                    {ms.year}
                  </span>
                  <p className="text-xs text-text-light leading-relaxed max-w-xs">
                    {ms.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values declaration */}
        <div className="space-y-8 pt-8 border-t border-surface/40">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark">Ecosystem Principles</h3>
            <p className="text-xs sm:text-sm text-text-light">
              The therapeutic standards governing our pharmacies, logistics agents, and veterinary surgeons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyDetails.values.map((value, idx) => {
              const Icon = valueIcons[idx % valueIcons.length];
              return (
                <div 
                  key={value.title}
                  className="p-6 rounded-2xl bg-surface/20 border border-surface/30 space-y-3 hover:bg-surface/35 transition-colors duration-200"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-text-dark">
                    {value.title}
                  </h4>
                  <p className="text-xs text-text-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
