'use client';

import { useState, useEffect } from 'react';
import { dbService } from '../../../services/dbService';
import { Consultation, ConsultationStatus } from '../../../types';
import { useUIStore } from '../../../store/uiStore';
import { X, Calendar, Stethoscope, Check, Edit3 } from 'lucide-react';

export default function AdminConsultations() {
  const { showNotification } = useUIStore();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<Consultation | null>(null);
  const [status, setStatus] = useState<ConsultationStatus>('pending');
  const [scheduledAt, setScheduledAt] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');

  useEffect(() => {
    loadConsultations();
  }, []);

  async function loadConsultations() {
    setLoading(true);
    const data = await dbService.getConsultations();
    setConsultations(data);
    setLoading(false);
  }

  const handleOpenSchedule = (cons: Consultation) => {
    setSelectedRequest(cons);
    setStatus(cons.status);
    setScheduledAt(cons.scheduledAt ? cons.scheduledAt.slice(0, 16) : '');
    setDoctorNotes(cons.doctorNotes || '');
  };

  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;
    try {
      const success = await dbService.updateConsultation(selectedRequest.id, {
        status,
        scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : null,
        doctorNotes: doctorNotes || null
      });

      if (success) {
        showNotification(
          'Scheduler Updated',
          `Diagnostics schedule for ${selectedRequest.petName} was updated.`,
          'success'
        );
        setSelectedRequest(null);
        loadConsultations();
      }
    } catch {
      showNotification('Error', 'Could not record schedule changes.', 'warning');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 font-mono">Vet Consultations Triage</h3>
        <p className="text-[11px] text-zinc-500 mt-1">Review companion symptoms, assign videocall channels, and log physician notes.</p>
      </div>

      {/* Triage grid list */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-primary" />
        </div>
      ) : consultations.length === 0 ? (
        <p className="text-zinc-500 text-xs italic text-center py-12">No vet diagnostic requests logged in triage.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-zinc-300">
          {consultations.map((cons) => (
            <div key={cons.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 flex flex-col justify-between gap-4">
              <div className="space-y-3.5">
                {/* Header */}
                <div className="flex justify-between items-start gap-2 border-b border-zinc-800 pb-2">
                  <div>
                    <h4 className="font-serif text-base font-bold text-zinc-100">{cons.petName}</h4>
                    <p className="text-[10px] text-zinc-500 font-mono">Species: {cons.petType} | Age: {cons.petAge}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                    cons.status === 'scheduled' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800' :
                    cons.status === 'pending' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    cons.status === 'completed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    'bg-zinc-800 text-zinc-500'
                  }`}>
                    {cons.status}
                  </span>
                </div>

                {/* Symptoms detail */}
                <div className="space-y-1 bg-zinc-950 p-2.5 rounded border border-zinc-850">
                  <p className="font-bold text-[9px] text-zinc-500 uppercase font-mono">Symptoms narrative</p>
                  <p className="text-[11px] text-zinc-400 line-clamp-3 leading-relaxed">{cons.symptoms}</p>
                </div>

                {/* Scheduled details */}
                {cons.scheduledAt && (
                  <p className="text-[10px] text-accent font-semibold flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Slot: {new Date(cons.scheduledAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</span>
                  </p>
                )}
              </div>

              {/* Action button */}
              <button
                onClick={() => handleOpenSchedule(cons)}
                className="w-full flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-755 border border-zinc-700 text-zinc-200 py-2 rounded transition-colors cursor-pointer"
                id={`triage-btn-${cons.id}`}
              >
                <Edit3 className="h-3.5 w-3.5" />
                Schedule & Prescribe
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Scheduler Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80">
          <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6 text-xs text-zinc-300 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h4 className="font-serif text-lg font-bold text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                <Stethoscope className="h-5 w-5 text-primary animate-pulse" />
                Schedule Vet Consultation
              </h4>
              <button
                onClick={() => setSelectedRequest(null)}
                className="rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <form onSubmit={handleSaveSchedule} className="space-y-4" id="admin-schedule-form">
              {/* Pet Details read only */}
              <div className="bg-zinc-950 p-3 rounded border border-zinc-850 space-y-1">
                <p><strong>Companion:</strong> {selectedRequest.petName} ({selectedRequest.petType})</p>
                <p><strong>Symptoms:</strong> {selectedRequest.symptoms}</p>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Triage Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ConsultationStatus)}
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none cursor-pointer"
                >
                  <option value="pending">Pending Review</option>
                  <option value="scheduled">Confirm / Reschedule Slot</option>
                  <option value="completed">Consult Completed</option>
                  <option value="cancelled">Cancel Request</option>
                </select>
              </div>

              {/* Date time picker */}
              {(status === 'scheduled' || status === 'completed') && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Videocall Appointment Time</label>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    required
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none cursor-pointer"
                  />
                </div>
              )}

              {/* Physician Notes */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Pedigree Vet Notes & Prescriptions</label>
                <textarea
                  rows={4}
                  placeholder="Detail diagnosis, advice, and list medicine wholesale items to be shipped..."
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 border-t border-zinc-800 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="rounded px-4 py-2 border border-zinc-700 text-zinc-300 hover:bg-zinc-850 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-primary text-brand-bg px-6 py-2 font-bold hover:bg-primary/95 flex items-center justify-center gap-1 cursor-pointer"
                  id="admin-schedule-submit-btn"
                >
                  <Check className="h-3.5 w-3.5 text-brand-bg" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
