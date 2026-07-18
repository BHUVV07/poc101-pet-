'use client';

import { useState } from 'react';
import { buddyKittyGalleryItems } from '../../data/buddyKittyGallery';
import { manasaPetsMartGalleryItems } from '../../data/manasaPetsMartGallery';
import { manasaVetPharmaGalleryItems } from '../../data/manasaVetPharmaGallery';
import { divisionsData } from '../../data/divisions';
import Lightbox from '../Lightbox';
import { ImageIcon, Eye } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function Gallery() {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<'all' | 'retail' | 'hospital' | 'wholesale'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Compile wholesale images dynamically from divisionsData
  const wholesaleImages = (divisionsData.find(d => d.slug === 'wholesale')?.galleryImages || []).map((img, idx) => ({
    id: `wholesale-${idx}`,
    url: img,
    caption: [
      "Warehouse Overview",
      "Medicine Storage Facility",
      "Bulk Distribution Centre",
      "Retail Depot Stock",
      "Distribution Area",
      "Sterile Cold Chain",
      "Dispatch Desk",
      "Operations Hub"
    ][idx] || `Facility Photo ${idx + 1}`,
    category: 'wholesale' as const
  }));

  // Build the complete combined list of media items dynamically
  const dynamicGalleryData = [
    ...buddyKittyGalleryItems.map(item => ({
      id: item.id,
      url: item.image,
      caption: item.title,
      category: 'hospital' as const
    })),
    ...manasaVetPharmaGalleryItems.map(item => ({
      id: item.id,
      url: item.image,
      caption: item.title,
      category: 'retail' as const
    })),
    ...manasaPetsMartGalleryItems.map(item => ({
      id: item.id,
      url: item.image,
      caption: item.title,
      category: 'retail' as const
    })),
    ...wholesaleImages
  ];

  // Filtered gallery items
  const filteredData = activeCategory === 'all' 
    ? dynamicGalleryData 
    : dynamicGalleryData.filter(img => img.category === activeCategory);

  // Convert filteredData to Lightbox expected structure
  const lightboxImages = filteredData.map(img => ({
    image: img.url,
    title: img.caption,
    description: img.category.toUpperCase(),
  }));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? filteredData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === filteredData.length - 1 ? 0 : prev + 1));
  };

  const categories: { value: 'all' | 'retail' | 'hospital' | 'wholesale'; label: string }[] = [
    { value: 'all', label: 'All Media' },
    { value: 'hospital', label: 'Pet Hospital' },
    { value: 'retail', label: 'Pharmacies' },
    { value: 'wholesale', label: 'Wholesale Depot' }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-brand-bg border-b border-surface/50 select-none" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 text-xs uppercase tracking-widest font-bold font-mono">
              <ImageIcon className="h-3.5 w-3.5" />
              Visual Tour
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight leading-tight">
              Ecosystem Media Gallery
            </h2>
            <p className="text-sm text-text-light leading-relaxed">
              Explore our clinical environments, retail spaces, and wholesale packaging zones.
            </p>
          </div>

          {/* Categories Tab Navigation */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  setLightboxOpen(false);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-text-dark border-surface hover:bg-surface/35'
                }`}
                aria-label={`Show ${cat.label}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pinterest style Masonry Layout using CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((img, idx) => (
              <motion.div
                key={img.id}
                layout={!prefersReducedMotion}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid bg-white rounded-3xl overflow-hidden border border-surface/40 shadow-sm hover:shadow-md transition-shadow group relative cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                <img 
                  src={img.url} 
                  alt={img.caption} 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-secondary block mb-1">
                    {img.category}
                  </span>
                  <p className="font-serif text-sm font-bold leading-tight">
                    {img.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal overlay */}
      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
