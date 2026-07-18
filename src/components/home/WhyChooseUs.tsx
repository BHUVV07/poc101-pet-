'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Award, Truck, ShieldAlert, Cpu } from 'lucide-react';

export default function WhyChooseUs() {
  const prefersReducedMotion = useReducedMotion();

  const values = [
    {
      icon: ShieldCheck,
      title: 'Genuine Clinical Supplies',
      description: '100% genuine biologicals, drugs, and diagnostic equipment sourced from audited global laboratories.',
    },
    {
      icon: HeartHandshake,
      title: 'Integrated Hospital Care',
      description: 'Direct diagnostic and surgical coordination with Buddy & Kitty Specialty Hospital for intensive recoveries.',
    },
    {
      icon: Award,
      title: 'Registered DVM Pharmacists',
      description: 'Prescription reviews and custom compounding schedules checked by certified companion-care pharmacists.',
    },
    {
      icon: Truck,
      title: 'Audited Cold-Chain Logistics',
      description: 'Petstep Logistics maintains temperature storage logs (+2°C to +8°C) to protect vaccine biological potency.',
    },
    {
      icon: ShieldAlert,
      title: 'Licensed Safety Standards',
      description: 'We follow stringent drug warehousing and clinical waste regulations across all local sectors.',
    },
    {
      icon: Cpu,
      title: 'Synchronous Live Inventories',
      description: 'Live stock monitoring ensures immediate collections at retail counters and direct hospital stores.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
      };

  return (
    <section className="w-full py-16 md:py-24 bg-brand-bg border-b border-surface/50" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 text-xs uppercase tracking-widest font-bold font-mono">
            Ecosystem Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight leading-tight">
            Why Providers & Pet Parents Choose Us
          </h2>
          <p className="text-sm sm:text-base text-text-light leading-relaxed">
            Bridging the gap between convenient companion pharmacy supplies and rigorous clinical guidelines.
          </p>
        </div>

        {/* Values Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <motion.div 
                key={val.title}
                variants={cardVariants}
                className="flex items-start gap-5 p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="p-3.5 rounded-xl bg-primary/5 text-primary shrink-0 transition-colors group-hover:bg-primary/10">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-lg font-bold text-text-dark group-hover:text-primary transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs text-text-light leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
