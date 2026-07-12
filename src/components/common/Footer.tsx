'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { companyDetails } from '../../data/company';

export default function Footer() {
  const divisions = [
    { name: 'Manasa Vet Pharma', href: '/divisions/garden-area' },
    { name: 'Manasa Pets Mart', href: '/divisions/police-chowki' },
    { name: 'Buddy & Kitty Hospital', href: '/divisions/buddy-kitty' },
    { name: 'B2B Apothecary Wholesale', href: '/divisions/wholesale' },
    { name: 'Petstep Logistics Network', href: '/divisions/petstep' }
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
            
            <div className="border-t border-surface/40 pt-4 space-y-2 text-xs text-text-light">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>{companyDetails.headquarters}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span className="font-mono">{companyDetails.globalPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="font-mono">{companyDetails.globalEmail}</span>
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
