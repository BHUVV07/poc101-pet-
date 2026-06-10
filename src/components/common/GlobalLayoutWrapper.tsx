'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import NotificationToast from './NotificationToast';
import DemoRoleSelector from './DemoRoleSelector';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from 'react';

import QuickViewModal from '../product/QuickViewModal';

export default function GlobalLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { initialize } = useAuthStore();
  
  const isAdminRoute = pathname?.startsWith('/admin');

  useEffect(() => {
    // Initializing authentication state on client mount
    initialize();
  }, [initialize]);

  if (isAdminRoute) {
    return (
      <>
        {children}
        <NotificationToast />
        <DemoRoleSelector />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <QuickViewModal />
      <WhatsAppButton />
      <NotificationToast />
      <DemoRoleSelector />
    </>
  );
}
