'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { dbService } from '../../services/dbService';
import { Address } from '../../types';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, Landmark, CheckCircle, ArrowRight, ShieldCheck, 
  MapPin, ClipboardCheck, Phone, Clipboard, Plus, UploadCloud
} from 'lucide-react';
import Link from 'next/link';

// Checkout Validation Schema
const checkoutSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name is required.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  addressLine1: z.string().min(5, { message: 'Street Address is required.' }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: 'City is required.' }),
  state: z.string().min(2, { message: 'State is required.' }),
  postalCode: z.string().min(6, { message: 'PIN code must be 6 digits.' }),
  transactionId: z.string().min(6, { message: 'UPI Ref/Transaction ID must be at least 6 digits.' }),
  screenshot: z.any().refine((files) => files && files.length > 0, {
    message: 'Please upload the payment confirmation screenshot.'
  }),
  orderNotes: z.string().optional()
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items: cartItems, getTotals, clearCart } = useCartStore();
  const { user, isLoading } = useAuthStore();
  const { showNotification } = useUIStore();
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('new');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const { subtotal, shipping, tax, total } = getTotals();

  // Redirect if cart is empty
  useEffect(() => {
    if (!isLoading && cartItems.length === 0) {
      router.push('/shop');
    }
  }, [cartItems, isLoading, router]);

  useEffect(() => {
    if (user) {
      dbService.getAddresses(user.id).then(addrs => {
        setAddresses(addrs);
        const defaultAddr = addrs.find(a => a.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id);
        }
      });
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      transactionId: '',
      orderNotes: ''
    }
  });

  // Watch address fields
  const screenshotFile = watch('screenshot');

  // Handle address selector change
  const handleAddressSelect = (id: string) => {
    setSelectedAddressId(id);
    if (id !== 'new') {
      const selected = addresses.find(a => a.id === id);
      if (selected) {
        setValue('fullName', selected.fullName);
        setValue('phone', selected.phone);
        setValue('addressLine1', selected.addressLine1);
        setValue('addressLine2', selected.addressLine2 || '');
        setValue('city', selected.city);
        setValue('state', selected.state);
        setValue('postalCode', selected.postalCode);
      }
    } else {
      setValue('fullName', user?.fullName || '');
      setValue('phone', '');
      setValue('addressLine1', '');
      setValue('addressLine2', '');
      setValue('city', '');
      setValue('state', '');
      setValue('postalCode', '');
    }
  };

  // Preview file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 3000);
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!user) {
      router.push('/login?redirect=/checkout');
      return;
    }

    setLoading(true);
    try {
      const finalAddress: Address = {
        id: selectedAddressId === 'new' ? `addr-${Date.now()}` : selectedAddressId,
        userId: user.id,
        fullName: data.fullName,
        phone: data.phone,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 || '',
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: 'India',
        isDefault: false,
        createdAt: new Date().toISOString()
      };

      // Create Order
      const newOrder = await dbService.createOrder({
        userId: user.id,
        userEmail: user.email,
        totalAmount: total,
        shippingAddress: finalAddress,
        orderNotes: data.orderNotes || null,
        items: cartItems.map(item => ({
          product: item.product,
          quantity: item.quantity
        }))
      });

      // Upload Payment Proof
      if (data.screenshot && data.screenshot[0]) {
        try {
          const screenshotUrl = await dbService.uploadFile('payments', data.screenshot[0]);
          await dbService.uploadPaymentProof(newOrder.id, data.transactionId, screenshotUrl);
        } catch (uploadErr: any) {
          console.error('Failed to upload payment proof receipt:', uploadErr);
          showNotification(
            'Upload Warning',
            `Order placed, but receipt file upload failed: ${uploadErr.message || 'Please contact concierge.'}`,
            'warning'
          );
        }
      }

      showNotification(
        'Order Placed!',
        'Manual receipt logged. Pending verification by apothecary desk.',
        'success'
      );
      clearCart();
      router.push('/profile');
    } catch (err) {
      console.error(err);
      showNotification('Error', 'Could not save order. Please check data.', 'warning');
    } finally {
      setLoading(false);
    }
  };

  // UPI Link generation
  const upiId = 'pawluxury@ybl';
  const upiUrl = `upi://pay?pa=${upiId}&pn=PawLuxury&am=${total}&cu=INR&tn=PawLuxury%20Order`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=6b4f3b&bgcolor=f8f5f0&data=${encodeURIComponent(upiUrl)}`;

  if (cartItems.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-serif text-4xl font-bold text-text-dark">Boutique Checkout</h1>
        <p className="text-sm text-text-light mt-3">
          Review your selection, detail delivery instructions, and log your manual transfer confirmation code.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-8 items-start" id="checkout-form">
        {/* Left Column: Delivery & Payment Coordinates */}
        <div className="w-full lg:w-7/12 space-y-8">
          
          {/* 1. Address Selection */}
          <div className="bg-surface/15 border border-surface/20 rounded-lg p-6 space-y-6">
            <h2 className="font-serif text-xl font-bold text-text-dark border-b border-surface pb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Delivery Coordinates
            </h2>

            {/* Address Selector list if user has addresses */}
            {addresses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => handleAddressSelect(addr.id)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all relative ${
                      selectedAddressId === addr.id
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-surface/40 bg-brand-bg hover:bg-surface/10'
                    }`}
                  >
                    <p className="font-bold text-xs text-text-dark uppercase">{addr.fullName}</p>
                    <p className="text-[11px] text-text-light mt-1 leading-normal">
                      {addr.addressLine1}, {addr.addressLine2 && `${addr.addressLine2}, `}
                      {addr.city}, {addr.state} - {addr.postalCode}
                    </p>
                    {selectedAddressId === addr.id && (
                      <span className="absolute top-3 right-3 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                ))}
                
                {/* Option for new address */}
                <div
                  onClick={() => handleAddressSelect('new')}
                  className={`border rounded-lg p-4 cursor-pointer transition-all flex items-center justify-center gap-2 text-xs font-semibold ${
                    selectedAddressId === 'new'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-surface/40 bg-brand-bg hover:bg-surface/10 text-text-dark/80'
                  }`}
                >
                  <Plus className="h-4.5 w-4.5" />
                  Use New Address coordinates
                </div>
              </div>
            )}

            {/* Address fields */}
            {(selectedAddressId === 'new' || addresses.length === 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-dark">Receiver Name</label>
                  <input
                    type="text"
                    {...register('fullName')}
                    className="w-full rounded border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none"
                  />
                  {errors.fullName && <p className="text-xs text-red-500 font-semibold">{errors.fullName.message}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-dark">Contact Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. 9876543210"
                    {...register('phone')}
                    className="w-full rounded border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none"
                  />
                  {errors.phone && <p className="text-xs text-red-500 font-semibold">{errors.phone.message}</p>}
                </div>

                {/* Line 1 */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-text-dark">Street Address / Villa Number</label>
                  <input
                    type="text"
                    {...register('addressLine1')}
                    className="w-full rounded border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none"
                  />
                  {errors.addressLine1 && <p className="text-xs text-red-500 font-semibold">{errors.addressLine1.message}</p>}
                </div>

                {/* Line 2 */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-text-dark">Locality / Area Name (Optional)</label>
                  <input
                    type="text"
                    {...register('addressLine2')}
                    className="w-full rounded border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none"
                  />
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-dark">City</label>
                  <input
                    type="text"
                    {...register('city')}
                    className="w-full rounded border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none"
                  />
                  {errors.city && <p className="text-xs text-red-500 font-semibold">{errors.city.message}</p>}
                </div>

                {/* State */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-dark">State</label>
                  <input
                    type="text"
                    {...register('state')}
                    className="w-full rounded border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none"
                  />
                  {errors.state && <p className="text-xs text-red-500 font-semibold">{errors.state.message}</p>}
                </div>

                {/* Postal Code */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-dark">PIN Code</label>
                  <input
                    type="text"
                    {...register('postalCode')}
                    className="w-full rounded border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none"
                  />
                  {errors.postalCode && <p className="text-xs text-red-500 font-semibold">{errors.postalCode.message}</p>}
                </div>
              </div>
            )}
            
            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-dark">Special Delivery Notes (Optional)</label>
              <textarea
                rows={2}
                placeholder="Gate codes, delivery hours, custom instructions..."
                {...register('orderNotes')}
                className="w-full rounded border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none"
              />
            </div>
          </div>

          {/* 2. Manual Payment Gateway */}
          <div className="bg-surface/15 border border-surface/20 rounded-lg p-6 space-y-6">
            <h2 className="font-serif text-xl font-bold text-text-dark border-b border-surface pb-3 flex items-center gap-2">
              <Landmark className="h-5 w-5 text-primary" />
              Manual Payment Gateway
            </h2>

            <p className="text-xs text-text-light leading-relaxed">
              Complete your payment using either the UPI QR code below or a direct bank transfer. Once paid, input your reference transaction ID and upload the receipt screenshot.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-8 justify-center py-4 bg-brand-bg border border-surface/30 rounded-md">
              {/* QR Panel */}
              <div className="flex flex-col items-center space-y-3">
                <img
                  src={qrCodeUrl}
                  alt="UPI QR Code"
                  className="h-44 w-44 object-contain bg-white p-2 rounded shadow-inner"
                />
                <div className="text-center">
                  <p className="text-xs font-bold text-text-dark">Scan to Pay via UPI</p>
                  <p className="text-[10px] text-text-light mt-0.5">Amount: ₹{total.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Bank Transfers info */}
              <div className="space-y-4 max-w-sm text-xs border-t md:border-t-0 md:border-l border-surface/40 pt-4 md:pt-0 md:pl-8 w-full">
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-bold text-text-light">UPI ID Transfer</p>
                  <div className="flex items-center justify-between bg-surface/30 p-2 rounded border border-surface/20">
                    <code className="font-semibold text-text-dark">{upiId}</code>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(upiId, 'upi')}
                      className="text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                      {copiedField === 'upi' ? 'Copied' : <Clipboard className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-text-light">Direct Bank Transfer</p>
                  <div className="bg-surface/30 p-3 rounded border border-surface/20 space-y-1.5 text-[11px] leading-relaxed">
                    <p><strong>Account:</strong> PawLuxury Private Limited</p>
                    <p className="flex justify-between items-center">
                      <span><strong>Number:</strong> 50200062391032</span>
                      <button type="button" onClick={() => copyToClipboard('50200062391032', 'bank')} className="text-secondary cursor-pointer">
                        {copiedField === 'bank' ? 'Copied' : <Clipboard className="h-3.5 w-3.5" />}
                      </button>
                    </p>
                    <p><strong>Bank:</strong> HDFC Bank Ltd</p>
                    <p><strong>IFSC:</strong> HDFC0000104</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Proof form */}
            <div className="space-y-4 border-t border-surface/40 pt-4">
              <h3 className="font-serif text-sm font-bold text-text-dark">Verify Transfer</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Transaction ID */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-dark">Transaction ID / UPI Reference</label>
                  <input
                    type="text"
                    placeholder="12-digit number or transfer hash"
                    {...register('transactionId')}
                    className="w-full rounded border border-surface bg-brand-bg px-3 py-2 text-sm text-text-dark focus:outline-none"
                    id="checkout-transaction-id"
                  />
                  {errors.transactionId && <p className="text-xs text-red-500 font-semibold">{errors.transactionId.message}</p>}
                </div>

                {/* Screenshot upload */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-dark block">Upload Proof Receipt</label>
                  <div className="relative border border-dashed border-surface hover:border-primary/50 transition-colors rounded-md bg-brand-bg p-4 flex flex-col items-center text-center cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      id="screenshot"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      {...register('screenshot', {
                        onChange: handleFileChange
                      })}
                    />
                    <UploadCloud className="h-8 w-8 text-primary/70 mb-2" />
                    <p className="text-[11px] text-text-dark font-medium">
                      {screenshotFile && screenshotFile[0] ? screenshotFile[0].name : 'Drag screenshot or click to browse'}
                    </p>
                    <p className="text-[9px] text-text-light mt-0.5">JPEG, PNG files are allowed</p>
                  </div>
                  {errors.screenshot && <p className="text-xs text-red-500 font-semibold">{errors.screenshot.message as string}</p>}
                </div>
              </div>

              {/* Upload image preview */}
              {filePreview && (
                <div className="pt-2">
                  <p className="text-[10px] uppercase font-bold text-text-light mb-1.5">Screenshot Preview</p>
                  <img src={filePreview} alt="Receipt preview" className="h-32 w-auto object-cover rounded border border-surface shadow-sm" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="w-full lg:w-5/12 bg-surface/15 border border-surface/20 rounded-lg p-6 space-y-6">
          <h2 className="font-serif text-xl font-bold text-text-dark border-b border-surface pb-3 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            Order Ledger Summary
          </h2>

          {/* List items */}
          <div className="divide-y divide-surface/20 max-h-[220px] overflow-y-auto pr-2 space-y-4">
            {cartItems.map((item) => {
              const price = item.product.salePrice ?? item.product.price;
              return (
                <div key={item.id} className="py-2.5 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.product.images[0]} alt="" className="h-10 w-10 object-cover rounded bg-surface shrink-0" />
                    <div>
                      <h4 className="font-semibold text-text-dark line-clamp-1">{item.product.name}</h4>
                      <p className="text-[10px] text-text-light">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-text-dark shrink-0">
                    ₹{(price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Totals */}
          <div className="border-t border-surface pt-4 space-y-2.5 text-xs text-text-light">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="text-text-dark font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Apothecary Convenience Fee (5%)</span>
              <span className="text-text-dark font-medium">₹{tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>White-glove Shipping</span>
              <span className="text-text-dark font-medium">
                {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}
              </span>
            </div>
            <div className="flex justify-between border-t border-surface/80 pt-3 text-base font-bold text-text-dark">
              <span>Total Estimated Payment</span>
              <span className="text-primary font-serif font-bold">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Submitting check */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-center text-sm font-semibold text-brand-bg hover:bg-primary/95 transition-all shadow-md cursor-pointer disabled:bg-primary/80"
            id="checkout-submit-btn"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-bg border-t-transparent" />
            ) : (
              <>
                Confirm Receipt & Place Order
                <ArrowRight className="h-4.5 w-4.5" />
              </>
            )}
          </button>

          <div className="flex gap-2 p-3.5 bg-brand-bg border border-surface/30 rounded text-[10px] text-text-light leading-normal">
            <ShieldCheck className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
            <span>
              By clicking Place Order, your details and uploaded receipt are registered in our secure manual billing ledger. An apothecary administrator will audit the transaction ID within 4 hours.
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
