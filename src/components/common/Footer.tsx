'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-surface/80 border-t border-surface/40 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-surface pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="group flex items-center gap-1.5">
              <span className="font-serif text-2xl font-bold tracking-wide text-primary">
                PawLuxury
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </Link>
            <p className="text-text-light text-sm max-w-sm leading-relaxed">
              A premium national digital pet brand blending world-class veterinary consultation, bespoke lifestyle products, and elite nutritional science.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-full bg-brand-bg flex items-center justify-center text-primary hover:bg-primary hover:text-brand-bg transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-full bg-brand-bg flex items-center justify-center text-primary hover:bg-primary hover:text-brand-bg transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-primary mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm text-text-light">
              <li>
                <Link href="/shop?category=gourmet-dining" className="hover:text-primary transition-colors">
                  Gourmet Dining
                </Link>
              </li>
              <li>
                <Link href="/shop?category=haute-couture" className="hover:text-primary transition-colors">
                  Haute Couture
                </Link>
              </li>
              <li>
                <Link href="/shop?category=living-comfort" className="hover:text-primary transition-colors">
                  Living & Comfort
                </Link>
              </li>
              <li>
                <Link href="/shop?category=wellness-care" className="hover:text-primary transition-colors">
                  Wellness & Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Ecosystem */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-primary mb-4">Ecosystem</h4>
            <ul className="space-y-2.5 text-sm text-text-light">
              <li>
                <Link href="/consultation" className="hover:text-primary transition-colors">
                  Vet Consultations
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Editorial Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="hover:text-primary transition-colors">
                  Pharmacy Wholesale
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-primary mb-4 font-mono">Our Network</h4>
            <ul className="space-y-3.5 text-xs text-text-light leading-relaxed">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Buddy & Kitty Hospital:</strong><br/>
                  100 Ft Road, Shivamogga, KA
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Retail Storefronts:</strong><br/>
                  Garden Area & Police Chowki
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Wholesale & B2B:</strong><br/>
                  Kote & Petstep (GSKM Road)
                </span>
              </li>
              <li className="flex items-center gap-2 pt-2 border-t border-surface/30">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span className="font-mono">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="font-mono">concierge@pawluxury.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-light">
          <div>
            © {new Date().getFullYear()} PawLuxury Private Limited. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
