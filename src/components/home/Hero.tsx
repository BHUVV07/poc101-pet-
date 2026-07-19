'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Calendar, Phone, Activity, Heart, Shield, ShoppingBag } from 'lucide-react';

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Entrance variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 15 } },
      };

  const imageVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } },
      };

  // Continuous floating animations for cards
  const floatAnimation = (delay: number) => {
    if (prefersReducedMotion) return {};
    return {
      y: [0, -12, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut' as const,
        delay: delay,
      },
    };
  };

  // Branch Cards Data
  const floatingCards = [
    {
      icon: Heart,
      title: 'Buddy & Kitty',
      subtitle: 'Specialty Vet Hospital',
      position: 'top-10 -left-6 md:-left-12',
      color: 'text-accent',
      delay: 0,
    },
    {
      icon: Activity,
      title: 'Manasa Vet Pharma',
      subtitle: 'Prescription Dispensary',
      position: 'top-1/3 -right-6 md:-right-12',
      color: 'text-primary',
      delay: 1.2,
    },
    {
      icon: ShoppingBag,
      title: 'Manasa Pets Mart',
      subtitle: 'Companion Retail',
      position: 'bottom-20 -left-4 md:-left-10',
      color: 'text-secondary',
      delay: 0.6,
    },
    {
      icon: Shield,
      title: 'Manasa Vet Pharma-Wholesale',
      subtitle: 'B2B Medical Supply',
      position: 'bottom-8 -right-6 md:-right-10',
      color: 'text-accent',
      delay: 1.8,
    },
  ];

  return (
    <section className="relative min-h-[100vh] lg:h-screen w-full bg-brand-bg overflow-hidden flex items-center border-b border-surface/50">
      
      {/* Background soft glowing blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-surface/30 blur-[100px]"
        />
        <motion.div 
          animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 -right-40 w-96 sm:w-[600px] h-96 sm:h-[600px] rounded-full bg-secondary/15 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#C9A27E_0.8px,transparent_0.8px)] [background-size:28px_28px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">
          
          {/* Left Column: Heading and copy */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8 flex flex-col justify-center text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-bold font-mono">
                Integrated Healthcare Loop
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-text-dark tracking-tight leading-[1.08] text-balance"
            >
              Unified Care for <br />
              <span className="text-primary italic">Every Companion</span> Life Stage
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-sm sm:text-base lg:text-lg text-text-light max-w-2xl mx-auto lg:mx-0 leading-relaxed text-pretty font-sans"
            >
              The Manasa Pet Ecosystem bridges Shivamogga&apos;s leading veterinary surgery, certified cold-chain vaccine logistics, and premium companion apothecary services into one connected circle of trust.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 w-full sm:w-auto"
            >
              <a
                href="tel:8310881168"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-primary hover:bg-primary/95 text-white px-8 py-4 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Book a clinical consultation appointment"
              >
                <Calendar className="h-4.5 w-4.5" />
                Book Consultation
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="tel:9886954762"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-white hover:bg-surface/30 border border-surface/85 text-text-dark px-8 py-4 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-secondary"
                aria-label="Call Manasa Vet Pharma Wholesale Support at 9886954762"
              >
                <Phone className="h-4.5 w-4.5 text-text-light" />
                Manasa Vet Pharma Wholesale Support
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Composition with floating cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
            
            {/* Main Pet Image Frame */}
            <motion.div 
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="relative w-72 sm:w-96 aspect-[4/5] rounded-[40px] overflow-hidden border-[6px] border-white shadow-2xl bg-surface/35 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1200" 
                alt="Premium Companion Dog representing the Manasa Ecosystem" 
                className="h-full w-full object-cover transition-transform duration-[8000ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </motion.div>

            {/* Floating Glassmorphic Branch Cards */}
            {floatingCards.map((card, index) => {
              const CardIcon = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.15, duration: 0.8, ease: 'easeOut' }}
                  className={`absolute ${card.position} z-20 pointer-events-auto`}
                >
                  <motion.div
                    animate={floatAnimation(card.delay)}
                    className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 shadow-xl select-none hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-default"
                  >
                    <div className={`p-2 rounded-xl bg-brand-bg flex items-center justify-center shrink-0 shadow-inner ${card.color}`}>
                      <CardIcon className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-xs sm:text-sm font-bold text-text-dark leading-tight">
                        {card.title}
                      </h3>
                      <p className="text-[10px] text-text-light font-mono font-medium leading-none">
                        {card.subtitle}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
