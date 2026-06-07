'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, HeartHandshake, Award, Activity, Hospital, Store, Truck, Building2 } from 'lucide-react';
import { dbService } from '../services/dbService';
import { Product, Category, Banner } from '../types';
import ProductCard from '../components/product/ProductCard';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);

  useEffect(() => {
    async function loadHomeData() {
      const cats = await dbService.getCategories();
      setCategories(cats);
      
      const prods = await dbService.getProducts();
      setFeaturedProducts(prods.filter(p => p.isFeatured));

      const bans = await dbService.getBanners();
      setBanners(bans);
    }
    loadHomeData();
  }, []);

  // Auto rotate banners every 6 seconds
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setActiveBannerIdx(prev => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners]);

  return (
    <div className="w-full bg-brand-bg pb-12">
      {/* 1. HERO BANNER SLIDER */}
      <section className="relative h-[80vh] min-h-[500px] w-full overflow-hidden bg-surface">
        <AnimatePresence mode="wait">
          {banners.length > 0 && (
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
                style={{ backgroundImage: `url(${banners[activeBannerIdx].imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/35 to-transparent" />

              {/* Banner Text Content */}
              <div className="relative mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl text-white space-y-6">
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block text-xs uppercase tracking-widest font-semibold text-secondary"
                  >
                    Bespoke Pet Lifestyle
                  </motion.span>
                  <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
                  >
                    {banners[activeBannerIdx].title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-base sm:text-lg text-white/90 leading-relaxed max-w-lg"
                  >
                    {banners[activeBannerIdx].subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pt-4"
                  >
                    <Link
                      href={banners[activeBannerIdx].linkUrl || '/shop'}
                      className="inline-flex items-center gap-2 rounded-full bg-secondary hover:bg-secondary/90 px-8 py-3.5 text-sm font-semibold text-text-dark shadow-lg transition-all hover:translate-x-1 duration-300"
                    >
                      Explore Collection
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
          {banners.map((_, idx) => (
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
              <h3 className="font-serif text-lg font-bold text-text-dark">Artisanal Quality</h3>
              <p className="text-sm text-text-light mt-1.5 leading-relaxed">
                Every product is hand-crafted and strictly audited to match premium architectural and lifestyle standards.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-6 rounded-lg bg-surface/30 border border-surface/20">
            <HeartHandshake className="h-10 w-10 text-primary shrink-0" />
            <div>
              <h3 className="font-serif text-lg font-bold text-text-dark">Elite Veterinary Care</h3>
              <p className="text-sm text-text-light mt-1.5 leading-relaxed">
                Connect directly with board-certified pediatric and surgical vet specialists for dynamic care options.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-lg bg-surface/30 border border-surface/20">
            <ShieldCheck className="h-10 w-10 text-primary shrink-0" />
            <div>
              <h3 className="font-serif text-lg font-bold text-text-dark">Wholesale & Trust</h3>
              <p className="text-sm text-text-light mt-1.5 leading-relaxed">
                Licensed pharmaceutical supplies, certified organic recipes, and complete verification transparency.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 3. THE PAWLUXURY ECOSYSTEM */}
      <section className="bg-surface/25 border-y border-surface/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-primary">Established Locally. Built to Scale Nationally.</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark mt-2">The PawLuxury Ecosystem</h2>
            <p className="text-sm text-text-light mt-4 leading-relaxed">
              We are not just a digital concept storefront. PawLuxury represents an integrated, operational network of physical care locations, specialty hospitals, and wholesale supply divisions across Shivamogga, Karnataka.
            </p>
          </div>

          {/* Stats indicators grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-brand-bg border border-surface/30 p-6 rounded-lg text-center space-y-2">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-primary">2</h3>
              <p className="text-xs uppercase tracking-wider font-semibold text-text-dark">Premium Retail Outlets</p>
              <p className="text-[10px] text-text-light leading-relaxed">Garden Area & Police Chowki</p>
            </div>
            <div className="bg-brand-bg border border-surface/30 p-6 rounded-lg text-center space-y-2">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-accent">1</h3>
              <p className="text-xs uppercase tracking-wider font-semibold text-text-dark">Speciality Pet Hospital</p>
              <p className="text-[10px] text-text-light leading-relaxed">Buddy & Kitty, 100 Ft Road</p>
            </div>
            <div className="bg-brand-bg border border-surface/30 p-6 rounded-lg text-center space-y-2">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-secondary">1</h3>
              <p className="text-xs uppercase tracking-wider font-semibold text-text-dark">Veterinary Wholesale Division</p>
              <p className="text-[10px] text-text-light leading-relaxed">Apothecary Supplies, Kote</p>
            </div>
            <div className="bg-brand-bg border border-surface/30 p-6 rounded-lg text-center space-y-2">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-primary">1</h3>
              <p className="text-xs uppercase tracking-wider font-semibold text-text-dark">Multi-Brand Distribution</p>
              <p className="text-[10px] text-text-light leading-relaxed">Petstep Integrated, GSKM Road</p>
            </div>
          </div>

          {/* Detail cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Outlets */}
            <div className="flex gap-4 p-6 bg-brand-bg rounded-lg border border-surface/20 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-surface flex items-center justify-center text-primary shrink-0">
                <Store className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-lg font-bold text-text-dark">Retail Boutiques</h4>
                <p className="text-xs text-text-light leading-relaxed">
                  Our premier retail stores in the <strong>Garden Area</strong> and <strong>Police Chowki</strong> house our curated physical collections. We provide physical touchpoints for premium accessories, imported diets, and customer styling consultations.
                </p>
              </div>
            </div>

            {/* Hospital */}
            <div className="flex gap-4 p-6 bg-brand-bg rounded-lg border border-surface/20 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-surface flex items-center justify-center text-accent shrink-0">
                <Hospital className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-lg font-bold text-text-dark">Buddy & Kitty Pet Hospital</h4>
                <p className="text-xs text-text-light leading-relaxed">
                  Located on <strong>100 Ft Road near Kariyanna Building</strong>, our state-of-the-art multi-speciality veterinary hospital provides complete diagnostics, surgery, pharmacy, and wellness checks, forming the scientific anchor of our clinical trust.
                </p>
              </div>
            </div>

            {/* Wholesale */}
            <div className="flex gap-4 p-6 bg-brand-bg rounded-lg border border-surface/20 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-surface flex items-center justify-center text-secondary shrink-0">
                <Building2 className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-lg font-bold text-text-dark">B2B Apothecary Wholesale</h4>
                <p className="text-xs text-text-light leading-relaxed">
                  Operating from our distribution hub near <strong>Kote, Old Barline Road</strong>, our wholesale medicines division supplies critical pharmaceuticals and therapeutics directly to clinics, ensuring immediate availability of medical supplies.
                </p>
              </div>
            </div>

            {/* Distribution */}
            <div className="flex gap-4 p-6 bg-brand-bg rounded-lg border border-surface/20 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-surface flex items-center justify-center text-primary shrink-0">
                <Truck className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-lg font-bold text-text-dark">Petstep Distribution Network</h4>
                <p className="text-xs text-text-light leading-relaxed">
                  <strong>Petstep Integrated Service Pvt. Ltd.</strong>, located beside <strong>Royal Orchid Hotel on GSKM Road</strong>, acts as our logistics engine, distributing premium pet food and lifestyle accessories to retail storefronts across the region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 3. CATEGORY SPOTLIGHTS */}
      <section className="bg-surface/40 py-20 border-y border-surface/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-secondary">Curated Collections</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark mt-2">Browse Luxury Categories</h2>
            <p className="text-sm text-text-light mt-4 leading-relaxed">
              Carefully designed environments housing premium accessories, organic meals, custom tailoring, and apothecary-grade pet care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative h-[380px] w-full rounded-lg overflow-hidden shadow-sm"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${cat.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-x-0 bottom-0 p-6 text-white flex flex-col justify-end h-1/2 space-y-2">
                  <h3 className="font-serif text-xl font-bold">{cat.name}</h3>
                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                  <Link 
                    href={`/shop?category=${cat.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-secondary hover:text-white transition-colors font-bold pt-2 self-start"
                  >
                    View Boutique <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-secondary">The Best Sellers</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark mt-2">Bestselling Masterpieces</h2>
          </div>
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-secondary transition-colors mt-3 sm:mt-0"
          >
            Explore All Creations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 5. VET CONSULTATION SPLIT SECTION */}
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
            <span className="text-xs uppercase tracking-widest font-bold text-accent">Clinical Infrastructure</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark">
              Buddy & Kitty Multi Speciality Pet Hospital
            </h2>
            <p className="text-sm text-text-light leading-relaxed">
              We understand that pet healthcare requires absolute trust, speed, and real-world clinical experience. PawLuxury bridges premium home comfort with professional veterinary medicine operated through Shivamogga's premier <strong>Buddy & Kitty Multi Speciality Pet Hospital</strong>. Schedule virtual video diagnoses or consult directly with our hospital's board-certified clinical staff.
            </p>
            
            <ul className="space-y-3.5 text-sm text-text-dark font-medium">
              <li className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Virtual Video & Chat Consultations
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
                href="/consultation"
                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/95 text-brand-bg px-8 py-3.5 text-sm font-semibold shadow transition-transform hover:translate-y-[-2px]"
                id="home-vet-cta-btn"
              >
                Schedule Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EDITORIAL TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <span className="text-xs uppercase tracking-widest font-bold text-secondary">Verified Trust</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark mt-2 mb-12">The PawLuxury Society</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface/20 border border-surface/20 rounded-lg p-8 flex flex-col justify-between text-left space-y-6">
            <div className="flex text-amber-500 gap-1"><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /></div>
            <p className="font-serif italic text-base text-text-dark leading-relaxed">
              {"\"The Royal Velvet bed completely transformed my Golden Retriever's sleep. He used to struggle rising in the morning, but the orthopedic foam works wonders. The styling fits our living room beautifully.\""}
            </p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" alt="Pet Parent" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h4 className="text-xs font-bold text-text-dark">Siddharth Mehta</h4>
                <p className="text-[10px] text-text-light">Gurugram, Parent to Oliver</p>
              </div>
            </div>
          </div>

          <div className="bg-surface/20 border border-surface/20 rounded-lg p-8 flex flex-col justify-between text-left space-y-6">
            <div className="flex text-amber-500 gap-1"><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /></div>
            <p className="font-serif italic text-base text-text-dark leading-relaxed">
              {"\"Bespoke leather detailing on the Tuscan collar is flawless. It is hard to find high-end pet accessories in India that do not look cheap. PawLuxury is in a class of its own.\""}
            </p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Pet Parent" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h4 className="text-xs font-bold text-text-dark">Ananya Sen</h4>
                <p className="text-[10px] text-text-light">Mumbai, Parent to Cleo</p>
              </div>
            </div>
          </div>

          <div className="bg-surface/20 border border-surface/20 rounded-lg p-8 flex flex-col justify-between text-left space-y-6">
            <div className="flex text-amber-500 gap-1"><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /></div>
            <p className="font-serif italic text-base text-text-dark leading-relaxed">
              {"\"Setting up video consults for Oliver during late hours was smooth. The veterinarian was highly knowledgeable, giving clear instructions on dietary changes. Invaluable platform.\""}
            </p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Pet Parent" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h4 className="text-xs font-bold text-text-dark">Rohan Malhotra</h4>
                <p className="text-[10px] text-text-light">Delhi, Parent to Rocky</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
