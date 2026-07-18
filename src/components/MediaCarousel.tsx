'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string; // Direct path to MP4 file
  thumbnail: string;
  duration?: string;
}

interface MediaCarouselProps {
  title: string;
  subtitle: string;
  items: MediaItem[];
}

export default function MediaCarousel({ title, subtitle, items }: MediaCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Restart video when activeIndex changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // Handle Play/Pause toggling
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Handle Mute toggling
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  // Automatically advance when video finishes
  const handleVideoEnded = () => {
    handleNext();
  };

  const currentItem = items[activeIndex];

  const slideVariants = prefersReducedMotion
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: { opacity: 0, scale: 0.98 },
        center: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
        exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3, ease: 'easeIn' as const } },
      };

  return (
    <section className="w-full py-16 md:py-24 border-t border-surface bg-brand-bg select-none" id="media-tour">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent px-4 py-1 text-xs uppercase tracking-widest font-bold font-mono">
            Virtual Tour
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-text-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Cinematic Player Window */}
        <div 
          className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-surface/40 bg-zinc-950 shadow-2xl group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              {/* HTML5 Video Element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={currentItem.thumbnail}
                src={currentItem.videoUrl}
                autoPlay={isPlaying}
                muted={isMuted}
                playsInline
                onEnded={handleVideoEnded}
                aria-label={`Video tour slide: ${currentItem.title}`}
              />

              {/* Muted indicator banner */}
              {isMuted && isPlaying && (
                <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md text-white border border-white/10 text-[9px] tracking-widest font-mono font-bold px-3 py-1 rounded-full uppercase pointer-events-none shadow-sm">
                  Playing Muted
                </div>
              )}

              {/* Info Overlay (visible when paused, hovered, or always on mobile) */}
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white transition-opacity duration-300 pointer-events-none ${
                  !isPlaying || hovered ? 'opacity-100' : 'opacity-100 md:opacity-0'
                }`}
              >
                <div className="space-y-2 max-w-xl">
                  <span className="text-[10px] tracking-widest font-mono uppercase text-accent font-bold">
                    {currentItem.id.replace(/-/g, ' ')}
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold leading-tight">
                    {currentItem.title}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm font-sans leading-relaxed">
                    {currentItem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Full Screen Controls HUD Layer (Visible on Hover/Pause) */}
          <div 
            className={`absolute inset-0 flex flex-col justify-between p-6 z-10 transition-opacity duration-300 pointer-events-none ${
              !isPlaying || hovered ? 'opacity-100' : 'opacity-100 md:opacity-0'
            }`}
          >
            {/* Top Row: Details */}
            <div className="flex justify-end pointer-events-auto">
              <button 
                onClick={handleFullscreen}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 text-white shadow backdrop-blur-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label="View Video Fullscreen"
              >
                <Maximize className="h-4 w-4" />
              </button>
            </div>

            {/* Middle Row: Playback & Volume Control */}
            <div className="flex justify-center items-center gap-4 pointer-events-auto">
              <button
                onClick={togglePlay}
                className="p-4 rounded-full bg-white text-zinc-950 shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current translate-x-[1px]" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-3 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 text-white shadow backdrop-blur-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>

            {/* Bottom Row placeholder */}
            <div className="h-10" />
          </div>

          {/* Left Navigation Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/45 hover:bg-black/65 border border-white/10 text-white shadow-lg backdrop-blur-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Previous Video Slide"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/45 hover:bg-black/65 border border-white/10 text-white shadow-lg backdrop-blur-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Next Video Slide"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

        </div>

        {/* Indicators & Slides Navigation */}
        <div className="flex items-center justify-center gap-2.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-surface hover:bg-secondary'
              }`}
              aria-label={`Go to video slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
