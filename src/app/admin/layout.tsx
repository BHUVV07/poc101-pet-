'use client';

import { useAuthStore } from '../../store/authStore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingBag, FolderTree, ShoppingCart, 
  Stethoscope, FileText, ArrowLeft, Loader2, ShieldCheck,
  Users, Boxes, Image, PenTool, ClipboardList, Settings
} from 'lucide-react';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      // In the real app, we restrict this. For easy demo, we can redirect or show warning.
      // Let's let them access but they will see a notification or we can redirect to login.
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-900 text-zinc-100">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Auditing Ledger...</span>
        </div>
      </div>
    );
  }

  // Admin access warning fallback
  const isNotAdmin = !user || (user.role !== 'admin' && !user.role.startsWith('manager_'));

  const menuItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Vet Consultations', href: '/admin/consultations', icon: Stethoscope },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Inventory Stock', href: '/admin/inventory', icon: Boxes },
    { name: 'Banners Manager', href: '/admin/banners', icon: Image },
    { name: 'Blog Manager', href: '/admin/blogs', icon: PenTool },
    { name: 'Activity Logs', href: '/admin/activity-logs', icon: ClipboardList },
    { name: 'Settings Panel', href: '/admin/settings', icon: Settings },
  ];

  const filteredMenuItems = user?.role === 'admin'
    ? menuItems
    : menuItems.filter(item => {
        const restricted = ['Banners Manager', 'Blog Manager', 'Settings Panel', 'Activity Logs', 'Categories'];
        if (item.name === 'Vet Consultations' && user?.role !== 'manager_hospital') {
          return false;
        }
        return !restricted.includes(item.name);
      });

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans overflow-hidden">
      {/* 1. SIDEBAR */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 flex flex-col justify-between shrink-0">
        <div className="flex-grow overflow-y-auto">
          {/* Logo */}
          <div className="h-20 border-b border-zinc-800 flex items-center px-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold tracking-wide text-zinc-50">PawLuxury</span>
              <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-primary text-brand-bg tracking-wider font-mono">
                Admin
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {filteredMenuItems.map((item) => {
              const isActive = item.href === '/admin' ? pathname === '/admin' : pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors ${
                    isActive 
                      ? 'bg-primary text-brand-bg' 
                      : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Back to Client Storefront */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/80">
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded border border-zinc-700 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Client Shop
          </Link>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className="flex-grow flex flex-col overflow-hidden bg-zinc-950">
        {/* Workspace Header */}
        <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-8 bg-zinc-900/30">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            {filteredMenuItems.find(m => m.href === pathname)?.name || 'Admin Workspace'}
          </h2>
          
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500 font-mono">
              System Date: 31 May 2026
            </span>
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
                {user?.fullName?.charAt(0) || 'A'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-zinc-200">{user?.fullName || 'Platform Director'}</p>
                <p className="text-[10px] text-zinc-500 font-mono">Role: {user?.role || 'Guest'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {isNotAdmin ? (
            <div className="absolute inset-0 z-30 bg-zinc-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center space-y-4">
              <ShieldCheck className="h-12 w-12 text-primary animate-pulse" />
              <h2 className="font-serif text-2xl font-bold text-zinc-100">Access Restricted</h2>
              <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
                You are currently logged in as a <strong>CUSTOMER</strong>. Please use the floating <strong>Demo Role Selector</strong> button in the bottom-left corner to toggle your active session to <strong>ADMIN</strong> or one of the <strong>BRANCH MANAGER</strong> roles.
              </p>
            </div>
          ) : null}
          {children}
        </main>
      </div>
    </div>
  );
}
