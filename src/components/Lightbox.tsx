'use client';

import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxProps {
  isOpen: boolean;
  images: { image: string; title: string; description: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  showMetadata?: boolean;
}

export default function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  showMetadata = true,
}: LightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Capture the current active element to restore focus when closed
    const previousActiveElement = document.activeElement as HTMLElement | null;

    // Focus the modal wrapper
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
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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

  if (!isOpen || images.length === 0) return null;

  const currentItem = images[currentIndex];

  return (
    <AnimatePresence>
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Hospital Gallery Lightbox"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md select-none outline-none"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div 
          className="absolute top-0 inset-x-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Counter */}
          <span className="text-zinc-400 font-mono text-sm tracking-wider">
            {currentIndex + 1} <span className="text-zinc-600">/</span> {images.length}
          </span>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="p-3 text-zinc-300 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous Image"
          className="absolute left-6 z-10 p-4 text-zinc-300 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none cursor-pointer max-md:p-2.5 max-md:left-4"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Central Image Container */}
        <div 
          className="relative max-w-5xl max-h-[75vh] w-full px-12 md:px-24 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            key={currentItem.image}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            src={currentItem.image}
            alt={currentItem.title}
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl pointer-events-none"
          />
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next Image"
          className="absolute right-6 z-10 p-4 text-zinc-300 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none cursor-pointer max-md:p-2.5 max-md:right-4"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Bottom Metadata Info Card */}
        {showMetadata && (currentItem.title || currentItem.description) && (
          <div
            className="absolute bottom-0 inset-x-0 p-8 text-center bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={currentItem.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="max-w-xl space-y-1.5"
            >
              <h4 className="text-white text-lg md:text-xl font-bold font-serif">
                {currentItem.title}
              </h4>
              <p className="text-zinc-300 text-xs md:text-sm font-sans tracking-wide leading-relaxed">
                {currentItem.description}
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
