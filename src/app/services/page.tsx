'use client';

import { motion } from 'framer-motion';
import { Stethoscope, ShieldCheck, Activity, Heart, User, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { servicesData, ServiceItem } from '../../data/services';

const iconMap: Record<string, React.ComponentType<any>> = {
  Stethoscope,
  ShieldCheck,
  Activity,
  Heart,
  User,
  Clock,
  Calendar
};

export default function ServicesPage() {
  return (
    <div className="w-full space-y-16 pb-16 bg-brand-bg text-text-dark">
      {/* Hero Header */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-103"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center space-y-4 text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary px-4 py-1 text-xs uppercase tracking-widest font-bold font-mono">
            MEDICAL CAPABILITIES
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
            Our Services & Care Spectrum
          </h1>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Professional companion care diagnostics, surgical clean rooms, certified apothecary distribution, and vaccination logistics.
          </p>
        </div>
      </section>

      {/* Grid List */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.iconName] || Stethoscope;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="p-8 rounded-lg bg-surface/20 border border-surface/20 hover:border-primary/40 transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-text-dark">
                    {service.name}
                  </h3>
                  <p className="text-xs text-text-light font-medium">
                    {service.description}
                  </p>
                  <p className="text-xs text-text-light/95 leading-relaxed pt-2">
                    {service.detailedInfo}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-1.5 text-[10px] uppercase font-mono font-bold text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  Standard Clinical Protocol
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
