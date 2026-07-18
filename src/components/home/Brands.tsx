'use client';

export default function Brands() {
  const partners = [
    { name: 'Zoetis', subtext: 'Animal Health' },
    { name: 'MSD Animal Health', subtext: 'Pharma & Biologicals' },
    { name: 'Boehringer Ingelheim', subtext: 'Clinical Diagnostics' },
    { name: 'Virbac', subtext: 'Specialty Apothecary' },
    { name: 'Intas Pharmaceuticals', subtext: 'Veterinary Solutions' },
    { name: 'Royal Canin', subtext: 'Prescription Diets' },
  ];

  // Double the array to make the infinite marquee seamless
  const doubledPartners = [...partners, ...partners];

  return (
    <section className="w-full py-14 bg-brand-bg border-b border-surface/50 relative overflow-hidden select-none" id="brands">
      
      {/* Scope styles for the infinite marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Gradient overlays to fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-0">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-text-light">
            Authorized Distribution & Hospital Use
          </span>
          <h2 className="font-serif text-base sm:text-lg font-bold text-text-dark mt-1">
            Partnered Veterinary Laboratories & Brands
          </h2>
        </div>

        {/* Marquee Container */}
        <div className="w-full overflow-hidden py-3">
          <div className="marquee-track gap-6">
            {doubledPartners.map((brand, idx) => (
              <div 
                key={idx}
                className="w-48 sm:w-56 p-5 rounded-2xl bg-white border border-surface/40 flex flex-col items-center justify-center text-center shadow-sm hover:border-primary/20 transition-all duration-300"
              >
                <span className="font-serif text-sm sm:text-base font-bold text-text-dark tracking-wide">
                  {brand.name}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-text-light mt-1">
                  {brand.subtext}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
