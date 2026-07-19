'use client';

import React from 'react';

interface GalleryCardProps {
  image: string;
  title?: string;
  description?: string;
  id?: string;
  showCaptions?: boolean;
  onClick?: () => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
}

export default function GalleryCard({
  image,
  title = '',
  description = '',
  id = '',
  showCaptions = false,
  onClick,
  buttonRef,
}: GalleryCardProps) {
  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={onClick}
      aria-haspopup="dialog"
      aria-label={title ? `View full size image of ${title}` : "View full size image"}
      className="w-full flex flex-col h-[420px] sm:h-[460px] lg:h-[500px] text-left rounded-2xl overflow-hidden bg-surface/20 border border-surface/30 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-2 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer group"
    >
      {/* Image wrapper */}
      <div className="w-full flex-1 overflow-hidden relative bg-surface/10">
        <img
          src={image}
          alt={title || "Gallery image"}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
        />
      </div>

      {/* Caption details */}
      {showCaptions && (title || description || id) && (
        <div className="p-5 bg-surface/10 border-t border-surface/20 space-y-1.5 shrink-0">
          {id && (
            <span className="text-[10px] tracking-widest font-mono uppercase text-primary font-bold">
              {id.replace(/-/g, ' ')}
            </span>
          )}
          {title && (
            <h3 className="font-serif text-lg md:text-xl font-bold text-text-dark leading-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-text-light text-xs md:text-sm font-sans line-clamp-1 leading-normal">
              {description}
            </p>
          )}
        </div>
      )}
    </button>
  );
}
