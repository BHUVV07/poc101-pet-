'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play, Video } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import HospitalVideoModal from './HospitalVideoModal';
import { VideoItem } from '../data/buddyKittyVideos';

interface VideoGalleryProps {
  title: string;
  subtitle: string;
  items: VideoItem[];
}

export default function VideoGallery({
  title,
  subtitle,
  items,
}: VideoGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: false,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  // Video Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  // Focus reference restoration
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

  const openVideo = (index: number) => {
    setActiveVideoIndex(index);
    setModalOpen(true);
  };

  const closeVideo = () => {
    setModalOpen(false);
    // Restore focus to the specific button that triggered the modal
    const triggerBtn = triggerButtonRefs.current[activeVideoIndex];
    if (triggerBtn) {
      triggerBtn.focus();
    }
  };

  const navigatePrevVideo = () => {
    setActiveVideoIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const navigateNextVideo = () => {
    setActiveVideoIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  // Animation settings
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
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent px-4 py-1 text-xs uppercase tracking-widest font-bold font-mono">
          <Video className="h-3.5 w-3.5" />
          Walkthroughs
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight leading-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-text-light max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 group/carousel">
        {/* Navigation Buttons (Desktop) */}
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
                className="pl-6 min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_31%] shrink-0"
              >
                {/* Video Card Button */}
                <button
                  type="button"
                  ref={(el) => {
                    triggerButtonRefs.current[index] = el;
                  }}
                  onClick={() => openVideo(index)}
                  aria-haspopup="dialog"
                  aria-label={`Play walkthrough video of ${item.title}`}
                  className="w-full flex flex-col h-[420px] sm:h-[460px] lg:h-[500px] text-left rounded-2xl overflow-hidden bg-surface/20 border border-surface/30 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-2 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer group relative"
                >
                  {/* Thumbnail wrapper */}
                  <div className="w-full flex-1 overflow-hidden relative bg-surface/10">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                    />

                    {/* Centered Glassmorphic Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
                      <div className="p-5 rounded-full bg-white/20 hover:bg-white/35 text-white backdrop-blur-md border border-white/30 shadow-lg transform transition-transform duration-300 motion-safe:group-hover:scale-110 flex items-center justify-center">
                        <Play className="h-6 w-6 fill-current text-white translate-x-[1px]" />
                      </div>
                    </div>

                    {/* Duration Badge (Top-Right) */}
                    {item.duration && (
                      <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white border border-white/10 text-[10px] tracking-wider font-bold px-3 py-1 rounded-full font-mono shadow-sm">
                        {item.duration}
                      </span>
                    )}

                    {/* Bottom gradient overlay for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
                  </div>

                  {/* Caption Details */}
                  <div className="p-5 bg-surface/10 border-t border-surface/20 space-y-1.5 shrink-0">
                    <span className="text-[10px] tracking-widest font-mono uppercase text-accent font-bold">
                      {item.id.replace(/-/g, ' ')}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl font-bold text-text-dark leading-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-text-light text-xs md:text-sm font-sans line-clamp-1 leading-normal">
                      {item.description}
                    </p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      <HospitalVideoModal
        isOpen={modalOpen}
        videos={items}
        currentIndex={activeVideoIndex}
        onClose={closeVideo}
        onPrev={navigatePrevVideo}
        onNext={navigateNextVideo}
      />
    </motion.section>
  );
}
