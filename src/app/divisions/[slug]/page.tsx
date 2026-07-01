'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Shield, CheckCircle, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { divisionsData, DivisionDetails } from '../../../data/divisions';

export default function DivisionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [division, setDivision] = useState<DivisionDetails | null>(null);

  useEffect(() => {
    const found = divisionsData.find(d => d.slug === slug);
    if (found) {
      setDivision(found);
    }
  }, [slug]);

  if (!division) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 space-y-4 bg-brand-bg text-text-dark">
        <h2 className="font-serif text-3xl font-bold">Division Not Found</h2>
        <p className="text-sm text-text-light">The division you are looking for does not exist in our network.</p>
        <Link
          href="/"
          className="rounded-full bg-primary text-brand-bg px-8 py-3 text-xs font-bold transition-transform hover:scale-103"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-16 pb-16 bg-brand-bg text-text-dark">
      {/* Hero Banner Section */}
      <section className="relative h-[55vh] min-h-[400px] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-45 scale-103"
          style={{ backgroundImage: `url(${division.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center space-y-4 text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary px-4 py-1 text-xs uppercase tracking-widest font-bold font-mono">
            {division.type.toUpperCase()} DIVISION
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            {division.name}
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {division.overview}
          </p>
        </div>
      </section>

      {/* Main content grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: About & Services/Products Lists */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* About Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="font-serif text-3xl font-bold text-text-dark border-b border-surface pb-3">
                About the Division
              </h2>
              <p className="text-sm text-text-light leading-relaxed">
                {division.aboutText}
              </p>
            </motion.div>

            {/* Division Highlights */}
            {division.highlights && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {division.highlights.map((h, i) => (
                  <div key={i} className="p-5 rounded-lg bg-surface/20 border border-surface/20 space-y-2">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-primary flex items-center gap-1.5">
                      <Shield className="h-4 w-4 text-primary" />
                      {h.title}
                    </h4>
                    <p className="text-xs text-text-light leading-normal">{h.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Services & Products lists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-surface pt-8">
              {/* Services available */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-text-dark flex items-center gap-2">
                  Services Offered
                </h3>
                <ul className="space-y-2.5">
                  {division.servicesAvailable.map((srv, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-text-light leading-normal">
                      <CheckCircle className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Products categories */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-text-dark flex items-center gap-2">
                  Materials & Categories
                </h3>
                <ul className="space-y-2.5">
                  {division.productsAvailable.map((prod, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-text-light leading-normal">
                      <CheckCircle className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                      <span>{prod}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Right Column: Contact details Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-lg bg-surface/30 border border-surface/20 shadow-sm space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-text-dark">
                Contact & Address
              </h3>
              <p className="text-xs text-text-light leading-relaxed">
                Connect with our local branch directors or coordinates directly for stock verifications and schedules.
              </p>
              
              <div className="space-y-4 pt-4 text-xs divide-y divide-surface/60">
                <div className="flex gap-3 pt-2.5">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <span className="font-bold text-text-dark block">Location Address</span>
                    <span className="text-text-light mt-1 block leading-normal">{division.address}</span>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <span className="font-bold text-text-dark block">Contact Line</span>
                    <span className="text-text-light mt-1 block font-mono">{division.phone}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Clock className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <span className="font-bold text-text-dark block">Working Hours</span>
                    <span className="text-text-light mt-1 block font-mono">{division.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            <a 
              href={division.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full text-center inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/95 text-brand-bg py-3 text-xs font-semibold shadow transition-all duration-300 cursor-pointer"
            >
              <ExternalLink className="h-4 w-4" />
              Directions on Google Maps
            </a>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 border-t border-surface pt-12">
        <h3 className="font-serif text-2xl font-bold text-text-dark flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          Division Gallery
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {division.galleryImages.map((img, i) => (
            <div key={i} className="aspect-video w-full rounded-lg overflow-hidden border border-surface/20 bg-surface/10 relative group">
              <img 
                src={img} 
                alt={`${division.name} showcase`} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
