'use client';

import { useState, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { hospitalVideos } from '../data/hospitalVideos';

export default function HospitalVideoTour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: false,
    dragFree: false,
  });

  // Track select event to pause videos on slide transition
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      if (containerRef.current) {
        const videos = containerRef.current.querySelectorAll('video');
        videos.forEach(v => v.pause());
      }
    };

    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Track play events on all videos to pause others
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const handlePlay = (e: Event) => {
      const playingVideo = e.target as HTMLVideoElement;
      const videos = container.querySelectorAll('video');
      videos.forEach(v => {
        if (v !== playingVideo) {
          v.pause();
        }
      });
    };

    const registerVideoEvents = () => {
      const videos = container.querySelectorAll('video');
      videos.forEach(v => {
        v.addEventListener('play', handlePlay);
      });
    };

    registerVideoEvents();

    return () => {
      const videos = container.querySelectorAll('video');
      videos.forEach(v => {
        v.removeEventListener('play', handlePlay);
      });
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!emblaApi) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key === 'ArrowLeft') {
        emblaApi.scrollPrev();
      } else if (e.key === 'ArrowRight') {
        emblaApi.scrollNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="w-full py-16 md:py-24 border-t border-surface/30 bg-[#FAF7F2] select-none" id="video-tour">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 text-xs uppercase tracking-widest font-bold font-mono">
              <Video className="h-3.5 w-3.5" />
              Hospital Video Tour
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark tracking-tight">
              Virtual Walkthrough
            </h2>
            <p className="text-sm sm:text-base text-text-light leading-relaxed">
              Explore our facilities through guided walkthrough videos of our treatment areas, consultation rooms, operation theatre, grooming studio, and more.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="flex items-center justify-center h-12 w-12 rounded-full border border-surface/30 bg-surface/10 hover:bg-surface/20 text-text-dark transition-all duration-300 active:scale-95"
              aria-label="Previous videos"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              className="flex items-center justify-center h-12 w-12 rounded-full border border-surface/30 bg-surface/10 hover:bg-surface/20 text-text-dark transition-all duration-300 active:scale-95"
              aria-label="Next videos"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Embla Slider */}
        <div className="relative">
          <div className="overflow-hidden px-1" ref={emblaRef}>
            <div className="flex -ml-6" ref={containerRef}>
              {hospitalVideos.map((video, idx) => (
                <div key={idx} className="flex-[0_0_100%] min-w-0 pl-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="relative max-w-[900px] mx-auto aspect-video rounded-3xl overflow-hidden bg-black/5 shadow-md border border-surface/10 group hover:scale-[1.01] hover:shadow-lg transition-all duration-300"
                  >
                    <video
                      preload="metadata"
                      controls
                      muted
                      playsInline
                      className="h-full w-full rounded-3xl object-cover"
                    >
                      <source src={video} type="video/mp4" />
                    </video>
                    {/* Card Label Overlay */}
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[9px] uppercase tracking-wider font-bold text-white select-none pointer-events-none">
                      Walkthrough Video {idx + 1}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
