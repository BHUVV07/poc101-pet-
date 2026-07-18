'use client';

import { use, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Shield, CheckCircle, ExternalLink, Image as ImageIcon, Pill, Syringe, Heart, Droplet, Briefcase, Bone, Tag, Home, Bath, Check, Dog, Bird, Fish } from 'lucide-react';
import { divisionsData } from '../../../data/divisions';

function Cow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 11c0 3.866 2.239 7 5 7s5-3.134 5-7V7H7v4z" />
      <path d="M9 14h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-3z" />
      <circle cx="10.5" cy="16" r="0.5" fill="currentColor" />
      <circle cx="13.5" cy="16" r="0.5" fill="currentColor" />
      <path d="M7 7c-.5-1.5-1.5-2.5-3-3 1.5 1 2 2.5 2 3z" />
      <path d="M17 7c.5-1.5 1.5-2.5 3-3-1.5 1-2 2.5-2 3z" />
      <path d="M7 9C5 9.5 4 11.5 4 13c1.5-.5 2.5-1.5 3-4z" />
      <path d="M17 9c2 .5 3 2.5 3 4-1.5-.5-2.5-1.5-3-4z" />
    </svg>
  );
}
import HospitalGallery from '../../../components/HospitalGallery';
import {
  buddyKittyGalleryTitle,
  buddyKittyGallerySubtitle,
  buddyKittyGalleryItems,
} from '../../../data/buddyKittyGallery';
import {
  manasaPetsMartGalleryTitle,
  manasaPetsMartGallerySubtitle,
  manasaPetsMartGalleryItems,
} from '../../../data/manasaPetsMartGallery';
import MediaCarousel from '../../../components/MediaCarousel';
import HospitalTestimonials from '../../../components/HospitalTestimonials';
import {
  buddyKittyVideoTitle,
  buddyKittyVideoSubtitle,
  buddyKittyVideoItems,
} from '../../../data/buddyKittyVideos';
import ContactLocation from '../../../components/ContactLocation';
import { buddyKittyContactData } from '../../../data/buddyKittyContact';
import VisitStore from '../../../components/VisitStore';
import { manasaPetsMartContactData } from '../../../data/manasaPetsMartContact';
import { manasaVetPharmaContactData } from '../../../data/manasaVetPharmaContact';
import {
  pharmaCategoriesTitle,
  pharmaCategoriesSubtitle,
  pharmaCategories,
} from '../../../data/pharmaProducts';
import {
  manasaVetPharmaGalleryTitle,
  manasaVetPharmaGallerySubtitle,
  manasaVetPharmaGalleryItems,
} from '../../../data/manasaVetPharmaGallery';

export default function DivisionPageClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const division = divisionsData.find(d => d.slug === slug) || null;

  useEffect(() => {
    if (division) {
      document.title = `${division.name} | Manasa Vet Pharma`;
    }
  }, [division]);

  if (!division) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 space-y-4 bg-brand-bg text-text-dark">
        <h2 className="font-serif text-3xl font-bold">Division Not Found</h2>
        <p className="text-sm text-text-light">The division you are looking for does not exist in our network.</p>
        <Link
          href="/"
          className="rounded-full bg-primary text-brand-bg px-8 py-3 text-xs font-bold transition-transform hover:scale-103"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-16 pb-16 bg-brand-bg text-text-dark">
      <title>{`${division.name} | Manasa Vet Pharma`}</title>
      <meta property="og:title" content={`${division.name} | Manasa Vet Pharma`} />
      <meta property="og:description" content={division.overview} />
      {/* Hero Banner Section */}
      <section className="relative h-[55vh] min-h-[400px] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-45 scale-103"
          style={{ backgroundImage: `url(${division.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center space-y-4 text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary px-4 py-1 text-xs uppercase tracking-widest font-bold font-mono">
            {division.type.toUpperCase()} DIVISION
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            {division.name}
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {division.overview}
          </p>
        </div>
      </section>

      {/* Main content grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: About & Services/Products Lists */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* About Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="font-serif text-3xl font-bold text-text-dark border-b border-surface pb-3">
                About the Division
              </h2>
              <p className="text-sm text-text-light leading-relaxed">
                {division.aboutText}
              </p>
            </motion.div>

            {/* Division Highlights */}
            {division.highlights && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {division.highlights.map((h, i) => (
                  <div key={i} className="p-5 rounded-lg bg-surface/20 border border-surface/20 space-y-2">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-primary flex items-center gap-1.5">
                      <Shield className="h-4 w-4 text-primary" />
                      {h.title}
                    </h4>
                    <p className="text-xs text-text-light leading-normal">{h.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Services & Products lists */}
            {division.slug === 'police-chowki' ? (
              <div className="border-t border-surface pt-8 space-y-8">
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark">
                    Products Available at Manasa Pets Mart
                  </h3>
                  <p className="text-sm text-text-light leading-relaxed">
                    Discover a wide selection of premium pet food, accessories, grooming essentials, and travel products designed to keep your pets healthy, comfortable, and happy.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Card 1: Pet Food & Nutrition */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="p-6 rounded-2xl bg-white border border-surface/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group"
                  >
                    <div className="space-y-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <Bone className="h-5 w-5" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-serif text-lg font-bold text-text-dark">
                          Pet Food & Nutrition
                        </h4>
                        <p className="text-xs text-text-light leading-relaxed">
                          Premium nutrition for dogs, cats, puppies, and kittens from trusted brands.
                        </p>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-surface/20">
                        {[
                          'Dry Dog Food', 'Wet Dog Food', 'Dry Cat Food', 'Wet Cat Food',
                          'Puppy Food', 'Kitten Food', 'Prescription Diets', 'Treats & Biscuits',
                          'Nutritional Supplements', 'Milk Replacers'
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-text-light font-medium leading-none">
                            <span className="h-4.5 w-4.5 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center shrink-0">
                              <Check className="h-3 w-3 text-accent" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Card 2: Pet Accessories */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="p-6 rounded-2xl bg-white border border-surface/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group"
                  >
                    <div className="space-y-4">
                      <div className="h-10 w-10 rounded-xl bg-secondary/15 border border-secondary/25 text-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <Tag className="h-5 w-5" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-serif text-lg font-bold text-text-dark">
                          Pet Accessories
                        </h4>
                        <p className="text-xs text-text-light leading-relaxed">
                          Everything your pet needs for comfort, play, and everyday care.
                        </p>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-surface/20">
                        {[
                          'Pet Beds & Cushions', 'Collars & Leashes', 'Harnesses', 'Dog Chains',
                          'Muzzles', 'Pet Clothing', 'Toys & Chew Toys', 'Feeding Bowls',
                          'Automatic Feeders', 'ID Tags & Accessories'
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-text-light font-medium leading-none">
                            <span className="h-4.5 w-4.5 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center shrink-0">
                              <Check className="h-3 w-3 text-accent" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Card 3: Housing & Travel Essentials */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="p-6 rounded-2xl bg-white border border-surface/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group"
                  >
                    <div className="space-y-4">
                      <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <Home className="h-5 w-5" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-serif text-lg font-bold text-text-dark">
                          Housing & Travel Essentials
                        </h4>
                        <p className="text-xs text-text-light leading-relaxed">
                          Comfortable home and travel solutions for pets of all sizes.
                        </p>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-surface/20">
                        {[
                          'Dog Cages', 'Pet Crates', 'Cat Carriers', 'Travel Bags',
                          'Kennels', 'Litter Boxes', 'Cat Litter', 'Feeding Stations',
                          'Training Pads', 'Travel Accessories'
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-text-light font-medium leading-none">
                            <span className="h-4.5 w-4.5 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center shrink-0">
                              <Check className="h-3 w-3 text-accent" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Card 4: Grooming & Hygiene */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="p-6 rounded-2xl bg-white border border-surface/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group"
                  >
                    <div className="space-y-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <Bath className="h-5 w-5" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-serif text-lg font-bold text-text-dark">
                          Grooming & Hygiene
                        </h4>
                        <p className="text-xs text-text-light leading-relaxed">
                          Daily grooming products to keep your pets clean, healthy, and well-groomed.
                        </p>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-surface/20">
                        {[
                          'Pet Shampoos & Conditioners', 'Tick & Flea Care', 'Grooming Brushes & Combs', 'Nail Clippers',
                          'Ear Cleaning Solutions', 'Dental Care Kits', 'Paw Care Products', 'Pet Wipes',
                          'Deodorizing Sprays', 'Grooming Gloves'
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-text-light font-medium leading-none">
                            <span className="h-4.5 w-4.5 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center shrink-0">
                              <Check className="h-3 w-3 text-accent" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            ) : division.slug === 'garden-area' ? (
              <div className="border-t border-surface pt-8 space-y-8">
                {/* Title & Subtitle */}
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark">
                    Products Available
                  </h3>
                  <p className="text-sm text-text-light leading-relaxed">
                    We provide veterinary medicines, vaccines, supplements, and healthcare solutions for a wide range of companion animals, livestock, poultry, and aquaculture.
                  </p>
                </div>

                {/* 2x2 Grid of 4 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1: Companion Animals */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-surface/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full justify-between group"
                  >
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <Dog className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-text-dark">
                            Companion Animals
                          </h4>
                          <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                            Veterinary medicines and healthcare solutions for household pets.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-surface/30 pt-4">
                        <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-primary block">
                          🐾 Medicines Available For
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {['Dogs', 'Cats', 'Rabbits', 'Turtles', 'Pet Birds'].map((item) => (
                            <span 
                              key={item} 
                              className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 text-primary border border-primary/15 text-xs font-semibold tracking-wide"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 2: Livestock Animals */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-surface/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full justify-between group"
                  >
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-secondary/15 border border-secondary/25 text-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <Cow className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-text-dark">
                            Livestock Animals
                          </h4>
                          <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                            Healthcare solutions for dairy and farm animals.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-surface/30 pt-4">
                        <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-secondary block">
                          🐾 Medicines Available For
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {['Cattle', 'Buffaloes', 'Goats', 'Sheep'].map((item) => (
                            <span 
                              key={item} 
                              className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-xs font-semibold tracking-wide"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 3: Poultry */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-surface/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full justify-between group"
                  >
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-accent/20 border border-accent/30 text-accent flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <Bird className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-text-dark">
                            Poultry
                          </h4>
                          <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                            Veterinary healthcare products for commercial and backyard poultry.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-surface/30 pt-4">
                        <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-accent block">
                          🐾 Medicines Available For
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {['Broilers', 'Layers', 'Country Chicken', 'Ducks', 'Turkeys'].map((item) => (
                            <span 
                              key={item} 
                              className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 text-xs font-semibold tracking-wide"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 4: Fisheries & Aquaculture */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-surface/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full justify-between group"
                  >
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <Fish className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-text-dark">
                            Fisheries & Aquaculture
                          </h4>
                          <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                            Veterinary healthcare solutions for aquaculture and aquatic farming.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-surface/30 pt-4">
                        <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-primary block">
                          🐾 Medicines Available For
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {['Freshwater Fish', 'Ornamental Fish', 'Shrimp', 'Prawns'].map((item) => (
                            <span 
                              key={item} 
                              className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 text-primary border border-primary/15 text-xs font-semibold tracking-wide"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-surface pt-8">
                {/* Services available */}
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-text-dark flex items-center gap-2">
                    Services Offered
                  </h3>
                  <ul className="space-y-2.5">
                    {division.servicesAvailable.map((srv, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-text-light leading-normal">
                        <CheckCircle className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Products categories */}
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-text-dark flex items-center gap-2">
                    Materials & Categories
                  </h3>
                  <ul className="space-y-2.5">
                    {division.productsAvailable.map((prod, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-text-light leading-normal">
                        <CheckCircle className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                        <span>{prod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {division.showcaseImage ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full rounded-lg overflow-hidden border border-surface/20 shadow-sm"
            >
              <img 
                src={division.showcaseImage}
                alt={`${division.name} Showcase`}
                className="w-full h-[350px] sm:h-[450px] lg:h-[520px] object-cover transition-transform duration-300 hover:scale-103"
              />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-lg bg-surface/30 border border-surface/20 shadow-sm space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-text-dark">
                  Contact & Address
                </h3>
                <p className="text-xs text-text-light leading-relaxed">
                  Connect with our local branch directors or coordinates directly for stock verifications and schedules.
                </p>
                
                <div className="space-y-4 pt-4 text-xs divide-y divide-surface/60">
                  <div className="flex gap-3 pt-2.5">
                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <span className="font-bold text-text-dark block">Location Address</span>
                      <span className="text-text-light mt-1 block leading-normal">{division.address}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <span className="font-bold text-text-dark block">Contact Line</span>
                      <span className="text-text-light mt-1 block font-mono">{division.phone}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Clock className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <span className="font-bold text-text-dark block">Working Hours</span>
                      <span className="text-text-light mt-1 block font-mono">{division.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <a 
                href={division.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full text-center inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/95 text-brand-bg py-3 text-xs font-semibold shadow transition-all duration-300 cursor-pointer"
              >
                <ExternalLink className="h-4 w-4" />
                Directions on Google Maps
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* New Reusable Hospital Gallery Section (Exclusively for buddy-kitty) */}
      {division.slug === 'buddy-kitty' && (
        <HospitalGallery
          title={buddyKittyGalleryTitle}
          subtitle={buddyKittyGallerySubtitle}
          items={buddyKittyGalleryItems}
        />
      )}

      {/* New Reusable Store Gallery Section (Exclusively for police-chowki) */}
      {division.slug === 'police-chowki' && (
        <HospitalGallery
          title={manasaPetsMartGalleryTitle}
          subtitle={manasaPetsMartGallerySubtitle}
          items={manasaPetsMartGalleryItems}
          showCaptions={false}
        />
      )}

      {/* Dedicated Visit Our Store Section (Exclusively for police-chowki) */}
      {division.slug === 'police-chowki' && (
        <VisitStore data={manasaPetsMartContactData} />
      )}

      {/* New Reusable Hospital Video Tour Section (Exclusively for buddy-kitty) */}
      {division.slug === 'buddy-kitty' && (
        <MediaCarousel
          title={buddyKittyVideoTitle}
          subtitle={buddyKittyVideoSubtitle}
          items={buddyKittyVideoItems.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            thumbnail: item.thumbnail,
            videoUrl: item.video,
            duration: item.duration
          }))}
        />
      )}

      {/* Hospital Testimonials Section (Exclusively for buddy-kitty) */}
      {division.slug === 'buddy-kitty' && (
        <HospitalTestimonials />
      )}

      {/* New Reusable Contact & Location Section (Exclusively for buddy-kitty) */}
      {division.slug === 'buddy-kitty' && (
        <ContactLocation data={buddyKittyContactData} />
      )}

      {/* New Products & Categories Section (Exclusively for garden-area and wholesale) */}
      {(division.slug === 'garden-area' || division.slug === 'wholesale') && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 border-t border-surface pt-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary px-4 py-1 text-xs uppercase tracking-widest font-mono font-bold">
              {division.slug === 'wholesale' ? 'Wholesale Portfolio' : 'Pharma Portfolio'}
            </span>
            <h3 className="font-serif text-3xl font-bold text-text-dark">
              {division.slug === 'wholesale' ? 'Wholesale Categories' : pharmaCategoriesTitle}
            </h3>
            <p className="text-xs sm:text-sm text-text-light leading-relaxed font-medium">
              {division.slug === 'wholesale' 
                ? 'High-volume clinical distribution channels supplying pharmacies, veterinary labs, and animal hospitals.'
                : pharmaCategoriesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(division.slug === 'wholesale' 
              ? [
                  { id: 'w1', name: 'Veterinary Medicines', description: 'Bulk companion, livestock, and equine drug supply lines complying with clinical safety standards.', iconName: 'Pill' },
                  { id: 'w2', name: 'Bulk Pharmacy Distribution', description: 'Direct depot-to-clinic transport networks with qualified cold-chain tracking for wholesale accounts.', iconName: 'Briefcase' },
                  { id: 'w3', name: 'Vaccines & Biologicals', description: 'Advanced cold-chain vaccine storage keeping core biologicals at stable, verified temperature ranges.', iconName: 'Shield' },
                  { id: 'w4', name: 'Nutritional Supplements', description: 'High-volume vitamins, mineral supplements, and therapeutic feeds for companion and large animals.', iconName: 'Droplet' },
                  { id: 'w5', name: 'Clinical Consumables', description: 'Syringes, infusion sets, bandages, surgical gloves, aseptic prep concentrates, and trade materials.', iconName: 'Syringe' },
                  { id: 'w6', name: 'Veterinary Healthcare Supplies', description: 'Comprehensive diagnostic strip tests, clinic instruments, and critical diagnostic materials for practices.', iconName: 'Heart' }
                ]
              : pharmaCategories
            ).map((cat, index) => {
              const IconComponent = 
                cat.iconName === 'Pill' ? Pill :
                cat.iconName === 'Syringe' ? Syringe :
                cat.iconName === 'Heart' ? Heart :
                cat.iconName === 'Shield' ? Shield :
                cat.iconName === 'Droplet' ? Droplet :
                Briefcase;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-6 rounded-lg bg-surface/20 border border-surface/20 hover:border-primary/40 hover:bg-surface/30 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-text-dark">
                      {cat.name}
                    </h4>
                    <p className="text-xs text-text-light leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* Pharmacy Gallery Section (Exclusively for garden-area) */}
      {division.slug === 'garden-area' && (
        <HospitalGallery
          title={manasaVetPharmaGalleryTitle}
          subtitle={manasaVetPharmaGallerySubtitle}
          items={manasaVetPharmaGalleryItems}
          showCaptions={true}
        />
      )}

      {/* Dedicated Visit Our Pharmacy Section (Exclusively for garden-area) */}
      {division.slug === 'garden-area' && (
        <VisitStore data={manasaVetPharmaContactData} />
      )}

      {/* Wholesale Gallery Section (Exclusively for wholesale) */}
      {division.slug === 'wholesale' && (
        <HospitalGallery
          title="Wholesale Gallery"
          subtitle="Explore our wholesale veterinary pharmacy and distribution centre supplying high-quality medicines, vaccines, supplements, and healthcare products across the region."
          items={division.galleryImages.map((img, idx) => ({
            id: `wholesale-gallery-${idx}`,
            image: img,
            title: [
              "Warehouse",
              "Medicine Storage",
              "Bulk Inventory",
              "Distribution Area",
              "Packaging Section",
              "Product Shelves",
              "Dispatch Counter",
              "Facility Overview"
            ][idx] || `Facility Photo ${idx + 1}`,
            description: `Wholesale veterinary pharmacy and distribution facility overview.`
          }))}
          showCaptions={false}
        />
      )}

      {/* Dedicated Visit Our Wholesale Centre Section (Exclusively for wholesale) */}
      {division.slug === 'wholesale' && (
        <VisitStore
          data={{
            title: "Visit Our Wholesale Centre",
            subtitle: "Explore our wholesale veterinary pharmacy and distribution centre supplying high-quality medicines, vaccines, supplements, and healthcare products across the region.",
            storeName: division.name,
            addressLines: division.addressLines || [
              "DSL Complex",
              "Garden Area 1st Cross Road",
              "Opposite Modern Talkies",
              "Shivamogga",
              "Karnataka – 577201"
            ],
            phone: division.phone,
            workingHours: division.workingHours,
            services: division.servicesAvailable || ["Delivery", "On-site Services"],
            googleMapsEmbedUrl: division.googleMapsEmbedUrl || "https://maps.google.com/maps?q=Manasa%20Vet%20Pharma%20-%20Wholesale&t=&z=16&ie=UTF8&iwloc=B&output=embed",
            directionsUrl: division.googleMapsLink,
            description: division.description || division.overview,
            rating: division.rating,
            reviewCount: division.reviewCount,
            buttonText: "Get Directions"
          }}
        />
      )}

      {/* Gallery Section */}
      {division.slug !== 'buddy-kitty' && division.slug !== 'police-chowki' && division.slug !== 'garden-area' && division.slug !== 'wholesale' && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 border-t border-surface pt-12">
          <h3 className="font-serif text-2xl font-bold text-text-dark flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            Division Gallery
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {division.galleryImages.map((img, i) => (
              <div key={i} className="aspect-video w-full rounded-lg overflow-hidden border border-surface/20 bg-surface/10 relative group">
                <img 
                  src={img} 
                  alt={`${division.name} showcase`} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
