'use client';

import { useState, useEffect } from 'react';
import { dbService } from '../../../services/dbService';
import { useAuthStore } from '../../../store/authStore';
import { useUIStore } from '../../../store/uiStore';
import { Settings, Save, Landmark, MessageSquare, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function SettingsAdmin() {
  const { user } = useAuthStore();
  const { showNotification } = useUIStore();

  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountName, setAccountName] = useState('');
  const [upiId, setUpiId] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      const data = await dbService.getSettings();
      setWhatsappNumber(data.whatsappNumber || '');
      setLowStockThreshold(data.lowStockThreshold || 10);
      setBankName(data.bankName || '');
      setAccountNumber(data.accountNumber || '');
      setIfscCode(data.ifscCode || '');
      setAccountName(data.accountName || '');
      setUpiId(data.upiId || '');
      setLoading(false);
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const settingsData = {
        whatsappNumber,
        lowStockThreshold,
        bankName,
        accountNumber,
        ifscCode,
        accountName,
        upiId
      };

      await dbService.saveSettings(settingsData);

      await dbService.logActivity(
        'Platform Settings Updated',
        'settings',
        `Adjusted commerce parameters and set low stock warning threshold to ${lowStockThreshold} units.`,
        user?.id
      );

      showNotification('Settings Saved', 'Business coordinates successfully updated in database.', 'success');
    } catch (err) {
      console.error(err);
      showNotification('Error', 'Could not save configurations.', 'warning');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 text-zinc-100">
      <form onSubmit={handleSave} className="space-y-8 text-xs">
        
        {/* Section 1: Low Stock warning settings */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-6">
          <h2 className="font-serif text-lg font-bold text-zinc-200 border-b border-zinc-800 pb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Inventory Threshold Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400">Low Stock Limit Alert Warning</label>
              <input
                type="number"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(parseInt(e.target.value) || 0)}
                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-100 font-mono text-sm font-bold focus:outline-none"
                required
              />
              <p className="text-[9px] text-zinc-500 leading-normal">
                Visual stock warning indicators trigger in the Inventory panel when stock reaches or drops below this quantity.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: WhatsApp Settings */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-6">
          <h2 className="font-serif text-lg font-bold text-zinc-200 border-b border-zinc-800 pb-3 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            WhatsApp Commerce Redirect Coordinates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400">WhatsApp Commerce Support Phone Number</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="e.g. +919876543210"
                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-100 font-mono text-sm font-bold focus:outline-none"
                required
              />
              <p className="text-[9px] text-zinc-500 leading-normal">
                Input the phone number in country code format (e.g. +91...) for WhatsApp quick consultation chat redirecting.
              </p>
            </div>
          </div>
        </div>

        {/* Form control actions */}
        <div className="flex gap-4 items-center">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 px-6 py-3 bg-primary hover:bg-primary/95 text-brand-bg rounded font-semibold uppercase tracking-wider cursor-pointer"
          >
            <Save className="h-4.5 w-4.5" />
            {saving ? 'Saving...' : 'Save Configuration'}
          </button>

          <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px]">
            <ShieldCheck className="h-4 w-4 text-accent" />
            Updates immediately populate branch coordinates and WhatsApp concierge details.
          </div>
        </div>

      </form>
    </div>
  );
}
