'use client';

import Link from 'next/link';
import { divisionsData } from '../../data/divisions';
import { ArrowRight, MapPin, Clock, CheckCircle } from 'lucide-react';

export default function Businesses() {
  // Filter for the 4 primary business branches
  const activeDivisions = divisionsData.filter(div => 
    ['buddy-kitty', 'garden-area', 'police-chowki', 'wholesale'].includes(div.id)
  );

  return (
    <section className="w-full py-16 md:py-24 bg-surface/10 border-b border-surface/50" id="businesses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary px-4 py-1.5 text-xs uppercase tracking-widest font-bold font-mono">
            Ecosystem Branches
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight leading-tight">
            Our Primary Business Units
          </h2>
          <p className="text-sm sm:text-base text-text-light leading-relaxed">
            Four specialized operations working in synchrony to deliver clinical diagnostics, prescription drugs, wholesale supplies, and companion styling.
          </p>
        </div>

        {/* Showcase Cards List (Alternating Layout) */}
        <div className="space-y-16 lg:space-y-24">
          {activeDivisions.map((division, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <article 
                key={division.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
              >
                
                {/* Visual Image Column (Alternates left/right on desktop) */}
                <div className={`col-span-1 lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden shadow-md border border-surface/30 group ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}>
                  <img 
                    src={division.heroImage} 
                    alt={division.name} 
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-surface/40 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase text-primary shadow-sm">
                    {division.type.toUpperCase()}
                  </div>
                </div>

                {/* Text Content Column (Alternates right/left on desktop) */}
                <div className={`col-span-1 lg:col-span-6 space-y-6 ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-primary block">
                      Division Showcase
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-text-dark leading-tight">
                      {division.name}
                    </h3>
                  </div>

                  <p className="text-sm text-text-light leading-relaxed font-sans">
                    {division.aboutText || division.overview}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
                    {division.servicesAvailable.slice(0, 4).map((serv, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-text-dark font-medium">
                        <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>{serv}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Metadata & CTAs */}
                  <div className="pt-4 border-t border-surface/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-text-light">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{division.address.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-text-light">
                        <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                        <span>{division.workingHours}</span>
                      </div>
                    </div>

                    <Link 
                      href={`/divisions/${division.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/95 text-white px-6 py-3 text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary self-start sm:self-auto"
                      aria-label={`Explore branch page for ${division.name}`}
                    >
                      Visit Division
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                </div>

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
