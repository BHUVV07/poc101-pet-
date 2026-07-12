'use client';

import { Phone, Clock, Star, Globe, MapPin, Compass, MessageCircle, PhoneCall, ExternalLink } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { ContactInfo } from '../data/buddyKittyContact';

interface ContactLocationProps {
  data: ContactInfo;
}

export default function ContactLocation({ data }: ContactLocationProps) {
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
          Location
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
          
          {/* Left Column: Lazy Loaded Google Map Iframe */}
          <div className="w-full min-h-[450px] sm:min-h-[500px] rounded-2xl overflow-hidden shadow-sm border border-surface/30 bg-surface/10 relative">
            <iframe
              src={data.googleMapsEmbedUrl}
              title={`${data.title} Google Maps location`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full rounded-2xl"
            />
          </div>

          {/* Right Column: Premium Contact Information Card */}
          <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-surface/20 border border-surface/30 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-md space-y-8">
            
            {/* Elegant Info Tiles */}
            <div className="space-y-4">
              
              {/* Address Tile */}
              <div className="p-4 rounded-xl bg-brand-bg/60 border border-surface/40 hover:bg-surface/30 transition-all duration-300 flex items-start gap-4 shadow-sm hover:scale-[1.01]">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary mt-0.5 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-primary block">
                    Address
                  </span>
                  <div className="text-xs text-text-light font-sans leading-relaxed">
                    {data.addressLines.map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phone Tile */}
              <div className="p-4 rounded-xl bg-brand-bg/60 border border-surface/40 hover:bg-surface/30 transition-all duration-300 flex items-start gap-4 shadow-sm hover:scale-[1.01]">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary mt-0.5 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-primary block">
                    Phone
                  </span>
                  <a
                    href={data.actionLinks.call}
                    className="text-sm font-bold text-text-dark hover:text-primary transition-colors font-mono tracking-wide block focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                    aria-label={`Call us at ${data.phone}`}
                  >
                    {data.phone}
                  </a>
                </div>
              </div>

              {/* Working Hours Tile */}
              <div className="p-4 rounded-xl bg-brand-bg/60 border border-surface/40 hover:bg-surface/30 transition-all duration-300 flex items-start gap-4 shadow-sm hover:scale-[1.01]">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary mt-0.5 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-primary block">
                    Working Hours
                  </span>
                  <p className="text-xs text-text-light font-sans font-medium tracking-wide">
                    {data.workingHours}
                  </p>
                </div>
              </div>

              {/* Grid of Google Rating & Website Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Google Rating Tile */}
                <div className="p-4 rounded-xl bg-brand-bg/60 border border-surface/40 hover:bg-surface/30 transition-all duration-300 flex items-start gap-4 shadow-sm hover:scale-[1.01]">
                  <div className="p-2.5 rounded-lg bg-accent/15 text-accent mt-0.5 shrink-0">
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-primary block">
                      Google Rating
                    </span>
                    <span className="text-sm font-extrabold text-text-dark flex items-center gap-1 font-sans">
                      {data.rating} <span className="text-xs text-zinc-400 font-medium">★</span>
                    </span>
                    <span className="text-[10px] font-medium text-text-light block">
                      {data.reviewCount}+ Google Reviews
                    </span>
                  </div>
                </div>

                {/* Website Tile */}
                <div className="p-4 rounded-xl bg-brand-bg/60 border border-surface/40 hover:bg-surface/30 transition-all duration-300 flex items-start gap-4 shadow-sm hover:scale-[1.01]">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary mt-0.5 shrink-0">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-primary block">
                      Website
                    </span>
                    <a
                      href={data.actionLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                    >
                      {data.website}
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 pt-2">
              {/* Call Now Button */}
              <a
                href={data.actionLinks.call}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/95 text-brand-bg py-3 px-4 text-xs font-semibold shadow transition-all duration-300 hover:scale-102 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                aria-label="Call Hospital Dialer Now"
              >
                <PhoneCall className="h-4 w-4 shrink-0" />
                Call Now
              </a>

              {/* WhatsApp Button */}
              <a
                href={data.actionLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 text-xs font-semibold shadow transition-all duration-300 hover:scale-102 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] focus-visible:outline-none cursor-pointer"
                aria-label="Message us on WhatsApp"
              >
                <MessageCircle className="h-4 w-4 shrink-0 fill-current" />
                WhatsApp
              </a>

              {/* Directions Button */}
              <a
                href={data.actionLinks.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-bg border border-surface text-text-dark hover:bg-surface/40 py-3 px-4 text-xs font-semibold shadow transition-all duration-300 hover:scale-102 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                aria-label="Get directions to Buddy & Kitty Pet Hospital on Google Maps"
              >
                <Compass className="h-4 w-4 shrink-0 text-primary" />
                Get Directions
              </a>

              {/* Visit Website Button */}
              <a
                href={data.actionLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-bg border border-surface text-text-dark hover:bg-surface/40 py-3 px-4 text-xs font-semibold shadow transition-all duration-300 hover:scale-102 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                aria-label="Visit Buddy & Kitty Website"
              >
                <Globe className="h-4 w-4 shrink-0 text-primary" />
                Visit Website
              </a>
            </div>

          </div>

        </div>
      </div>
    </motion.section>
  );
}
