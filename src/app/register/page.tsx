'use client';

import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';

const registerSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ['confirmPassword']
});

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterContent() {
  const { register: signUp } = useAuthStore();
  const { showNotification } = useUIStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/profile';
  
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    try {
      const success = await signUp(data.email, data.fullName);
      if (success) {
        showNotification(
          'Registration Successful',
          `Welcome to PawLuxury, ${data.fullName}.`,
          'success'
        );
        router.push(redirect);
      }
    } catch (err) {
      showNotification('Registration Failed', 'Verify details and try again.', 'warning');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-surface/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 bg-brand-bg p-8 border border-surface/50 rounded-lg shadow-md"
      >
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link href="/" className="font-serif text-3xl font-bold tracking-wide text-primary">
            PawLuxury
          </Link>
          <p className="text-xs text-text-light">
            Create an account to join the PawLuxury society
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="register-form">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-dark" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Alexander Sterling"
              {...register('fullName')}
              className="w-full rounded-md border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 font-semibold">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-dark" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="alex@example.com"
              {...register('email')}
              className="w-full rounded-md border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-semibold">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-dark" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register('password')}
              className="w-full rounded-md border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.password && (
              <p className="text-xs text-red-500 font-semibold">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-dark" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              {...register('confirmPassword')}
              className="w-full rounded-md border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 font-semibold">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary py-3 text-center text-sm font-semibold text-brand-bg hover:bg-primary/95 transition-all shadow flex items-center justify-center gap-2 cursor-pointer disabled:bg-primary/80 pt-2.5"
            id="register-submit-btn"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-bg border-t-transparent" />
            ) : (
              <>
                <UserPlus className="h-4.5 w-4.5" />
                Register
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-text-light pt-2 border-t border-surface/30">
          <p>
            Already have an account?{' '}
            <Link href={`/login?redirect=${redirect}`} className="text-secondary font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Register() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-surface/20">
        <div className="w-full max-w-md bg-brand-bg p-8 border border-surface/50 rounded-lg shadow-md h-[400px] flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-surface border-t-primary" />
        </div>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}

