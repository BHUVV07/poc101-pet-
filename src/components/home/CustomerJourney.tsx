'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { User, Hospital, FileText, Pill, ShoppingCart, Heart } from 'lucide-react';

export default function CustomerJourney() {
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    {
      step: '01',
      icon: User,
      title: 'Pet Parent',
      description: 'Observe companion wellness symptoms or require routine clinical deworming checks.',
      color: 'text-primary border-primary/20 bg-primary/5',
    },
    {
      step: '02',
      icon: Hospital,
      title: 'Hospital Triage',
      description: 'Visit Buddy & Kitty Specialty Hospital for diagnostics, lab chemistry, or soft-tissue surgery.',
      color: 'text-accent border-accent/20 bg-accent/5',
    },
    {
      step: '03',
      icon: FileText,
      title: 'Rx Prescription',
      description: 'Get verified drug scripts reviewed by our registered, licensed pharmacy specialists.',
      color: 'text-secondary border-secondary/20 bg-secondary/5',
    },
    {
      step: '04',
      icon: Pill,
      title: 'Medicines Dispensed',
      description: 'Pick up critical therapeutics immediately or access Petstep vaccine cold-chain logistics.',
      color: 'text-primary border-primary/20 bg-primary/5',
    },
    {
      step: '05',
      icon: ShoppingCart,
      title: 'Pet Shopping',
      description: 'Stock up on prescription kibble, joint mobility pastes, orthopedic beds, and recovery gear.',
      color: 'text-secondary border-secondary/20 bg-secondary/5',
    },
    {
      step: '06',
      icon: Heart,
      title: 'Healthy Pet',
      description: 'Achieve fully monitored therapeutic recovery, style-grooming checks, and active wellness.',
      color: 'text-accent border-accent/20 bg-accent/5',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.9, y: 15 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
      };

  return (
    <section className="w-full py-16 md:py-24 bg-brand-bg border-b border-surface/50 overflow-hidden" id="customer-journey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary px-4 py-1.5 text-xs uppercase tracking-widest font-bold font-mono">
            Ecosystem Loop
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight leading-tight">
            The Companion & Partner Journey
          </h2>
          <p className="text-sm sm:text-base text-text-light leading-relaxed">
            From initial consultation to audited pharmaceutical logistics and complete recovery stabilization.
          </p>
        </div>

        {/* Timeline Grid (6 Columns on large screens) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 relative"
        >
          {/* Continuous connector bar on desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-surface via-secondary/25 to-surface z-0 pointer-events-none" />

          {steps.map((item) => {
            const StepIcon = item.icon;
            return (
              <motion.div 
                key={item.step}
                variants={itemVariants}
                className="relative z-10 flex flex-col items-center text-center space-y-4 group"
              >
                
                {/* Badge circle with icon */}
                <div className="relative">
                  <div className={`h-16 w-16 rounded-full bg-white border border-surface/60 flex items-center justify-center shadow-sm group-hover:border-primary transition-all duration-300 ${item.color}`}>
                    <StepIcon className="h-6 w-6" />
                  </div>
                  <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-secondary text-text-dark text-[10px] font-mono font-bold flex items-center justify-center border border-white">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-2 max-w-[180px]">
                  <h3 className="font-serif text-base font-bold text-text-dark leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-text-light leading-relaxed">
                    {item.description}
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
