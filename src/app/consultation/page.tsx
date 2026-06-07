'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Activity, Calendar, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { dbService } from '../../services/dbService';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import Link from 'next/link';

// Validation Schema using Zod
const consultationSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  petName: z.string().min(1, { message: "Companion's name is required." }),
  petType: z.string().min(1, { message: 'Please select a companion type.' }),
  petAge: z.string().min(1, { message: 'Please input pet age (e.g. 2 years, 6 months).' }),
  symptoms: z.string().min(10, { message: 'Please detail symptoms or concerns (minimum 10 characters).' }),
  preferredTimeSlot: z.string().min(1, { message: 'Please select your preferred time slot.' })
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

export default function Consultation() {
  const { user } = useAuthStore();
  const { showNotification } = useUIStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      petName: '',
      petType: 'Dog',
      petAge: '',
      symptoms: '',
      preferredTimeSlot: 'Morning (09:00 - 12:00)'
    }
  });

  const onSubmit = async (data: ConsultationFormValues) => {
    setLoading(true);
    try {
      await dbService.createConsultation({
        userId: user?.id || null,
        userEmail: data.email,
        petName: data.petName,
        petType: data.petType,
        petAge: data.petAge,
        symptoms: `${data.symptoms} (Preferred: ${data.preferredTimeSlot})`
      });

      setIsSubmitted(true);
      showNotification(
        'Consultation Requested',
        `Diagnostics query for ${data.petName} has been received.`,
        'success'
      );
      reset();
    } catch (err) {
      console.error(err);
      showNotification('Submission Error', 'Could not schedule appointment. Try again.', 'warning');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
      {/* Left Column: Context & Assurances */}
      <div className="w-full lg:w-5/12 space-y-8">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-accent">Concierge Clinic</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-dark leading-tight">
            Schedule Virtual Diagnostics
          </h1>
          <p className="text-sm text-text-light leading-relaxed">
            Our network links you to elite pediatric, dermatological, and cardiac pet specialists across India. Fill out the diagnostics questionnaire, and our apothecary director will pair you with the appropriate vet expert.
          </p>
        </div>

        {/* Assurance Cards */}
        <div className="space-y-6">
          <div className="flex gap-4 p-5 rounded-lg bg-surface/30 border border-surface/20">
            <Calendar className="h-6 w-6 text-primary shrink-0" />
            <div>
              <h3 className="font-serif text-base font-bold text-text-dark">Dynamic Time Slot Selection</h3>
              <p className="text-xs text-text-light mt-1 leading-relaxed">
                Choose comfortable slots. Appointments are structured as 45-minute video panels with follow-up prescription notes.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-lg bg-surface/30 border border-surface/20">
            <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
            <div>
              <h3 className="font-serif text-base font-bold text-text-dark">Licensed Pharmacy Integration</h3>
              <p className="text-xs text-text-light mt-1 leading-relaxed">
                Direct integration with our medicine wholesale ledger. After-consultation prescriptions are filled and shipped within 24 hours.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-lg bg-surface/30 border border-surface/20">
            <HeartHandshake className="h-6 w-6 text-primary shrink-0" />
            <div>
              <h3 className="font-serif text-base font-bold text-text-dark">Emergency Care Handshake</h3>
              <p className="text-xs text-text-light mt-1 leading-relaxed">
                If our diagnostic panel suggests critical metrics, we facilitate physical handshakes to premium veterinary hospitals in Gurugram, Delhi, and Mumbai.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Form */}
      <div className="w-full lg:w-7/12 bg-surface/20 border border-surface/30 rounded-lg p-6 sm:p-8 shadow-sm">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center space-y-6"
          >
            <div className="rounded-full bg-accent/20 p-4 text-accent">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-text-dark">Questionnaire Logged Successfully</h2>
            <p className="text-sm text-text-light max-w-md leading-relaxed">
              Thank you for trusting PawLuxury. Our veterinary director will review your companion&apos;s symptoms and call/email you within 4 hours to verify the schedule.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="rounded-full border border-surface px-6 py-2.5 text-xs font-semibold text-text-dark hover:bg-surface transition-colors cursor-pointer"
              >
                Log Another Query
              </button>
              <Link
                href="/profile"
                className="rounded-full bg-primary text-brand-bg px-6 py-2.5 text-xs font-semibold hover:bg-primary/95 transition-colors"
              >
                Track Requests
              </Link>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="consultation-booking-form">
            <h2 className="font-serif text-xl font-bold text-text-dark border-b border-surface pb-3">
              Companion Diagnostic Form
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Parent Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-dark block" htmlFor="fullName">
                  Parent Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  {...register('fullName')}
                  className="w-full rounded-md border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 font-semibold">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-dark block" htmlFor="email">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full rounded-md border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 font-semibold">{errors.email.message}</p>
                )}
              </div>

              {/* Pet Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-dark block" htmlFor="petName">
                  Companion Name
                </label>
                <input
                  type="text"
                  id="petName"
                  placeholder="e.g. Oliver"
                  {...register('petName')}
                  className="w-full rounded-md border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.petName && (
                  <p className="text-xs text-red-500 font-semibold">{errors.petName.message}</p>
                )}
              </div>

              {/* Pet Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-dark block" htmlFor="petType">
                  Companion Type
                </label>
                <select
                  id="petType"
                  {...register('petType')}
                  className="w-full rounded-md border border-surface bg-brand-bg px-3 py-2.5 text-sm text-text-dark focus:outline-none cursor-pointer"
                >
                  <option value="Dog">Canine (Dog)</option>
                  <option value="Cat">Feline (Cat)</option>
                  <option value="Avian">Avian (Bird)</option>
                  <option value="Equine">Equine (Horse)</option>
                  <option value="Other">Other</option>
                </select>
                {errors.petType && (
                  <p className="text-xs text-red-500 font-semibold">{errors.petType.message}</p>
                )}
              </div>

              {/* Pet Age */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-dark block" htmlFor="petAge">
                  Companion Age
                </label>
                <input
                  type="text"
                  id="petAge"
                  placeholder="e.g. 2 years, 6 months"
                  {...register('petAge')}
                  className="w-full rounded-md border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.petAge && (
                  <p className="text-xs text-red-500 font-semibold">{errors.petAge.message}</p>
                )}
              </div>

              {/* Preferred Slot */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-dark block" htmlFor="preferredTimeSlot">
                  Preferred Time Slot
                </label>
                <select
                  id="preferredTimeSlot"
                  {...register('preferredTimeSlot')}
                  className="w-full rounded-md border border-surface bg-brand-bg px-3 py-2.5 text-sm text-text-dark focus:outline-none cursor-pointer"
                >
                  <option value="Morning (09:00 - 12:00)">Morning (09:00 - 12:00)</option>
                  <option value="Afternoon (12:00 - 16:00)">Afternoon (12:00 - 16:00)</option>
                  <option value="Evening (16:00 - 20:00)">Evening (16:00 - 20:00)</option>
                </select>
                {errors.preferredTimeSlot && (
                  <p className="text-xs text-red-500 font-semibold">{errors.preferredTimeSlot.message}</p>
                )}
              </div>
            </div>

            {/* Symptoms */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-dark block" htmlFor="symptoms">
                Detail Symptoms & Concerns
              </label>
              <textarea
                id="symptoms"
                rows={4}
                placeholder="Explain the clinical symptoms, diet changes, energy levels, or duration of the issue..."
                {...register('symptoms')}
                className="w-full rounded-md border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.symptoms && (
                <p className="text-xs text-red-500 font-semibold">{errors.symptoms.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary py-3 text-center text-sm font-semibold text-brand-bg hover:bg-primary/95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:bg-primary/80"
              id="submit-consultation-btn"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-bg border-t-transparent" />
              ) : (
                <>
                  <Activity className="h-4.5 w-4.5" />
                  Log Diagnostic Request
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
