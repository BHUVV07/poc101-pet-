'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Lightbox from './Lightbox';
import GalleryCard from './GalleryCard';
import { GalleryItem } from '../data/buddyKittyGallery';

interface HospitalGalleryProps {
  title: string;
  subtitle: string;
  items: GalleryItem[];
  showCaptions?: boolean;
  loop?: boolean;
  align?: 'start' | 'center' | 'end';
  dragFree?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
}

export default function HospitalGallery({
  title,
  subtitle,
  items,
  showCaptions = true,
  loop = false,
  align = 'start',
  dragFree = false,
  autoplay = false,
  autoplayDelay = 3000,
}: HospitalGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align,
    loop,
    skipSnaps: false,
    dragFree,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Keep track of the button ref that opened the lightbox to restore focus
  const triggerButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const timeoutId = setTimeout(() => {
      onSelect();
    }, 0);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      clearTimeout(timeoutId);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || !autoplay) return;

    let intervalId: NodeJS.Timeout | null = null;
    let isPaused = false;

    const startAutoplay = () => {
      stopAutoplay();
      intervalId = setInterval(() => {
        if (!isPaused && emblaApi) {
          emblaApi.scrollNext();
        }
      }, autoplayDelay);
    };

    const stopAutoplay = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    startAutoplay();

    const rootNode = emblaApi.rootNode();
    const onMouseEnter = () => {
      isPaused = true;
    };
    const onMouseLeave = () => {
      isPaused = false;
    };

    if (rootNode) {
      rootNode.addEventListener('mouseenter', onMouseEnter);
      rootNode.addEventListener('mouseleave', onMouseLeave);
    }

    emblaApi.on('pointerDown', stopAutoplay);
    emblaApi.on('pointerUp', startAutoplay);

    return () => {
      stopAutoplay();
      if (rootNode) {
        rootNode.removeEventListener('mouseenter', onMouseEnter);
        rootNode.removeEventListener('mouseleave', onMouseLeave);
      }
      if (emblaApi) {
        emblaApi.off('pointerDown', stopAutoplay);
        emblaApi.off('pointerUp', startAutoplay);
      }
    };
  }, [emblaApi, autoplay, autoplayDelay]);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // Restore focus to the specific card button that opened the lightbox
    const triggerBtn = triggerButtonRefs.current[activeImageIndex];
    if (triggerBtn) {
      triggerBtn.focus();
    }
  };

  const navigatePrevLightbox = () => {
    setActiveImageIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const navigateNextLightbox = () => {
    setActiveImageIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  // Accessibility & Animation parameters
  const prefersReducedMotion = useReducedMotion();
  const sectionAnimation = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 0, y: 30 };

  return (
    <motion.section
      initial={sectionAnimation}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="w-full py-16 md:py-24 border-t border-surface space-y-12 select-none"
    >
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary px-4 py-1 text-xs uppercase tracking-widest font-bold font-mono">
          <ImageIcon className="h-3.5 w-3.5" />
          Virtual Tour
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight leading-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-text-light max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Carousel Outer Container with Left and Right Arrows */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 group/carousel">
        {/* Navigation Buttons (Desktop Only) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 -ml-4 flex items-center max-md:hidden">
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous Slide"
            className="p-3 rounded-full bg-brand-bg/90 hover:bg-brand-bg text-text-dark disabled:opacity-40 disabled:cursor-not-allowed border border-surface/40 hover:border-surface shadow-sm hover:shadow transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 -mr-4 flex items-center max-md:hidden">
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next Slide"
            className="p-3 rounded-full bg-brand-bg/90 hover:bg-brand-bg text-text-dark disabled:opacity-40 disabled:cursor-not-allowed border border-surface/40 hover:border-surface shadow-sm hover:shadow transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Embla Viewport */}
        <div ref={emblaRef} className="overflow-hidden rounded-2xl">
          <div className="flex -ml-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="pl-6 min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] shrink-0"
              >
                <GalleryCard
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  id={item.id}
                  showCaptions={showCaptions}
                  onClick={() => openLightbox(index)}
                  buttonRef={(el) => {
                    triggerButtonRefs.current[index] = el;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={items}
        currentIndex={activeImageIndex}
        onClose={closeLightbox}
        onPrev={navigatePrevLightbox}
        onNext={navigateNextLightbox}
        showMetadata={showCaptions}
      />
    </motion.section>
  );
}
