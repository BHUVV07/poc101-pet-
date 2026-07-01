'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, HeartHandshake, Award, Hospital, Store, Truck, Building2 } from 'lucide-react';
import { MOCK_BANNERS } from '../services/mockData';
import { companyDetails } from '../data/company';

export default function Home() {
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);

  // Auto rotate banners every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBannerIdx(prev => (prev + 1) % MOCK_BANNERS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-brand-bg pb-12 text-text-dark">
      {/* 1. HERO BANNER SLIDER */}
      <section className="relative h-[80vh] min-h-[500px] w-full overflow-hidden bg-surface">
        <AnimatePresence mode="wait">
          {MOCK_BANNERS.length > 0 && (
            <motion.div
              key={activeBannerIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background Image with elegant overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out scale-105"
                style={{ backgroundImage: `url(${MOCK_BANNERS[activeBannerIdx].imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/40 to-transparent" />

              {/* Banner Text Content */}
              <div className="relative mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl text-white space-y-6">
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block text-xs uppercase tracking-widest font-semibold text-secondary font-mono"
                  >
                    Specialty Vet Healthcare
                  </motion.span>
                  <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
                  >
                    {MOCK_BANNERS[activeBannerIdx].title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-base sm:text-lg text-white/90 leading-relaxed max-w-lg"
                  >
                    {MOCK_BANNERS[activeBannerIdx].subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pt-4"
                  >
                    <Link
                      href={MOCK_BANNERS[activeBannerIdx].linkUrl || '/services'}
                      className="inline-flex items-center gap-2 rounded-full bg-secondary hover:bg-secondary/90 px-8 py-3.5 text-sm font-semibold text-text-dark shadow-lg transition-all hover:translate-x-1 duration-300"
                    >
                      Explore Our Network
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Banner navigation indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2.5 z-20">
          {MOCK_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBannerIdx(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeBannerIdx === idx ? 'w-8 bg-secondary' : 'w-2 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. VALUE PROPOSITION GRIDS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-6 rounded-lg bg-surface/30 border border-surface/20">
            <Award className="h-10 w-10 text-primary shrink-0" />
            <div>
              <h3 className="font-serif text-lg font-bold text-text-dark">Certified Vet Medicine</h3>
              <p className="text-sm text-text-light mt-1.5 leading-relaxed">
                100% genuine pharmaceutical supply chain. Fully audited medical stocks keeping storage protocols strictly clinical.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-6 rounded-lg bg-surface/30 border border-surface/20">
            <HeartHandshake className="h-10 w-10 text-primary shrink-0" />
            <div>
              <h3 className="font-serif text-lg font-bold text-text-dark">Elite Clinical Care</h3>
              <p className="text-sm text-text-light mt-1.5 leading-relaxed">
                Direct integration with Buddy & Kitty Specialty Hospital for surgical consultations and specialized diagnostics.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-lg bg-surface/30 border border-surface/20">
            <ShieldCheck className="h-10 w-10 text-primary shrink-0" />
            <div>
              <h3 className="font-serif text-lg font-bold text-text-dark font-sans">B2B Wholesaler Support</h3>
              <p className="text-sm text-text-light mt-1.5 leading-relaxed">
                Licensed pharmaceutical supplies, custom terms, and cold-chain vaccine shipping for clinics across the region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE ECOSYSTEM */}
      <section className="bg-surface/25 border-y border-surface/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-primary font-mono">Established Locally. Supply Chain Driven.</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark mt-2">The Manasa Vet Ecosystem</h2>
            <p className="text-sm text-text-light mt-4 leading-relaxed">
              {companyDetails.aboutOverview}
            </p>
          </div>

          {/* Stats indicators grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Link href="/divisions/garden-area" className="bg-brand-bg hover:border-primary/50 transition-all border border-surface/30 p-6 rounded-lg text-center space-y-2 cursor-pointer">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-primary">2</h3>
              <p className="text-xs uppercase tracking-wider font-semibold text-text-dark font-mono">Retail Pharmacies</p>
              <p className="text-[10px] text-text-light leading-relaxed">Garden Area & Police Chowki</p>
            </Link>
            <Link href="/divisions/buddy-kitty" className="bg-brand-bg hover:border-primary/50 transition-all border border-surface/30 p-6 rounded-lg text-center space-y-2 cursor-pointer">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-accent">1</h3>
              <p className="text-xs uppercase tracking-wider font-semibold text-text-dark font-mono">Speciality Pet Hospital</p>
              <p className="text-[10px] text-text-light leading-relaxed">Buddy & Kitty, 100 Ft Road</p>
            </Link>
            <Link href="/divisions/wholesale" className="bg-brand-bg hover:border-primary/50 transition-all border border-surface/30 p-6 rounded-lg text-center space-y-2 cursor-pointer">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-secondary">1</h3>
              <p className="text-xs uppercase tracking-wider font-semibold text-text-dark font-mono">Wholesale Division</p>
              <p className="text-[10px] text-text-light leading-relaxed">Apothecary Supplies, Kote</p>
            </Link>
            <Link href="/divisions/petstep" className="bg-brand-bg hover:border-primary/50 transition-all border border-surface/30 p-6 rounded-lg text-center space-y-2 cursor-pointer">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-primary">1</h3>
              <p className="text-xs uppercase tracking-wider font-semibold text-text-dark font-mono">Logistics Network</p>
              <p className="text-[10px] text-text-light leading-relaxed">Petstep Integrated, GSKM Road</p>
            </Link>
          </div>

          {/* Detail cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Outlets */}
            <Link href="/divisions/garden-area" className="flex gap-4 p-6 bg-brand-bg hover:border-primary/40 transition-all rounded-lg border border-surface/20 shadow-sm cursor-pointer">
              <div className="h-12 w-12 rounded-lg bg-surface flex items-center justify-center text-primary shrink-0">
                <Store className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-lg font-bold text-text-dark">Retail Pharmacies</h4>
                <p className="text-xs text-text-light leading-relaxed">
                  Our premier outlets in the <strong>Garden Area</strong> and <strong>Police Chowki</strong> house our physical medicine inventories. We provide immediate collections for prescribed medicines, vaccines, and specialized clinical diets.
                </p>
              </div>
            </Link>

            {/* Hospital */}
            <Link href="/divisions/buddy-kitty" className="flex gap-4 p-6 bg-brand-bg hover:border-primary/40 transition-all rounded-lg border border-surface/20 shadow-sm cursor-pointer">
              <div className="h-12 w-12 rounded-lg bg-surface flex items-center justify-center text-accent shrink-0">
                <Hospital className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-lg font-bold text-text-dark">Buddy & Kitty Pet Hospital</h4>
                <p className="text-xs text-text-light leading-relaxed">
                  Located on <strong>100 Ft Road near Kariyanna Building</strong>, our state-of-the-art multi-speciality veterinary hospital provides complete diagnostics, surgery, pharmacy, and wellness checks.
                </p>
              </div>
            </Link>

            {/* Wholesale */}
            <Link href="/divisions/wholesale" className="flex gap-4 p-6 bg-brand-bg hover:border-primary/40 transition-all rounded-lg border border-surface/20 shadow-sm cursor-pointer">
              <div className="h-12 w-12 rounded-lg bg-surface flex items-center justify-center text-secondary shrink-0">
                <Building2 className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-lg font-bold text-text-dark">B2B Apothecary Wholesale</h4>
                <p className="text-xs text-text-light leading-relaxed">
                  Operating from our distribution hub near <strong>Kote, Old Barline Road</strong>, our wholesale medicines division supplies critical pharmaceuticals and therapeutics directly to clinics and depots.
                </p>
              </div>
            </Link>

            {/* Logistics */}
            <Link href="/divisions/petstep" className="flex gap-4 p-6 bg-brand-bg hover:border-primary/40 transition-all rounded-lg border border-surface/20 shadow-sm cursor-pointer">
              <div className="h-12 w-12 rounded-lg bg-surface flex items-center justify-center text-primary shrink-0">
                <Truck className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-lg font-bold text-text-dark">Petstep Logistics Network</h4>
                <p className="text-xs text-text-light leading-relaxed">
                  <strong>Petstep Integrated Service Pvt. Ltd.</strong>, located beside <strong>Royal Orchid Hotel on GSKM Road</strong>, acts as our logistics engine, distributing medical supplies, vaccines, and veterinary healthcare materials.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. VET CONSULTATION SPLIT SECTION */}
      <section className="bg-surface/50 border-y border-surface/40 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full lg:w-1/2 aspect-[4/3] rounded-lg overflow-hidden shadow-md bg-surface relative">
            <img 
              src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800" 
              alt="Veterinarian Consultation" 
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-brand-bg/90 backdrop-blur-sm p-4 rounded-md shadow border border-surface flex items-center gap-3">
              <Hospital className="h-8 w-8 text-accent animate-pulse" />
              <div>
                <p className="text-xs text-text-light font-bold">BUDDY & KITTY HOSPITAL</p>
                <p className="text-sm font-serif font-bold text-text-dark">100 Ft Road, Shivamogga</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6 lg:pl-6">
            <span className="text-xs uppercase tracking-widest font-bold text-accent font-mono">Clinical Infrastructure</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark">
              Buddy & Kitty Multi Speciality Pet Hospital
            </h2>
            <p className="text-sm text-text-light leading-relaxed">
              We understand that pet healthcare requires absolute trust, speed, and real-world clinical experience. Manasa Vet Pharma bridges premium home care with professional veterinary medicine operated through Shivamogga's premier <strong>Buddy & Kitty Multi Speciality Pet Hospital</strong>. Explore our services or consult directly with our hospital's board-certified clinical staff.
            </p>
            
            <ul className="space-y-3.5 text-sm text-text-dark font-medium">
              <li className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Advanced Diagnostics & Laboratory Screens
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Licensed Medicine Delivery & Wholesale Supply
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Post-Operation Support & Clinical Diets
              </li>
            </ul>

            <div className="pt-4">
              <Link 
                href="/services"
                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/95 text-brand-bg px-8 py-3.5 text-sm font-semibold shadow transition-transform hover:translate-y-[-2px]"
                id="home-vet-cta-btn"
              >
                Learn More About Our Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLIENT TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <span className="text-xs uppercase tracking-widest font-bold text-secondary font-mono">Verified Trust</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark mt-2 mb-12">Clinical Success Stories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface/20 border border-surface/20 rounded-lg p-8 flex flex-col justify-between text-left space-y-6">
            <div className="flex text-amber-500 gap-1"><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /></div>
            <p className="font-serif italic text-base text-text-dark leading-relaxed">
              {"\"The prescription diets and veterinary medicine supplied by Manasa Vet Pharma helped my Golden Retriever recover swiftly from chronic gastritis. Service is prompt and professional.\""}
            </p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" alt="Pet Parent" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h4 className="text-xs font-bold text-text-dark">Siddharth Mehta</h4>
                <p className="text-[10px] text-text-light">Shivamogga, Parent to Oliver</p>
              </div>
            </div>
          </div>

          <div className="bg-surface/20 border border-surface/20 rounded-lg p-8 flex flex-col justify-between text-left space-y-6">
            <div className="flex text-amber-500 gap-1"><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /></div>
            <p className="font-serif italic text-base text-text-dark leading-relaxed">
              {"\"We rely on Manasa Vet Pharma B2B wholesale distribution for our clinic's critical vaccines. Their cold-chain maintenance and inventory reliability are unmatched.\""}
            </p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Pet Parent" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h4 className="text-xs font-bold text-text-dark">Dr. Ananya Sen, DVM</h4>
                <p className="text-[10px] text-text-light">Bhadravathi, Clinic Director</p>
              </div>
            </div>
          </div>

          <div className="bg-surface/20 border border-surface/20 rounded-lg p-8 flex flex-col justify-between text-left space-y-6">
            <div className="flex text-amber-500 gap-1"><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /></div>
            <p className="font-serif italic text-base text-text-dark leading-relaxed">
              {"\"The staff at Buddy & Kitty Hospital during consultation were highly knowledgeable, giving clear instructions on treatment plans. Absolutely invaluable local platform.\""}
            </p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Pet Parent" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h4 className="text-xs font-bold text-text-dark">Rohan Malhotra</h4>
                <p className="text-[10px] text-text-light">Shivamogga, Parent to Rocky</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
