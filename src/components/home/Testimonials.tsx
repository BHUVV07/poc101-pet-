'use client';

import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, User, CheckCircle2, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface Review {
  id: string;
  name: string;
  isLocalGuide?: boolean;
  reviewsCount?: number;
  photosCount?: number;
  time: string;
  rating: number;
  text: string;
  ownerResponse?: string;
}

const homeReviews: Review[] = [
  {
    id: "review-1",
    name: "Siddharth Mehta",
    isLocalGuide: true,
    reviewsCount: 12,
    photosCount: 8,
    time: "2 months ago",
    rating: 5,
    text: "The prescription diets and veterinary medicine supplied by Manasa Vet Pharma helped my Golden Retriever recover swiftly from chronic gastritis. Service is prompt and professional.",
    ownerResponse: "Thank you for sharing your experience! We're glad to hear Oliver is doing well."
  },
  {
    id: "review-2",
    name: "Dr. Ananya Sen, DVM",
    reviewsCount: 6,
    time: "3 weeks ago",
    rating: 5,
    text: "We rely on Manasa Vet Pharma B2B wholesale distribution for our clinic's critical vaccines. Their cold-chain maintenance and inventory reliability are unmatched.",
    ownerResponse: "Thank you Dr. Ananya! We are proud to support your clinic's vaccine and medical supply operations."
  },
  {
    id: "review-3",
    name: "Rohan Malhotra",
    reviewsCount: 3,
    time: "1 month ago",
    rating: 5,
    text: "The staff at Buddy & Kitty Hospital during consultation were highly knowledgeable, giving clear instructions on treatment plans. Absolutely invaluable local platform.",
    ownerResponse: "We appreciate your kind words, Rohan! Best wishes to Rocky."
  }
];

export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto slide every 6 seconds
  useEffect(() => {
    if (isPaused) {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      return;
    }
    autoplayTimer.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % homeReviews.length);
      setExpanded(false);
    }, 6000);

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? homeReviews.length - 1 : prev - 1));
    setExpanded(false);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % homeReviews.length);
    setExpanded(false);
  };

  const currentReview = homeReviews[activeIndex];

  const slideVariants = prefersReducedMotion
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: { opacity: 0, scale: 0.96, y: 10 },
        center: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } },
        exit: { opacity: 0, scale: 0.96, y: -10, transition: { duration: 0.2 } }
      };

  return (
    <section 
      className="w-full py-16 md:py-24 border-b border-surface/50 bg-brand-bg select-none"
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary px-4 py-1.5 text-xs uppercase tracking-widest font-bold font-mono">
            Verified Reviews
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight leading-tight">
            Clinical Success Stories
          </h2>
          <p className="text-sm sm:text-base text-text-light leading-relaxed">
            Real experiences shared by pet parents and veterinary professionals who trust the Manasa Vet Ecosystem.
          </p>

          {/* Rating Summary Enhancements */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="flex text-amber-500 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-text-dark font-sans">4.8 Rating</span>
            <span className="text-zinc-300">|</span>
            <a 
              href="https://maps.app.goo.gl/ihVptYba5dXe4c128" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-bold text-primary hover:underline"
            >
              189+ Google Reviews
            </a>
          </div>
        </div>

        {/* Carousel Card Container */}
        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full bg-white border border-surface/40 rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col justify-between space-y-6"
            >
              {/* Top Row: User details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-sans text-sm sm:text-base font-bold text-text-dark leading-tight">
                        {currentReview.name}
                      </h4>
                      {currentReview.isLocalGuide && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-[9px] font-bold text-amber-600 border border-amber-500/20 font-mono">
                          Local Guide
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-text-light font-medium mt-0.5 flex flex-wrap gap-x-2 gap-y-0.5">
                      {currentReview.reviewsCount && <span>{currentReview.reviewsCount} reviews</span>}
                      {currentReview.photosCount && (
                        <>
                          <span className="text-zinc-300">•</span>
                          <span>{currentReview.photosCount} photos</span>
                        </>
                      )}
                      <span className="text-zinc-300">•</span>
                      <span>{currentReview.time}</span>
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1.5 sm:self-start">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded bg-[#F8F9FA] px-2 py-0.5 text-[9px] font-bold text-[#5F6368] border border-[#DADCE0]">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    Verified
                  </span>
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-4">
                <div className="text-xs sm:text-sm text-text-dark font-sans leading-relaxed whitespace-pre-line">
                  {expanded || currentReview.text.length <= 250 ? (
                    currentReview.text
                  ) : (
                    <>
                      {currentReview.text.slice(0, 250)}...
                      <button 
                        onClick={() => setExpanded(true)}
                        className="text-primary font-bold ml-1.5 inline-flex items-center gap-0.5 hover:underline focus:outline-none"
                      >
                        Read More <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                  {expanded && currentReview.text.length > 250 && (
                    <button 
                      onClick={() => setExpanded(false)}
                      className="text-primary font-bold ml-1.5 inline-flex items-center gap-0.5 hover:underline focus:outline-none"
                    >
                      Show Less <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Owner Response */}
                {currentReview.ownerResponse && (
                  <div className="border-t border-surface/50 pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-primary">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Response from the owner
                    </div>
                    <p className="text-xs text-text-light italic leading-relaxed pl-5 border-l-2 border-primary/30">
                      &ldquo;{currentReview.ownerResponse}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Row Google Review Badge */}
              <div className="flex justify-between items-center border-t border-surface/30 pt-4">
                <div className="flex items-center gap-1">
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.48 3.77v3.13h4.01c2.34-2.16 3.69-5.32 3.69-8.75z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-4.01-3.13c-1.12.75-2.55 1.2-3.92 1.2-3.02 0-5.57-2.04-6.49-4.77H1.31v3.24A12 12 0 0 0 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.51 14.39a7.2 7.2 0 0 1 0-4.58V6.57H1.31a12 12 0 0 0 0 10.86l4.2-3.04z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.31 6.57l4.2 3.24c.92-2.73 3.47-4.77 6.49-4.77z"
                    />
                  </svg>
                  <span className="text-[10px] font-sans font-extrabold text-[#5F6368] tracking-wide uppercase">
                    Google Review
                  </span>
                </div>
                <span className="text-[10px] text-text-light font-mono">
                  Review #{activeIndex + 1}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-between">
          {/* Pagination dots */}
          <div className="flex gap-2">
            {homeReviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-surface hover:bg-secondary'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2.5">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white hover:bg-surface/30 border border-surface text-text-dark hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-white hover:bg-surface/30 border border-surface text-text-dark hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Next review"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* View All Google Reviews Button */}
        <div className="text-center pt-4">
          <a
            href="https://maps.app.goo.gl/ihVptYba5dXe4c128"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-surface/20 border border-surface text-text-dark py-3 px-6 text-xs font-semibold shadow-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.48 3.77v3.13h4.01c2.34-2.16 3.69-5.32 3.69-8.75z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-4.01-3.13c-1.12.75-2.55 1.2-3.92 1.2-3.02 0-5.57-2.04-6.49-4.77H1.31v3.24A12 12 0 0 0 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.51 14.39a7.2 7.2 0 0 1 0-4.58V6.57H1.31a12 12 0 0 0 0 10.86l4.2-3.04z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.31 6.57l4.2 3.24c.92-2.73 3.47-4.77 6.49-4.77z"
              />
            </svg>
            View All Google Reviews
          </a>
        </div>

      </div>
    </section>
  );
}
