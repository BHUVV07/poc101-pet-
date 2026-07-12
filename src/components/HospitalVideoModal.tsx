'use client';

import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoItem } from '../data/buddyKittyVideos';

interface HospitalVideoModalProps {
  isOpen: boolean;
  videos: VideoItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function HospitalVideoModal({
  isOpen,
  videos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: HospitalVideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Capture the active element to restore focus when closing
    const previousActiveElement = document.activeElement as HTMLElement | null;

    if (modalRef.current) {
      modalRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        onPrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        onNext();
        return;
      }
      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, video, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose, onPrev, onNext]);

  // If a video changes, we make sure it is paused before unmounting/changing source
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Forces reload of new metadata/source
    }
  }, [currentIndex]);

  if (!isOpen || videos.length === 0) return null;

  const currentVideo = videos[currentIndex];

  return (
    <AnimatePresence>
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Hospital Video Tour Modal"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md select-none outline-none"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div
          className="absolute top-0 inset-x-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Running Video Counter */}
          <span className="text-zinc-400 font-mono text-sm tracking-wider font-semibold">
            {currentIndex + 1} <span className="text-zinc-600">/</span> {videos.length}
          </span>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Video Player"
            className="p-3 text-zinc-300 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Previous Navigation Button (Desktop) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous Video"
          className="absolute left-6 z-10 p-4 text-zinc-300 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none cursor-pointer max-md:p-2.5 max-md:left-4"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Central Responsive Player Container */}
        <div
          className="relative max-w-5xl max-h-[75vh] w-full px-12 md:px-24 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HTML5 Native Video Player: Loaded only when modal is open, with preload="none" */}
          <video
            ref={videoRef}
            src={currentVideo.video}
            poster={currentVideo.thumbnail}
            controls
            preload="none"
            playsInline
            className="w-full max-h-[70vh] rounded-lg shadow-2xl bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            aria-label={`Walkthrough video of ${currentVideo.title}`}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Next Navigation Button (Desktop) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next Video"
          className="absolute right-6 z-10 p-4 text-zinc-300 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none cursor-pointer max-md:p-2.5 max-md:right-4"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Bottom Details Overlay */}
        <div
          className="absolute bottom-0 inset-x-0 p-8 text-center bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={currentVideo.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="max-w-xl space-y-1.5"
          >
            <span className="text-[10px] tracking-widest font-mono uppercase text-secondary font-bold">
              {currentVideo.duration ? `Duration: ${currentVideo.duration}` : 'Guided Walkthrough'}
            </span>
            <h4 className="text-white text-lg md:text-xl font-bold font-serif">
              {currentVideo.title}
            </h4>
            <p className="text-zinc-300 text-xs md:text-sm font-sans tracking-wide leading-relaxed">
              {currentVideo.description}
            </p>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
