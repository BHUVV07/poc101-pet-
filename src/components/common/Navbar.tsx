'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, User, Menu, X, Search, Activity } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';

export default function Navbar() {
  const pathname = usePathname();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user, initialize } = useAuthStore();
  const { setCartOpen } = useUIStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    initialize();

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialize]);

  const navLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'Vet Consultation', href: '/consultation' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ];

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-brand-bg/85 backdrop-blur-md border-b border-surface/50 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-primary">
                  PawLuxury
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

            {/* Right Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Profile Link based on role */}
              {user ? (
                <Link
                  href={user.role === 'admin' ? '/admin' : '/profile'}
                  className="rounded-full p-2 text-text-dark/80 transition-colors hover:bg-surface hover:text-primary relative group"
                  title={user.role === 'admin' ? 'Admin Dashboard' : 'Profile'}
                  id="navbar-profile-btn"
                >
                  <User className="h-5 w-5" />
                  {user.role === 'admin' && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                    </span>
                  )}
                  {/* Subtle hover tooltip showing role */}
                  <span className="absolute top-10 right-0 hidden group-hover:block bg-text-dark text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap">
                    {user.role === 'admin' ? 'Admin Access' : `Hi, ${user.fullName?.split(' ')[0]}`}
                  </span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="rounded-full p-2 text-text-dark/80 transition-colors hover:bg-surface hover:text-primary"
                  title="Sign In"
                >
                  <User className="h-5 w-5" />
                </Link>
              )}

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="rounded-full p-2 text-text-dark/80 transition-colors hover:bg-surface hover:text-primary relative"
                title="Wishlist"
                id="navbar-wishlist-btn"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-brand-bg">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart Toggle Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="rounded-full p-2 text-text-dark/80 transition-colors hover:bg-surface hover:text-primary relative cursor-pointer"
                title="Cart"
                id="navbar-cart-btn"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-brand-bg">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full p-2 text-text-dark/80 transition-colors hover:bg-surface hover:text-primary md:hidden cursor-pointer"
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
                  <span className="font-serif text-2xl font-bold text-primary">PawLuxury</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full hover:bg-surface text-text-dark"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <nav className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-colors ${
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
                {user ? (
                  <div className="flex items-center gap-3">
                    {user.avatarUrl && (
                      <img src={user.avatarUrl} alt="Avatar" className="h-10 w-10 rounded-full" />
                    )}
                    <div>
                      <p className="font-medium text-sm text-text-dark">{user.fullName}</p>
                      <Link
                        href={user.role === 'admin' ? '/admin' : '/profile'}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs text-secondary hover:underline"
                      >
                        {user.role === 'admin' ? 'Go to Admin Dashboard' : 'Manage Account'}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-md bg-primary py-2.5 text-sm font-semibold text-brand-bg hover:bg-primary/95 transition-colors"
                  >
                    Sign In
                  </Link>
                )}
                <div className="text-center text-xs text-text-light">
                  © {new Date().getFullYear()} PawLuxury. Premium Lifestyle.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
