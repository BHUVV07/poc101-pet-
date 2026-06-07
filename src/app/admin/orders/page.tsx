'use client';

import { useState, useEffect } from 'react';
import { dbService } from '../../../services/dbService';
import { Order, OrderStatus } from '../../../types';
import { useUIStore } from '../../../store/uiStore';
import { 
  X, Check, XCircle, Landmark, Eye, Truck, 
  Search, ClipboardCheck, ExternalLink 
} from 'lucide-react';

export default function AdminOrders() {
  const { showNotification } = useUIStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomScreenshot, setZoomScreenshot] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    const data = await dbService.getOrders();
    setOrders(data);
    setLoading(false);
  }

  const handleOpenVerify = (order: Order) => {
    setSelectedOrder(order);
    setVerificationNotes(order.paymentProof?.verificationNotes || '');
    setTrackingNumber(order.trackingNumber || '');
    setZoomScreenshot(false);
  };

  const handleVerify = async (approved: boolean) => {
    if (!selectedOrder) return;
    try {
      const success = await dbService.verifyPayment(
        selectedOrder.id,
        approved,
        verificationNotes,
        'admin-director-11'
      );
      
      if (success) {
        showNotification(
          approved ? 'Payment Cleared' : 'Payment Rejected',
          approved 
            ? `Order ledger updated. Status set to PROCESSING.`
            : `Order payment marked as FAILED. Notes logged.`,
          approved ? 'success' : 'warning'
        );
        setSelectedOrder(null);
        loadOrders();
      }
    } catch {
      showNotification('Error', 'Could not record verification.', 'warning');
    }
  };

  const handleUpdateStatus = async (status: OrderStatus) => {
    if (!selectedOrder) return;
    try {
      const success = await dbService.updateOrderStatus(selectedOrder.id, status, trackingNumber);
      if (success) {
        showNotification(
          'Status Updated',
          `Order status set to ${status.toUpperCase()}.`,
          'success'
        );
        setSelectedOrder(null);
        loadOrders();
      }
    } catch {
      showNotification('Error', 'Could not update order status.', 'warning');
    }
  };

  // Filter orders by search term (id or email)
  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (o.userEmail && o.userEmail.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header operations */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-800 pb-4 gap-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 font-mono">Operations & Billing Ledger</h3>
          <p className="text-[11px] text-zinc-500 mt-1">Audit manual payments and advance package delivery steps.</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search Order ID or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-850 rounded text-xs text-zinc-100 focus:outline-none focus:ring-1 focus:ring-primary"
            id="admin-order-search"
          />
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
        </div>
      </div>

      {/* Operations List Table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-primary" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <p className="text-zinc-500 text-xs italic text-center py-12">No orders found matching parameters.</p>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-mono">
                <th className="p-4 uppercase">Order ID</th>
                <th className="p-4 uppercase">Customer</th>
                <th className="p-4 uppercase">Total Bill</th>
                <th className="p-4 uppercase">Payment Audit</th>
                <th className="p-4 uppercase">Delivery Status</th>
                <th className="p-4 uppercase">Audit Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-800/10">
                  <td className="p-4 font-mono font-bold">{order.id.slice(0, 13)}...</td>
                  <td className="p-4">{order.userEmail}</td>
                  <td className="p-4 font-semibold">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                      order.paymentStatus === 'paid' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      order.paymentStatus === 'pending_verification' ? 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse' :
                      'bg-red-950/60 text-red-400 border border-red-900'
                    }`}>
                      {order.paymentStatus === 'pending_verification' ? 'Pending verify' : order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 uppercase font-bold text-[10px] tracking-wider text-zinc-400">
                    {order.status}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleOpenVerify(order)}
                      className="inline-flex items-center gap-1 bg-zinc-800 hover:bg-zinc-755 border border-zinc-700 text-zinc-200 px-3 py-1.5 rounded transition-all cursor-pointer"
                      id={`verify-btn-${order.id}`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Verify Proof
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Side-by-Side Audit Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-zinc-950/80">
          <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl flex flex-col z-10 text-xs text-zinc-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 p-5">
              <div>
                <h4 className="font-serif text-lg font-bold text-zinc-100 uppercase tracking-wider">
                  Audit Order Ledger
                </h4>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Order ID: {selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Split Panels */}
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-800 max-h-[50vh] md:max-h-[60vh] overflow-y-auto">
              
              {/* Left Panel: Payment Screenshot */}
              <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center space-y-4">
                <h5 className="font-bold uppercase tracking-wider text-zinc-400 font-mono self-start">Uploaded Payment screenshot</h5>
                
                {selectedOrder.paymentProof?.screenshotUrl ? (
                  <div className="relative w-full aspect-video bg-zinc-950 border border-zinc-800 rounded overflow-hidden flex items-center justify-center">
                    <img
                      src={selectedOrder.paymentProof.screenshotUrl}
                      alt="Bank receipt"
                      className="max-h-full max-w-full object-contain cursor-zoom-in"
                      onClick={() => setZoomScreenshot(true)}
                    />
                    <button 
                      type="button" 
                      onClick={() => setZoomScreenshot(true)}
                      className="absolute bottom-2 right-2 bg-zinc-900/90 border border-zinc-800 p-1.5 rounded hover:text-white"
                      title="Zoom Image"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-8 bg-zinc-950 rounded border border-zinc-800 w-full italic text-zinc-500">
                    No screenshot uploaded by customer.
                  </div>
                )}

                <div className="w-full bg-zinc-950 p-3 rounded border border-zinc-800 space-y-1">
                  <p className="text-[10px] uppercase font-bold text-zinc-500 font-mono">Claimed Transaction ID</p>
                  <code className="text-sm font-bold text-amber-500 font-mono">
                    {selectedOrder.paymentProof?.transactionId || 'None Provided'}
                  </code>
                </div>
              </div>

              {/* Right Panel: Order contents */}
              <div className="w-full md:w-1/2 p-6 space-y-6">
                <h5 className="font-bold uppercase tracking-wider text-zinc-400 font-mono">Order details</h5>
                
                {/* Details list */}
                <div className="space-y-3 bg-zinc-950 p-4 rounded border border-zinc-800">
                  <p><strong>Customer:</strong> {selectedOrder.userEmail}</p>
                  <p><strong>Shipping Location:</strong> {selectedOrder.shippingAddress.addressLine1}, {selectedOrder.shippingAddress.city}</p>
                  {selectedOrder.orderNotes && <p><strong>Order Notes:</strong> {selectedOrder.orderNotes}</p>}
                  <p className="text-sm text-primary font-bold">Total Estimated: ₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</p>
                </div>

                {/* Items grid */}
                <div className="space-y-2">
                  <p className="font-bold uppercase text-[10px] text-zinc-500 font-mono">Creations list</p>
                  <div className="border border-zinc-800 rounded divide-y divide-zinc-800 max-h-[120px] overflow-y-auto pr-1">
                    {selectedOrder.items?.map((item) => (
                      <div key={item.id} className="p-2 flex items-center justify-between text-[11px]">
                        <span>{item.productName} (x{item.quantity})</span>
                        <span className="font-mono text-zinc-400">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Operations Controls */}
            <div className="border-t border-zinc-800 p-5 bg-zinc-900/50 space-y-4">
              {/* Audit notes */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Ledger Audit Notes</label>
                <input
                  type="text"
                  placeholder="Verification success, transaction ID match / mismatch details..."
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  className="w-full rounded border border-zinc-850 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                  id="verification-notes-input"
                />
              </div>

              {selectedOrder.paymentStatus === 'pending_verification' ? (
                /* Payment verification action triggers */
                <div className="flex gap-4">
                  <button
                    onClick={() => handleVerify(false)}
                    className="flex-1 rounded border border-red-900 bg-red-950/20 text-red-400 hover:bg-red-950/40 py-2.5 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    id="reject-payment-btn"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject Payment Proof
                  </button>
                  <button
                    onClick={() => handleVerify(true)}
                    className="flex-1 rounded bg-primary text-brand-bg hover:bg-primary/95 py-2.5 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    id="approve-payment-btn"
                  >
                    <Check className="h-4 w-4 text-brand-bg" />
                    Approve Payment Ledger
                  </button>
                </div>
              ) : (
                /* Post payment verification tracking operations updates */
                <div className="space-y-4 border-t border-zinc-800 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Carrier tracking number */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Carrier Tracking Number</label>
                      <input
                        type="text"
                        placeholder="e.g. DHL-8392102"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="w-full rounded border border-zinc-850 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                      />
                    </div>

                    {/* Operational Status */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Operational Status</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus('processing')}
                          className={`flex-1 py-2 px-2.5 border rounded font-mono text-[9px] font-bold ${
                            selectedOrder.status === 'processing' ? 'bg-primary border-primary text-brand-bg' : 'border-zinc-800 text-zinc-400 hover:text-zinc-100'
                          }`}
                        >
                          Process
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus('shipped')}
                          className={`flex-1 py-2 px-2.5 border rounded font-mono text-[9px] font-bold ${
                            selectedOrder.status === 'shipped' ? 'bg-primary border-primary text-brand-bg' : 'border-zinc-800 text-zinc-400 hover:text-zinc-100'
                          }`}
                        >
                          Ship
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus('delivered')}
                          className={`flex-1 py-2 px-2.5 border rounded font-mono text-[9px] font-bold ${
                            selectedOrder.status === 'delivered' ? 'bg-primary border-primary text-brand-bg' : 'border-zinc-800 text-zinc-400 hover:text-zinc-100'
                          }`}
                        >
                          Deliver
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Screenshot Zoom Overlay */}
      {zoomScreenshot && selectedOrder?.paymentProof?.screenshotUrl && (
        <div 
          onClick={() => setZoomScreenshot(false)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img 
            src={selectedOrder.paymentProof.screenshotUrl} 
            alt="Payment screenshot zoom" 
            className="max-h-[90vh] max-w-full object-contain"
          />
          <button 
            onClick={() => setZoomScreenshot(false)}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
