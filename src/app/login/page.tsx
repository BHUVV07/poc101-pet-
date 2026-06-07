'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, LogIn } from 'lucide-react';
import { Suspense } from 'react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' })
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginContent() {
  const { login } = useAuthStore();
  const { showNotification } = useUIStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/profile';
  
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const success = await login(data.email, data.email.split('@')[0]);
      if (success) {
        showNotification(
          'Login Successful',
          `Welcome to PawLuxury, ${data.email.split('@')[0]}.`,
          'success'
        );
        // If the email includes 'admin', we are logged in as admin
        if (data.email.toLowerCase().includes('admin')) {
          router.push('/admin');
        } else {
          router.push(redirect);
        }
      }
    } catch (err) {
      showNotification('Login Failed', 'Verify credentials and try again.', 'warning');
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
            Enter your credentials to access your luxury account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="login-form">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-dark" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="customer@pawluxury.com or admin@pawluxury.com"
              {...register('email')}
              className="w-full rounded-md border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-semibold">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary py-3 text-center text-sm font-semibold text-brand-bg hover:bg-primary/95 transition-all shadow flex items-center justify-center gap-2 cursor-pointer disabled:bg-primary/80"
            id="login-submit-btn"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-bg border-t-transparent" />
            ) : (
              <>
                <LogIn className="h-4.5 w-4.5" />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-text-light space-y-3 pt-2 border-t border-surface/30">
          <p>
            Don&apos;t have an account?{' '}
            <Link href={`/register?redirect=${redirect}`} className="text-secondary font-semibold hover:underline">
              Create Account
            </Link>
          </p>
          <div className="flex justify-center items-center gap-1.5 bg-surface/30 p-2.5 rounded text-left leading-normal text-[10px]">
            <ShieldCheck className="h-4.5 w-4.5 text-primary shrink-0" />
            <span>
              <strong>Demo Hint:</strong> Use <code>admin@pawluxury.com</code> (any password) to access the Admin Panel, or any other email for Customer view.
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="flex-grow flex items-center justify-center bg-surface/20 min-h-[400px]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-surface border-t-primary" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
