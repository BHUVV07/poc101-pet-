'use client';

import { MapPin, Phone, Clock, Compass, ShoppingBag, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export interface VisitStoreData {
  title: string;
  subtitle: string;
  storeName: string;
  addressLines: string[];
  phone: string;
  workingHours: string;
  services: string[];
  googleMapsEmbedUrl: string;
  directionsUrl: string;
  description?: string;
  rating?: string;
  reviewCount?: string;
  buttonText?: string;
}

interface VisitStoreProps {
  data: VisitStoreData;
}

export default function VisitStore({ data }: VisitStoreProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionAnimation = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 0, y: 30 };

  return (
    <motion.section
      initial={sectionAnimation}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="w-full py-16 md:py-24 border-t border-surface space-y-12 select-none"
    >
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent px-4 py-1 text-xs uppercase tracking-widest font-bold font-mono">
          <MapPin className="h-3.5 w-3.5" />
          Visit Us
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight leading-tight">
          {data.title}
        </h2>
        <p className="text-sm sm:text-base text-text-light max-w-2xl mx-auto leading-relaxed">
          {data.subtitle}
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Google Map Iframe */}
          <div className="w-full min-h-[450px] sm:min-h-[500px] rounded-2xl overflow-hidden shadow-sm border border-surface/30 bg-surface/10 relative">
            <iframe
              src={data.googleMapsEmbedUrl}
              title={`${data.storeName} Google Maps Location`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full rounded-2xl"
            />
          </div>

          {/* Right Column: Store Contact details Card */}
          <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-surface/20 border border-surface/30 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-md space-y-8">
            
            {/* Header info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-text-dark">
                  {data.storeName}
                </h3>
                {data.rating && data.reviewCount && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 text-accent font-bold">
                      ⭐ {data.rating} Rating
                    </span>
                    <span className="text-text-light/50">•</span>
                    <span className="text-text-light font-medium">
                      {data.reviewCount} Google Reviews
                    </span>
                  </div>
                )}
              </div>
              <p className="text-xs text-text-light leading-relaxed">
                {data.description || "Step inside our physical store location for high-quality pet supplies, organic companion diets, and immediate consultations with our retail store directors."}
              </p>
            </div>

            {/* Structured details tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address Tile */}
              <div className="p-4 rounded-xl bg-surface/30 border border-surface/30 space-y-2.5 sm:col-span-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-primary flex items-center gap-1.5 font-mono">
                  <MapPin className="h-4 w-4" />
                  Store Address
                </span>
                <div className="text-xs text-text-dark leading-relaxed font-sans">
                  {data.addressLines.map((line, idx) => (
                    <span key={idx} className="block">{line}</span>
                  ))}
                </div>
              </div>

              {/* Phone Line Tile */}
              <div className="p-4 rounded-xl bg-surface/30 border border-surface/30 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-primary flex items-center gap-1.5 font-mono">
                  <Phone className="h-4 w-4" />
                  Contact Number
                </span>
                <a 
                  href={`tel:${data.phone.replace(/\s+/g, '')}`} 
                  className="text-xs text-text-dark font-mono block hover:text-primary transition-colors hover:underline"
                >
                  {data.phone}
                </a>
              </div>

              {/* Working Hours Tile */}
              <div className="p-4 rounded-xl bg-surface/30 border border-surface/30 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-primary flex items-center gap-1.5 font-mono">
                  <Clock className="h-4 w-4" />
                  Working Hours
                </span>
                <span className="text-xs text-text-dark font-sans block leading-normal whitespace-pre-line">
                  {data.workingHours}
                </span>
              </div>
            </div>

            {/* Available Services */}
            <div className="space-y-3.5 p-4 rounded-xl bg-surface/30 border border-surface/30">
              <span className="text-[10px] uppercase font-bold tracking-wider text-accent flex items-center gap-1.5 font-mono">
                <ShoppingBag className="h-4 w-4" />
                Available Services
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {data.services.map((service, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-text-dark leading-none">
                    <span className="h-4.5 w-4.5 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-accent" />
                    </span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Maps Directions Action button */}
            <a
              href={data.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center inline-flex items-center justify-center gap-2.5 rounded-full bg-primary hover:bg-primary/95 text-brand-bg py-3.5 text-xs font-bold shadow-sm transition-all duration-300 cursor-pointer"
            >
              <Compass className="h-4 w-4" />
              {data.buttonText || "Get Directions"}
            </a>

          </div>

        </div>
      </div>
    </motion.section>
  );
}
