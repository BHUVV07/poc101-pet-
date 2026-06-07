'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export default function NotificationToast() {
  const { notificationMessage, clearNotification } = useUIStore();

  return (
    <div className="fixed top-6 right-6 z-50 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {notificationMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="pointer-events-auto flex w-full items-start gap-4 rounded-lg bg-brand-bg border border-surface p-4 shadow-xl"
          >
            {/* Status Icons */}
            <div className="shrink-0">
              {notificationMessage.type === 'success' && (
                <CheckCircle2 className="h-6 w-6 text-accent" />
              )}
              {notificationMessage.type === 'warning' && (
                <AlertCircle className="h-6 w-6 text-amber-500" />
              )}
              {notificationMessage.type === 'info' && (
                <Info className="h-6 w-6 text-secondary" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1">
              <h5 className="font-serif text-sm font-semibold text-text-dark">
                {notificationMessage.title}
              </h5>
              <p className="text-xs text-text-light leading-relaxed">
                {notificationMessage.message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={clearNotification}
              className="rounded-full p-0.5 text-text-light hover:bg-surface hover:text-text-dark transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
