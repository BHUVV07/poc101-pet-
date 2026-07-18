'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Calendar, Users, ClipboardList, ShieldAlert } from 'lucide-react';

function Counter({ value, suffix = '', duration = 1.5 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMs = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMs / end), 15);

    const timer = setInterval(() => {
      start += Math.ceil(end / 80); // Step increment to keep it smooth
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Statistics() {
  const prefersReducedMotion = useReducedMotion();

  const stats = [
    { 
      number: 15, 
      suffix: '+',
      label: 'Years Serving Shivamogga', 
      description: 'Providing trusted pharmaceutical and clinical support since 2011.', 
      icon: Calendar,
      color: 'text-primary'
    },
    { 
      number: 12000, 
      suffix: '+',
      label: 'Registered B2B Clinics', 
      description: 'Veterinary clinics and hubs served by our apothecary wholesale.', 
      icon: Users,
      color: 'text-accent'
    },
    { 
      number: 45000, 
      suffix: '+',
      label: 'Annual Case Files', 
      description: 'Successful treatments, surgeries, and audits managed by our team.', 
      icon: ClipboardList,
      color: 'text-secondary'
    },
    { 
      number: 100, 
      suffix: '%',
      label: 'Cold-Chain Biologicals', 
      description: 'Perfect biological safety storage with strict temperature logs.', 
      icon: ShieldAlert,
      color: 'text-primary'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
      };

  return (
    <section className="w-full py-16 bg-surface/15 border-b border-surface/50" id="statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <motion.div 
                key={idx}
                variants={cardVariants}
                className="bg-white/70 backdrop-blur-md border border-surface/40 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className={`h-10 w-10 rounded-xl bg-brand-bg flex items-center justify-center border border-surface/30 shrink-0 ${stat.color}`}>
                    <StatIcon className="h-5 w-5" />
                  </div>
                  
                  <div>
                    <span className="block font-serif text-3xl sm:text-4xl font-bold text-text-dark tracking-tight">
                      <Counter value={stat.number} suffix={stat.suffix} />
                    </span>
                    <span className="block font-mono text-[10px] sm:text-xs uppercase tracking-wider font-bold text-text-dark mt-1">
                      {stat.label}
                    </span>
                  </div>
                </div>
                
                <p className="text-[11px] sm:text-xs text-text-light leading-relaxed font-sans border-t border-surface/30 pt-3">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
