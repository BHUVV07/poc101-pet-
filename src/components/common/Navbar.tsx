'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ];

  const divisions = [
    { id: 'garden-area', name: 'Manasa Vet Pharma', href: '/divisions/garden-area' },
    { id: 'police-chowki', name: 'Manasa Pets Mart', href: '/divisions/police-chowki' },
    { id: 'buddy-kitty', name: 'Buddy & Kitty', href: '/divisions/buddy-kitty' },
    { id: 'wholesale', name: 'Manasa Vet Pharma – Wholesale', href: '/divisions/wholesale' }
  ];

  // Derive the active branch from the URL slug dynamically to support static compilation
  const activeBranchId = pathname?.startsWith('/divisions/') 
    ? pathname.split('/')[2] 
    : '';

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-brand-bg/85 backdrop-blur-md border-b border-surface/50 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        {/* Top Division Selector Bar (Redesigned Ecosystem Switcher) */}
        <div className="bg-[#2F241E] text-white/80 py-4 border-b border-white/5 relative z-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-3">
            {/* Ecosystem Header */}
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-secondary font-mono leading-none select-none text-center">
              Manasa Vet Ecosystem
            </span>
            
            {/* Scrollable container for dynamic island pills */}
            <div className="w-full overflow-x-auto no-scrollbar flex justify-start md:justify-center">
              <div className="flex gap-5 px-2 py-1 mx-auto min-w-max items-center justify-center">
                {divisions.map((div) => {
                  const isSelected = activeBranchId === div.id;
                  return (
                    <Link
                      key={div.id}
                      href={div.href}
                      className={`relative px-6 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 select-none cursor-pointer flex items-center justify-center min-h-[40px] ${
                        isSelected 
                          ? 'bg-primary text-white shadow-md shadow-primary/30 scale-[1.02] border border-primary' 
                          : 'bg-white/5 border border-white/10 hover:border-white/25 text-white/80 hover:text-white hover:scale-[1.03] hover:bg-white/10 hover:shadow-md'
                      } backdrop-blur-md`}
                      style={{ transitionDuration: '300ms' }}
                    >
                      {div.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-primary">
                  Manasa Vet Pharma
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative py-2 text-sm font-medium transition-colors text-text-dark/80 hover:text-primary"
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full p-2 text-text-dark/80 transition-colors hover:bg-surface hover:text-primary cursor-pointer"
                id="navbar-mobile-toggle"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-3/4 max-w-sm bg-brand-bg shadow-2xl p-6 flex flex-col justify-between md:hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-serif text-xl font-bold text-primary">Manasa Vet Pharma</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full hover:bg-surface text-text-dark"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile switch division */}
                <div className="mb-6 border-b border-surface pb-6">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-3">Switch Division</span>
                  <div className="flex flex-col space-y-2">
                    {divisions.map((div) => {
                      const isSelected = activeBranchId === div.id;
                      return (
                        <Link
                          key={div.id}
                          href={div.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`w-full text-left py-2 px-3 rounded text-xs flex items-center gap-2 transition-all ${
                            isSelected ? 'bg-primary text-brand-bg font-bold' : 'hover:bg-surface text-text-dark'
                          }`}
                        >
                          {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-brand-bg shrink-0" />}
                          <span>{div.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-base font-medium transition-colors ${
                        pathname === link.href ? 'text-primary border-l-2 border-primary pl-2' : 'text-text-dark/80 hover:text-primary'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Mobile Drawer Bottom Info */}
              <div className="border-t border-surface pt-6 space-y-4">
                <div className="text-center text-xs text-text-light leading-normal">
                  © {new Date().getFullYear()} Manasa Vet Pharma. All Rights Reserved.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
