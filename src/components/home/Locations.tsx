'use client';

import { MapPin, Phone, Clock, Compass } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Locations() {
  const prefersReducedMotion = useReducedMotion();

  const locations = [
    {
      name: 'Buddy & Kitty Specialty Pet Hospital',
      address: '100 Feet Road,\nNear Kariyanna Building,\nVinoba Nagar,\nShivamogga, Karnataka – 577204',
      phone: '+91 83108 81168',
      hours: 'Monday – Saturday:\n10:00 AM – 8:30 PM\n\nSunday:\n10:00 AM – 12:00 PM',
      mapUrl: 'https://maps.google.com/?q=Buddy+Kitty+Hospital+Shivamogga',
      type: 'Hospital Core',
      color: 'border-accent text-accent bg-accent/5'
    },
    {
      name: 'Manasa Vet Pharma (Garden Area)',
      address: 'DSL Complex,\nGarden Area 1st Cross Road,\nOpposite Modern Talkies,\nShivamogga, Karnataka – 577201',
      phone: '+91 91647 56699',
      hours: 'Monday – Saturday:\n9:30 AM – 8:45 PM\n\nSunday Closed',
      mapUrl: 'https://maps.google.com/?q=Garden+Area+Shivamogga',
      type: 'Prescription Pharmacy',
      color: 'border-primary text-primary bg-primary/5'
    },
    {
      name: 'Manasa Pets Mart (Police Chowki)',
      address: 'Shop No. 1, 2, 3 & 4,\nBehind Nandita Avenue,\nPolice Chowki,\nVinoba Nagara,\nShivamogga,\nKarnataka – 577204',
      phone: '+91 97423 52112',
      hours: 'Monday – Saturday:\n10:00 AM – 9:00 PM\n\nSunday:\n10:00 AM – 2:00 PM',
      mapUrl: 'https://maps.google.com/?q=Police+Chowki+Shivamogga',
      type: 'Companion Retail',
      color: 'border-secondary text-secondary bg-secondary/5'
    },
    {
      name: 'Manasa Vet Pharma (Wholesale Depot)',
      address: '1st Floor,\n\'Abhijnana\',\nDr. C L Ramanna Road,\nBeside Kote Police Quarters,\nKR Puram,\nShivamogga – 577202',
      phone: '+91 98869 54762',
      hours: 'Monday – Saturday:\n10:00 AM – 7:30 PM\n\nSunday Closed',
      mapUrl: 'https://maps.google.com/?q=Kote+Old+Barline+Road+Shivamogga',
      type: 'B2B Apothecary',
      color: 'border-accent text-accent bg-accent/5'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
      };

  return (
    <section className="w-full py-16 md:py-24 bg-brand-bg border-b border-surface/50" id="locations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 text-xs uppercase tracking-widest font-bold font-mono">
            Ecosystem Directory
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight leading-tight">
            Our Physical Outlets & Locations
          </h2>
          <p className="text-sm sm:text-base text-text-light leading-relaxed">
            Visit any of our physical centers in Shivamogga for immediate clinical treatments, prescriptions, or B2B supply collections.
          </p>
        </div>

        {/* Locations Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {locations.map((loc, idx) => (
            <motion.article 
              key={idx}
              variants={cardVariants}
              className="bg-white rounded-3xl p-6 border border-surface/40 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="space-y-4">
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${loc.color}`}>
                  {loc.type}
                </span>
                
                <h3 className="font-serif text-lg font-bold text-text-dark leading-tight">
                  {loc.name}
                </h3>

                <div className="space-y-2.5 pt-2 text-xs text-text-light font-sans leading-relaxed">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="whitespace-pre-line">{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    <a href={`tel:${loc.phone}`} className="hover:text-primary transition-colors font-semibold">{loc.phone}</a>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span className="whitespace-pre-line">{loc.hours}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-surface/30">
                <a 
                  href={`tel:${loc.phone}`}
                  className="w-full inline-flex items-center justify-center rounded-full bg-white hover:bg-surface/30 border border-surface text-text-dark py-2 text-xs font-semibold shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-secondary"
                >
                  Call
                </a>
                <a 
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-primary hover:bg-primary/95 text-white py-2 text-xs font-semibold shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <Compass className="h-3.5 w-3.5" />
                  Map
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
