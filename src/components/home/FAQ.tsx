'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const prefersReducedMotion = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    { 
      q: 'What is the Manasa Pet Ecosystem?', 
      a: 'The Manasa Pet Ecosystem is an integrated animal healthcare network in Shivamogga, Karnataka. It brings together specialized vet surgeries (Buddy & Kitty Hospital), local retail companion-care stores (Manasa Pets Mart & Pharmacies), and bulk distribution logistics (Petstep & Manasa Vet Pharma-Wholesale) into one seamless system.' 
    },
    { 
      q: 'Where is the Buddy & Kitty Pet Hospital located?', 
      a: 'The Specialty Pet Hospital is located on 100 Ft Road, near the Kariyanna Building, Shivamogga. It houses state-of-the-art diagnostic imaging, clinical laboratories, and advanced sterile surgery theatres.' 
    },
    { 
      q: 'Do you offer temperature-monitored cold-chain shipping?', 
      a: 'Yes, our logistics engine (Petstep Integrated Service Pvt. Ltd.) operates clinical-grade refrigeration storage and transport monitors (+2°C to +8°C) specifically for biologicals and critical vaccines distributed to regional clinics.' 
    },
    { 
      q: 'How do I submit or fill a prescription medicine order?', 
      a: 'You can submit your veterinarian-authorized prescription scripts directly at our retail counter desks at Garden Area or Police Chowki, or contact our pharmacy staff online to verify availability for prompt collections.' 
    },
    { 
      q: 'Are your wholesale medicines available to any partner clinic?', 
      a: 'Yes, licensed regional veterinary clinics, hospitals, and pharmacies can set up custom B2B apothecary supply terms through our wholesale division operating near Kote, Old Barline Road.' 
    }
  ];

  return (
    <section className="bg-surface/20 py-16 md:py-24 border-b border-surface/50 select-none" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 text-xs uppercase tracking-widest font-bold font-mono">
            <HelpCircle className="h-3.5 w-3.5" />
            Support
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-surface/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button 
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                  className="w-full text-left p-5 sm:p-6 font-serif text-base sm:text-lg font-bold text-text-dark flex justify-between items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-question-${idx}`}
                      initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-text-light border-t border-surface/20 pt-4 leading-relaxed font-sans">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
