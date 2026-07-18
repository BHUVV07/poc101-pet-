'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart, Activity, ShoppingBag, Shield } from 'lucide-react';

export default function Ecosystem() {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);

  const branches = [
    {
      id: 'buddy-kitty',
      icon: Heart,
      title: 'Buddy & Kitty Vet Hospital',
      description: 'Shivamogga&apos;s leading clinical core. Soft-tissue surgery, diagnostic radiology, and recovery triage.',
      link: '/divisions/buddy-kitty',
      color: 'border-accent text-accent shadow-accent/15',
      glow: 'shadow-accent/20 bg-accent/5',
      coords: { x: 140, y: 120 }, // Matching SVG connection end
      posClass: 'left-[5%] top-[5%] md:left-[10%] md:top-[10%] lg:left-[12%] lg:top-[12%]',
    },
    {
      id: 'garden-area',
      icon: Activity,
      title: 'Manasa Vet Pharma',
      description: 'Our prescription apothecary branch in Garden Area. Handing custom dosage verification and anti-parasitics.',
      link: '/divisions/garden-area',
      color: 'border-primary text-primary shadow-primary/15',
      glow: 'shadow-primary/20 bg-primary/5',
      coords: { x: 660, y: 120 },
      posClass: 'right-[5%] top-[5%] md:right-[10%] md:top-[10%] lg:right-[12%] lg:top-[12%]',
    },
    {
      id: 'police-chowki',
      icon: ShoppingBag,
      title: 'Manasa Pets Mart',
      description: 'A dedicated companion companion-care mart in Police Chowki. Stocking therapeutics, kibble, and accessories.',
      link: '/divisions/police-chowki',
      color: 'border-secondary text-secondary shadow-secondary/15',
      glow: 'shadow-secondary/20 bg-secondary/5',
      coords: { x: 140, y: 480 },
      posClass: 'left-[5%] bottom-[5%] md:left-[10%] md:bottom-[10%] lg:left-[12%] lg:bottom-[12%]',
    },
    {
      id: 'wholesale',
      icon: Shield,
      title: 'Manasa Vet Pharma-Wholesale',
      description: 'Our Old Barline B2B hub supplying vaccines, diagnostic kits, and medical storage protocols to regional clinics.',
      link: '/divisions/wholesale',
      color: 'border-accent text-accent shadow-accent/15',
      glow: 'shadow-accent/20 bg-accent/5',
      coords: { x: 660, y: 480 },
      posClass: 'right-[5%] bottom-[5%] md:right-[10%] md:bottom-[10%] lg:right-[12%] lg:bottom-[12%]',
    },
  ];

  // SVG Curved path generator
  const getSvgPath = (coords: { x: number; y: number }) => {
    // Start at center (400, 300)
    // Control points curve out left/right then vertical
    const cx1 = coords.x < 400 ? 300 : 500;
    const cy1 = 300;
    const cx2 = coords.x < 400 ? 250 : 550;
    const cy2 = coords.y;
    return `M 400 300 C ${cx1} ${cy1}, ${cx2} ${cy2}, ${coords.x} ${coords.y}`;
  };

  return (
    <section className="w-full py-16 md:py-24 bg-brand-bg border-b border-surface/50 select-none relative overflow-hidden" id="ecosystem">
      
      {/* Visual background details */}
      <div className="absolute inset-0 bg-[radial-gradient(#EFE7DC_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent px-4 py-1 text-xs uppercase tracking-widest font-bold font-mono">
            Unified Care Loop
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight leading-tight">
            The Interactive Ecosystem Diagram
          </h2>
          <p className="text-sm sm:text-base text-text-light leading-relaxed">
            Hover over any branch to trace the clinical supply, medical verification, and logistics flow that links our veterinary network.
          </p>
        </div>

        {/* 1. Desktop & Tablet Radial View (md and up) */}
        <div className="hidden md:block relative w-full aspect-[4/3] max-w-4xl mx-auto border border-surface/40 rounded-3xl bg-white/40 backdrop-blur-sm overflow-hidden shadow-sm">
          
          {/* SVG Animated Connection Lines */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            viewBox="0 0 800 600"
            fill="none"
          >
            {branches.map((br) => {
              const isHovered = hoveredBranch === br.id;
              const path = getSvgPath(br.coords);
              return (
                <g key={br.id}>
                  {/* Background track line */}
                  <path
                    d={path}
                    stroke="#EFE7DC"
                    strokeWidth={isHovered ? 3 : 2}
                    className="transition-all duration-300"
                  />
                  {/* Glowing active flow overlay */}
                  <motion.path
                    d={path}
                    stroke={isHovered ? '#6B4F3B' : '#C9A27E'}
                    strokeWidth={isHovered ? 4 : 2}
                    strokeDasharray="8 12"
                    animate={prefersReducedMotion ? {} : { strokeDashoffset: [0, -100] }}
                    transition={{ repeat: Infinity, ease: 'linear', duration: isHovered ? 3 : 6 }}
                    opacity={isHovered ? 1 : 0.4}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Center Hub Circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center text-center">
            <motion.div
              animate={prefersReducedMotion ? {} : { scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="h-40 w-40 sm:h-44 sm:w-44 rounded-full bg-white border border-surface shadow-2xl flex flex-col items-center justify-center p-4 relative"
            >
              {/* Outer pulsing ring */}
              <div className="absolute inset-[-6px] rounded-full border border-primary/20 animate-ping" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-[-12px] rounded-full border border-secondary/10 animate-ping" style={{ animationDuration: '6s' }} />

              <span className="text-[10px] font-mono font-bold tracking-wider text-text-light uppercase">
                MANASA
              </span>
              <h3 className="font-serif text-sm sm:text-base font-bold text-primary tracking-wide leading-tight mt-1">
                PET ECOSYSTEM
              </h3>
              <p className="text-[9px] text-text-light mt-1.5 leading-tight font-medium max-w-[120px]">
                Everything your pet needs under one trusted brand
              </p>
            </motion.div>
          </div>

          {/* Surrounding Cards */}
          {branches.map((br) => {
            const CardIcon = br.icon;
            const isHovered = hoveredBranch === br.id;
            
            return (
              <div
                key={br.id}
                onMouseEnter={() => setHoveredBranch(br.id)}
                onMouseLeave={() => setHoveredBranch(null)}
                className={`absolute ${br.posClass} z-20 w-72 transition-all duration-300`}
              >
                <Link
                  href={br.link}
                  className={`block bg-white p-5 rounded-2xl border border-surface/50 shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
                    isHovered ? 'scale-[1.03] shadow-lg border-primary' : 'hover:scale-[1.01]'
                  }`}
                  aria-label={`Navigate to ${br.title}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${br.color} ${isHovered ? br.glow : ''}`}>
                      <CardIcon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-text-dark leading-tight">
                      {br.title}
                    </h3>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* 2. Mobile Stack View (sm and down) */}
        <div className="block md:hidden space-y-6">
          {/* Mobile Central Indicator */}
          <div className="bg-white border border-surface p-6 rounded-2xl text-center space-y-2 shadow-sm">
            <span className="text-[10px] font-mono font-bold tracking-wider text-text-light uppercase">
              MANASA PET ECOSYSTEM
            </span>
            <h3 className="font-serif text-lg font-bold text-primary">
              One Unified Circle of Care
            </h3>
            <p className="text-xs text-text-light max-w-sm mx-auto leading-relaxed">
              Every division operates as a synchronized link to deliver diagnostics, apothecaries, and logistics.
            </p>
          </div>

          {/* Cards Vertical Stack */}
          <div className="space-y-4 relative">
            {/* Visual Vertical Connection bar */}
            <div className="absolute left-[34px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-surface via-secondary/20 to-surface z-0 pointer-events-none" />

            {branches.map((br) => {
              const CardIcon = br.icon;
              return (
                <div key={br.id} className="relative z-10">
                  <Link
                    href={br.link}
                    className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-surface/50 shadow-sm active:scale-[0.99] transition-transform"
                    aria-label={`Navigate to ${br.title}`}
                  >
                    <div className={`h-12 w-12 rounded-xl border flex items-center justify-center shrink-0 ${br.color} bg-brand-bg`}>
                      <CardIcon className="h-5 w-5" />
                    </div>
                    <h4 className="font-serif text-base font-bold text-text-dark">
                      {br.title}
                    </h4>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
