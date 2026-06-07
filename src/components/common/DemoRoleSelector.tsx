'use client';

import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { UserCheck, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DemoRoleSelector() {
  const { user, setDemoRole } = useAuthStore();
  const { showNotification } = useUIStore();
  const router = useRouter();

  if (!user) return null;

  const toggleRole = () => {
    const nextRole = user.role === 'customer' ? 'admin' : 'customer';
    setDemoRole(nextRole);
    showNotification(
      'Demo Role Changed',
      `You are now viewing PawLuxury as a ${nextRole.toUpperCase()}.`,
      'info'
    );
    if (nextRole === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={toggleRole}
        className="flex items-center gap-2 rounded-full border border-surface bg-brand-bg px-4 py-2.5 text-xs font-semibold text-text-dark shadow-lg hover:bg-surface hover:text-primary transition-all duration-300 cursor-pointer"
        title="Toggle Demo Mode Roles"
        id="demo-role-selector-btn"
      >
        {user.role === 'admin' ? (
          <>
            <ShieldAlert className="h-4 w-4 text-primary animate-pulse" />
            <span>Role: Admin Dashboard</span>
          </>
        ) : (
          <>
            <UserCheck className="h-4 w-4 text-accent" />
            <span>Role: Customer View</span>
          </>
        )}
      </button>
    </div>
  );
}
