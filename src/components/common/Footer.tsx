'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';
import { companyDetails } from '../../data/company';

export default function Footer() {
  const divisions = [
    { name: 'Manasa Vet Pharma', href: '/divisions/garden-area' },
    { name: 'Manasa Pets Mart', href: '/divisions/police-chowki' },
    { name: 'Buddy & Kitty Hospital', href: '/divisions/buddy-kitty' },
    { name: 'Manasa Vet Pharma-Wholesale', href: '/divisions/wholesale' }
  ];

  const infoLinks = [
    { name: 'Services Directory', href: '/services' },
    { name: 'Products Available', href: '/products' },
    { name: 'Editorial Blog', href: '/blog' },
    { name: 'About Our Ecosystem', href: '/about' }
  ];

  return (
    <footer className="bg-surface/80 border-t border-surface/40 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-surface pb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="group flex items-center gap-1.5">
              <span className="font-serif text-2xl font-bold tracking-wide text-primary">
                {companyDetails.name}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </Link>
            <p className="text-text-light text-sm max-w-sm leading-relaxed">
              {companyDetails.aboutOverview}
            </p>
          </div>

          {/* Column 1: Divisions */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-primary mb-4 font-mono">Our Divisions</h4>
            <ul className="space-y-2.5 text-sm text-text-light">
              {divisions.map((div, i) => (
                <li key={i}>
                  <Link href={div.href} className="hover:text-primary transition-colors">
                    {div.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Ecosystem Links & Contact */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-primary mb-4 font-mono">Ecosystem</h4>
              <ul className="space-y-2.5 text-sm text-text-light">
                {infoLinks.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-surface/40 pt-4 space-y-3 text-xs text-text-light">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="font-mono">{companyDetails.globalEmail}</span>
              </div>
              <div className="flex items-center gap-4 pt-1">
                <a href="#" aria-label="Instagram" className="text-text-light hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className="text-text-light hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-light">
          <div>
            © {new Date().getFullYear()} {companyDetails.name}. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <span className="text-[10px] uppercase font-mono text-text-light/50">Shivamogga Clinical Network</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
