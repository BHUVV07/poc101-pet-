'use client';

import { Calendar, PhoneCall, ArrowRight } from 'lucide-react';

export default function CTA() {

  return (
    <section className="bg-brand-bg py-16 md:py-24" id="cta">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Soft background glow circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[40px]">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-2xl" />
        </div>

        {/* Premium Banner Container */}
        <div className="relative z-10 bg-gradient-to-br from-[#2F241E] to-[#1E1612] text-white p-8 sm:p-12 md:p-16 rounded-[40px] shadow-2xl border border-white/5 text-center space-y-8 select-none">
          
          <div className="space-y-4">
            <span className="inline-flex px-3 py-1 rounded-full bg-secondary/15 border border-secondary/25 text-[10px] font-mono font-bold uppercase tracking-widest text-secondary shadow-inner">
              Integrated Care Loop
            </span>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight max-w-2xl mx-auto text-balance">
              Join the Manasa Vet Healthcare Circle
            </h2>
            
            <p className="text-xs sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed font-sans text-pretty">
              Consult with board-certified clinical staff, submit your veterinary prescriptions, or secure custom B2B apothecary supply terms for your regional clinic.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <a
              href="/services"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-secondary hover:bg-secondary/95 text-text-dark px-8 py-4 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <Calendar className="h-4.5 w-4.5" />
              Book Appointment
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white px-8 py-4 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white"
            >
              <PhoneCall className="h-4.5 w-4.5 text-white/70" />
              Call Support Desk
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
