'use client';

import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { UserCheck, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserRole } from '../../types';

export default function DemoRoleSelector() {
  const { user, setDemoRole } = useAuthStore();
  const { showNotification } = useUIStore();
  const router = useRouter();

  if (!user) return null;

  const toggleRole = () => {
    const roles: UserRole[] = [
      'customer',
      'admin',
      'manager_garden_area',
      'manager_police_chowki',
      'manager_hospital',
      'manager_wholesale',
      'manager_petstep'
    ];
    const currentIndex = roles.indexOf(user.role);
    const nextIndex = (currentIndex + 1) % roles.length;
    const nextRole = roles[nextIndex];

    setDemoRole(nextRole);
    showNotification(
      'Demo Role Changed',
      `You are now viewing PawLuxury as ${nextRole.replace('manager_', 'Manager: ').replace(/_/g, ' ').toUpperCase()}.`,
      'info'
    );

    if (nextRole === 'customer') {
      router.push('/');
    } else {
      router.push('/admin');
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
            <span>Role: Super Admin</span>
          </>
        ) : user.role.startsWith('manager_') ? (
          <>
            <ShieldAlert className="h-4 w-4 text-secondary animate-pulse" />
            <span>Role: {user.role.replace('manager_', 'Mgr: ').replace(/_/g, ' ').toUpperCase()}</span>
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
