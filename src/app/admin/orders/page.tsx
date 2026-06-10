'use client';

import Link from 'next/link';
import { ShoppingBag, Stethoscope, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function AdminOrdersDisabled() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center text-zinc-350 space-y-8">
      {/* Icon Banner */}
      <div className="mx-auto h-16 w-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary">
        <AlertTriangle className="h-8 w-8" />
      </div>

      {/* Narrative */}
      <div className="space-y-3">
        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 font-mono">Operations Audit</span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100">Orders Ledger Disabled</h2>
        <p className="text-xs text-zinc-400 leading-relaxed">
          PawLuxury has transitioned from transactional e-commerce to a showcase pet brand and consultation portal. As a result, the e-commerce orders ledger, transaction confirmation queues, and manual payment verification flows have been completely deactivated.
        </p>
      </div>

      {/* Recommended administration routes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-6 border-t border-zinc-800">
        <Link
          href="/admin/products"
          className="flex flex-col items-center p-4 rounded bg-zinc-900/50 border border-zinc-850 hover:border-zinc-800 text-center space-y-2 group transition-all"
        >
          <ShoppingBag className="h-5 w-5 text-primary group-hover:scale-105 transition-transform" />
          <span className="font-serif text-xs font-bold text-zinc-200">Showcase Products</span>
          <span className="text-[10px] text-zinc-500">Manage catalog displays</span>
        </Link>
        
        <Link
          href="/admin/consultations"
          className="flex flex-col items-center p-4 rounded bg-zinc-900/50 border border-zinc-850 hover:border-zinc-800 text-center space-y-2 group transition-all"
        >
          <Stethoscope className="h-5 w-5 text-accent group-hover:scale-105 transition-transform" />
          <span className="font-serif text-xs font-bold text-zinc-200">Vet Consultations</span>
          <span className="text-[10px] text-zinc-500">Approve medical inquiries</span>
        </Link>
      </div>

      {/* Return button */}
      <div className="pt-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-zinc-200 transition-colors font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Overview Dashboard
        </Link>
      </div>
    </div>
  );
}
