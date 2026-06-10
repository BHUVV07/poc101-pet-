'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../../store/authStore';
import { dbService } from '../../services/dbService';
import { Order, Consultation, Address } from '../../types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  User, ShoppingBag, Calendar, MapPin, LogOut, ChevronDown, ChevronUp, Check, 
  Clock, CheckCircle2, Truck, Gift, ClipboardList, ShieldAlert, Plus 
} from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

// Address Validator
const addressSchema = z.object({
  fullName: z.string().min(3, { message: 'Receiver name is required (min 3).' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  addressLine1: z.string().min(5, { message: 'Address line 1 is required.' }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: 'City is required.' }),
  state: z.string().min(2, { message: 'State is required.' }),
  postalCode: z.string().min(6, { message: 'Enter a valid 6-digit postal code.' }),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function Profile() {
  const { user, logout, isLoading } = useAuthStore();
  const { showNotification } = useUIStore();
  const router = useRouter();

  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [activeTab, setActiveTab] = useState('consultations');
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Address form Setup
  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    formState: { errors: addressErrors },
    reset: resetAddress
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema)
  });

  const loadUserData = useCallback(async () => {
    if (!user) return;
    const cons = await dbService.getConsultations(user.id);
    setConsultations(cons);

    const addrs = await dbService.getAddresses(user.id);
    setAddresses(addrs);
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?redirect=/profile');
      return;
    }

    if (user) {
      const timer = setTimeout(() => {
        loadUserData();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [user, isLoading, router, loadUserData]);

  const handleSignOut = async () => {
    await logout();
    showNotification('Logged Out', 'You have been signed out of your account.', 'info');
    router.push('/');
  };

  const handleAddAddress = async (data: AddressFormValues) => {
    if (!user) return;
    try {
      await dbService.createAddress({
        userId: user.id,
        fullName: data.fullName,
        phone: data.phone,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 || '',
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: 'India',
        isDefault: addresses.length === 0 // Make default if it's the first address
      });
      showNotification('Address Saved', 'Your new delivery address has been recorded.', 'success');
      resetAddress();
      setShowAddressForm(false);
      // reload
      const updated = await dbService.getAddresses(user.id);
      setAddresses(updated);
    } catch {
      showNotification('Error', 'Could not add address. Try again.', 'warning');
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-surface border-t-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Panel */}
      <div className="w-full md:w-1/4 space-y-6">
        {/* User Card */}
        <div className="bg-surface/20 border border-surface/20 rounded-lg p-6 flex flex-col items-center text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-surface border border-primary/20 overflow-hidden flex items-center justify-center relative shadow-inner">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <User className="h-10 w-10 text-primary" />
            )}
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-text-dark leading-tight">{user.fullName}</h2>
            <p className="text-xs text-text-light mt-1">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 rounded-full border border-surface py-2 text-xs font-semibold text-text-dark hover:bg-surface/80 hover:text-red-500 transition-all cursor-pointer"
            id="profile-logout-btn"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>

        {/* Tab Controls */}
        <div className="bg-surface/10 border border-surface/10 rounded-lg overflow-hidden divide-y divide-surface/10 text-sm">
          
          <button
            onClick={() => setActiveTab('consultations')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left font-semibold cursor-pointer ${
              activeTab === 'consultations' ? 'bg-surface/30 text-primary' : 'text-text-dark/80 hover:bg-surface/20'
            }`}
          >
            <Calendar className="h-4.5 w-4.5 shrink-0" />
            Vet Consultations
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left font-semibold cursor-pointer ${
              activeTab === 'addresses' ? 'bg-surface/30 text-primary' : 'text-text-dark/80 hover:bg-surface/20'
            }`}
          >
            <MapPin className="h-4.5 w-4.5 shrink-0" />
            Address Book
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="w-full md:w-3/4 bg-surface/15 border border-surface/20 rounded-lg p-6 sm:p-8 min-h-[450px]">

        {/* ================================================= */}
        {/* VET CONSULTATIONS TAB */}
        {/* ================================================= */}
        {activeTab === 'consultations' && (
          <div className="space-y-6">
            <div className="flex items-baseline justify-between">
              <h3 className="font-serif text-2xl font-bold text-text-dark">Veterinary Diagnostic Queries</h3>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline"
              >
                Schedule Virtual consultation
              </Link>
            </div>

            {consultations.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="text-sm text-text-light font-medium">You have not scheduled any clinical consultations.</p>
                <Link
                  href="/consultation"
                  className="inline-block rounded-full bg-primary text-brand-bg px-6 py-2.5 text-xs font-semibold"
                >
                  Schedule Checkup
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {consultations.map((cons) => (
                  <div key={cons.id} className="border border-surface/50 rounded-lg p-5 bg-brand-bg space-y-4 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <h4 className="font-serif text-lg font-bold text-text-dark">
                          Companion: {cons.petName} ({cons.petType})
                        </h4>
                        <p className="text-[10px] text-text-light">
                          Logged on {new Date(cons.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                        </p>
                      </div>

                      {/* Status */}
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-sm ${
                        cons.status === 'scheduled' ? 'bg-accent/20 text-accent' :
                        cons.status === 'pending' ? 'bg-amber-500/20 text-amber-600' :
                        cons.status === 'completed' ? 'bg-secondary/20 text-primary' :
                        'bg-red-500/20 text-red-600'
                      }`}>
                        {cons.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-2 border-t border-surface/30 pt-3 text-text-light">
                      <p><strong>Clinical Symptoms:</strong> {cons.symptoms}</p>
                      
                      {cons.scheduledAt && (
                        <p className="flex items-center gap-1 text-accent font-semibold">
                          <CheckCircle2 className="h-4 w-4 shrink-0" />
                          <span>Panel Confirmed Slot: {new Date(cons.scheduledAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                        </p>
                      )}

                      {cons.doctorNotes && (
                        <div className="mt-3 p-3 bg-surface/10 border border-surface/20 rounded">
                          <p className="font-bold text-text-dark mb-1">Pedigree Vet Prescriptions & Notes:</p>
                          <p className="italic font-serif leading-relaxed text-xs text-text-dark/95">{cons.doctorNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================= */}
        {/* ADDRESSES TAB */}
        {/* ================================================= */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-surface pb-3">
              <h3 className="font-serif text-2xl font-bold text-text-dark">Your Addresses</h3>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-primary transition-colors cursor-pointer"
                id="add-address-toggle-btn"
              >
                <Plus className="h-4 w-4" />
                Add Address
              </button>
            </div>

            {/* Address form block */}
            {showAddressForm && (
              <form onSubmit={handleSubmitAddress(handleAddAddress)} className="bg-brand-bg border border-surface/50 rounded-lg p-5 space-y-4 shadow-sm" id="address-entry-form">
                <h4 className="font-serif text-sm font-bold text-text-dark border-b border-surface pb-2">New Delivery Coordinates</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-dark uppercase">Receiver Name</label>
                    <input
                      type="text"
                      {...registerAddress('fullName')}
                      className="w-full rounded border border-surface bg-brand-bg px-2.5 py-1.5 text-xs text-text-dark focus:outline-none"
                    />
                    {addressErrors.fullName && <p className="text-[10px] text-red-500 font-semibold">{addressErrors.fullName.message}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-dark uppercase">Phone Number</label>
                    <input
                      type="text"
                      {...registerAddress('phone')}
                      className="w-full rounded border border-surface bg-brand-bg px-2.5 py-1.5 text-xs text-text-dark focus:outline-none"
                    />
                    {addressErrors.phone && <p className="text-[10px] text-red-500 font-semibold">{addressErrors.phone.message}</p>}
                  </div>

                  {/* Line 1 */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold text-text-dark uppercase">Street Address / Villa Number</label>
                    <input
                      type="text"
                      {...registerAddress('addressLine1')}
                      className="w-full rounded border border-surface bg-brand-bg px-2.5 py-1.5 text-xs text-text-dark focus:outline-none"
                    />
                    {addressErrors.addressLine1 && <p className="text-[10px] text-red-500 font-semibold">{addressErrors.addressLine1.message}</p>}
                  </div>

                  {/* Line 2 */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold text-text-dark uppercase">Locality / Sector (Optional)</label>
                    <input
                      type="text"
                      {...registerAddress('addressLine2')}
                      className="w-full rounded border border-surface bg-brand-bg px-2.5 py-1.5 text-xs text-text-dark focus:outline-none"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-dark uppercase">City</label>
                    <input
                      type="text"
                      {...registerAddress('city')}
                      className="w-full rounded border border-surface bg-brand-bg px-2.5 py-1.5 text-xs text-text-dark focus:outline-none"
                    />
                    {addressErrors.city && <p className="text-[10px] text-red-500 font-semibold">{addressErrors.city.message}</p>}
                  </div>

                  {/* State */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-dark uppercase">State</label>
                    <input
                      type="text"
                      {...registerAddress('state')}
                      className="w-full rounded border border-surface bg-brand-bg px-2.5 py-1.5 text-xs text-text-dark focus:outline-none"
                    />
                    {addressErrors.state && <p className="text-[10px] text-red-500 font-semibold">{addressErrors.state.message}</p>}
                  </div>

                  {/* Postal code */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-dark uppercase">Postal Code (PIN)</label>
                    <input
                      type="text"
                      {...registerAddress('postalCode')}
                      className="w-full rounded border border-surface bg-brand-bg px-2.5 py-1.5 text-xs text-text-dark focus:outline-none"
                    />
                    {addressErrors.postalCode && <p className="text-[10px] text-red-500 font-semibold">{addressErrors.postalCode.message}</p>}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="rounded-full border border-surface px-4 py-2 text-[11px] font-semibold text-text-dark hover:bg-surface cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-primary text-brand-bg px-6 py-2 text-[11px] font-semibold hover:bg-primary/95 cursor-pointer"
                    id="address-submit-btn"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            {/* Address List */}
            {addresses.length === 0 ? (
              <p className="text-xs text-text-light text-center py-8 italic">No addresses saved. Add one to complete your profile.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                  <div key={addr.id} className="border border-surface/50 rounded-lg p-5 bg-brand-bg space-y-2 relative shadow-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-text-dark uppercase">{addr.fullName}</h4>
                      {addr.isDefault && (
                        <span className="text-[9px] uppercase tracking-wider font-bold bg-accent/20 text-accent px-2 py-0.5 rounded-sm">
                          Default Shipping
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-light leading-relaxed">
                      {addr.addressLine1}
                      {addr.addressLine2 && `, ${addr.addressLine2}`}
                      <br />
                      {addr.city}, {addr.state} - {addr.postalCode}
                    </p>
                    <p className="text-xs text-text-light">
                      <strong>Phone:</strong> {addr.phone}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
