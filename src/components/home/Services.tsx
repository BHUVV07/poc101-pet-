'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Heart, Activity, ShoppingBag, Truck } from 'lucide-react';

export default function Services() {
  const prefersReducedMotion = useReducedMotion();

  const serviceGroups = [
    {
      icon: Heart,
      title: 'Healthcare & Surgical Care',
      description: 'Advanced diagnostic labs, internal organ ultrasounds, sterile soft-tissue surgeries, and recovery checkups at Buddy & Kitty Specialty Hospital.',
      cta: 'Explore Clinic Services',
      link: '/services',
      color: 'text-accent border-accent/20 bg-accent/5',
    },
    {
      icon: Activity,
      title: 'Prescription Apothecary',
      description: 'Immediate collection of renal, cardiac, anti-parasitic, and antibiotic medications verified by licensed DVM pharmacists at retail desks.',
      cta: 'Request Pharmacy Stocks',
      link: '/products',
      color: 'text-primary border-primary/20 bg-primary/5',
    },
    {
      icon: ShoppingBag,
      title: 'Companion Nutrition & Supplies',
      description: 'Hypoallergenic formulas, metabolic control kibble, joint health supplements, recovery pastes, and travel gear at Police Chowki Mart.',
      cta: 'View Nutrition & Mart Catalog',
      link: '/products',
      color: 'text-secondary border-secondary/20 bg-secondary/5',
    },
    {
      icon: Truck,
      title: 'B2B Wholesale & Logistics',
      description: 'Bulk pharmaceuticals, vaccine biologicals with persistent temperature logs, and diagnostic strip supplies distributed directly to regional clinics.',
      cta: 'Apply for B2B Account',
      link: '/divisions/wholesale',
      color: 'text-accent border-accent/20 bg-accent/5',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
      };

  return (
    <section className="w-full py-16 md:py-24 bg-surface/20 border-b border-surface/50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 text-xs uppercase tracking-widest font-bold font-mono">
            Medical & Supply Divisions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight leading-tight">
            Our Specialty Services
          </h2>
          <p className="text-sm sm:text-base text-text-light leading-relaxed">
            We categorize our operations into four clear circles to ensure specialized oversight and rapid clinical delivery.
          </p>
        </div>

        {/* Services Group Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {serviceGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <motion.div 
                key={group.title}
                variants={cardVariants}
                className="bg-white rounded-3xl p-7 border border-surface/40 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="space-y-5">
                  <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center shrink-0 ${group.color}`}>
                    <GroupIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-text-dark leading-tight group-hover:text-primary transition-colors">
                    {group.title}
                  </h3>
                  <p className="text-xs text-text-light leading-relaxed font-sans">
                    {group.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-surface/30">
                  <Link 
                    href={group.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-all"
                    aria-label={`Learn more about ${group.title}`}
                  >
                    <span>{group.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
