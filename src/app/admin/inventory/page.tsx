'use client';

import { useState, useEffect } from 'react';
import { dbService } from '../../../services/dbService';
import { Product, Branch } from '../../../types';
import { useAuthStore } from '../../../store/authStore';
import { useUIStore } from '../../../store/uiStore';
import { 
  AlertTriangle, ArrowUpDown, Boxes, Search, PlusCircle, 
  MinusCircle, History, RefreshCw, BarChart 
} from 'lucide-react';

export default function InventoryAdmin() {
  const { user } = useAuthStore();
  const { showNotification } = useUIStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedAdminBranchId, setSelectedAdminBranchId] = useState<string>('garden-area');
  const [settings, setSettings] = useState<any>({ lowStockThreshold: 10 });
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dialog state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adjustAmount, setAdjustAmount] = useState<number>(0);
  const [adjustReason, setAdjustReason] = useState<string>('Restocked from vendor');
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  const getBranchIdFromRole = (role: string): string | null => {
    if (role === 'manager_garden_area') return 'garden-area';
    if (role === 'manager_police_chowki') return 'police-chowki';
    if (role === 'manager_hospital') return 'buddy-kitty';
    if (role === 'manager_wholesale') return 'wholesale';
    if (role === 'manager_petstep') return 'petstep';
    return null;
  };

  async function loadData() {
    if (!user) return;
    setLoading(true);
    try {
      const isManager = user.role.startsWith('manager_');
      const activeBranchId = isManager ? getBranchIdFromRole(user.role) : selectedAdminBranchId;
      
      if (!activeBranchId) return;

      const prods = await dbService.getProducts(undefined, undefined, activeBranchId);
      setProducts(prods);

      const invLogs = await dbService.getInventoryLogs();
      setLogs(invLogs);

      const sets = await dbService.getSettings();
      setSettings(sets);

      if (user.role === 'admin' && branches.length === 0) {
        const bList = await dbService.getBranches();
        setBranches(bList);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, selectedAdminBranchId]);

  const handleAdjustStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || adjustAmount === 0 || !user) return;

    setUpdating(true);
    try {
      const isManager = user.role.startsWith('manager_');
      const activeBranchId = isManager ? getBranchIdFromRole(user.role) : selectedAdminBranchId;
      
      if (!activeBranchId) return;

      // Adjust branch specific inventory stock
      await dbService.updateBranchInventoryStock(
        activeBranchId,
        selectedProduct.id,
        adjustAmount,
        adjustReason
      );

      // Log to general activity ledger
      const directionStr = adjustAmount > 0 ? 'Restocked' : 'Written-off';
      await dbService.logActivity(
        'Stock Level Audited',
        `product:${selectedProduct.id}`,
        `Branch [${activeBranchId}]: ${directionStr} ${Math.abs(adjustAmount)} units of ${selectedProduct.name}. Reason: ${adjustReason}`,
        user.id
      );

      showNotification(
        'Stock Adjusted',
        `Product stock updated by ${adjustAmount} units for ${activeBranchId.toUpperCase()}.`,
        'success'
      );
      
      // Reset state & reload
      setSelectedProduct(null);
      setAdjustAmount(0);
      setAdjustReason('Restocked from vendor');
      await loadData();
    } catch (err) {
      console.error(err);
      showNotification('Error', 'Could not adjust stock.', 'warning');
    } finally {
      setUpdating(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockProducts = products.filter(p => p.stock <= settings.lowStockThreshold);
  const outOfStockProducts = products.filter(p => p.stock === 0);

  const isManager = user?.role.startsWith('manager_');
  const activeBranchId = isManager ? getBranchIdFromRole(user?.role || '') : selectedAdminBranchId;
  const filteredLogs = logs.filter(log => {
    if (!activeBranchId) return true;
    return log.reason?.includes(`Branch [${activeBranchId}]`);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Scope Selector */}
      {user?.role === 'admin' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300 font-mono">Inventory Division Scope</h2>
            <p className="text-xs text-zinc-500 mt-1">Select a branch outlet to query and manage isolated stock records.</p>
          </div>
          <select
            value={selectedAdminBranchId}
            onChange={(e) => setSelectedAdminBranchId(e.target.value)}
            className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-semibold text-zinc-200 focus:outline-none cursor-pointer"
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.type.toUpperCase()})
              </option>
            ))}
          </select>
        </div>
      )}

      {user?.role.startsWith('manager_') && (
        <div className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-lg">
          <p className="text-xs text-zinc-400 leading-normal">
            Managing stock for branch: <strong className="text-primary font-mono">{user.role.replace('manager_', '').replace(/_/g, ' ').toUpperCase()}</strong>. Outages and warnings are branch-isolated.
          </p>
        </div>
      )}
      {/* 1. Statistics grids */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Catalog Items Listed</p>
            <h3 className="font-serif text-2xl font-bold text-zinc-100">{products.length}</h3>
          </div>
          <div className="h-10 w-10 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-primary">
            <Boxes className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Low Stock Alerts</p>
            <h3 className={`font-serif text-2xl font-bold ${lowStockProducts.length > 0 ? 'text-amber-500' : 'text-zinc-100'}`}>
              {lowStockProducts.length}
            </h3>
          </div>
          <div className={`h-10 w-10 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center ${lowStockProducts.length > 0 ? 'text-amber-500 animate-pulse' : 'text-zinc-500'}`}>
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Out Of Stock Outages</p>
            <h3 className={`font-serif text-2xl font-bold ${outOfStockProducts.length > 0 ? 'text-red-500' : 'text-zinc-100'}`}>
              {outOfStockProducts.length}
            </h3>
          </div>
          <div className="h-10 w-10 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-red-500">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* 2. Layout Splits: Left (Inventory Ledger) / Right (Stock Adjustment Modal or Logs History) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Products stock grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-zinc-900/40 p-4 border border-zinc-800 rounded-lg">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search catalog products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-100 focus:outline-none focus:border-primary"
              />
            </div>
            <button
              onClick={loadData}
              className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-750 text-xs font-semibold rounded uppercase tracking-wider text-zinc-300 border border-zinc-700 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 font-mono">
                    <th className="p-4 uppercase">Product Details</th>
                    <th className="p-4 uppercase text-center">Active Stock</th>
                    <th className="p-4 uppercase">Stock Health Status</th>
                    <th className="p-4 uppercase text-right">Ledger Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {filteredProducts.map((p) => {
                    const isLow = p.stock <= settings.lowStockThreshold;
                    const isOut = p.stock === 0;
                    return (
                      <tr key={p.id} className="hover:bg-zinc-800/20">
                        <td className="p-4 flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="h-8 w-8 rounded object-cover bg-zinc-800 border border-zinc-700" />
                          <div>
                            <p className="font-bold text-zinc-200">{p.name}</p>
                            <p className="text-[9px] text-zinc-500 font-mono">SKU: {p.id}</p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-bold font-mono text-zinc-100">{p.stock}</td>
                        <td className="p-4">
                          {isOut ? (
                            <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-900 text-[10px] font-bold font-mono">
                              Out of Stock
                            </span>
                          ) : isLow ? (
                            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-900 text-[10px] font-bold font-mono">
                              Low Stock Warning
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900 text-[10px] font-bold font-mono">
                              Optimal stock
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedProduct(p)}
                            className="px-2.5 py-1.5 bg-primary text-brand-bg rounded hover:bg-primary/95 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                          >
                            Auditing Adjust
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Log Adjust form or Log Timeline History */}
        <div className="space-y-6">
          {/* Active adjust panel */}
          {selectedProduct ? (
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-300 font-mono flex items-center gap-2">
                <BarChart className="h-4.5 w-4.5 text-primary" />
                Ledger Stock Adjust
              </h3>
              
              <div className="bg-zinc-950 p-4 border border-zinc-800 rounded text-xs">
                <p className="font-bold text-zinc-200">{selectedProduct.name}</p>
                <p className="text-[10px] text-zinc-500 mt-1 font-mono">Current Quantity: {selectedProduct.stock} units</p>
              </div>

              <form onSubmit={handleAdjustStock} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">Adjustment Volume</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdjustAmount(prev => prev - 1)}
                      className="p-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 rounded cursor-pointer"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      value={adjustAmount}
                      onChange={(e) => setAdjustAmount(parseInt(e.target.value) || 0)}
                      className="w-full text-center py-1 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 font-mono font-bold focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setAdjustAmount(prev => prev + 1)}
                      className="p-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 rounded cursor-pointer"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-[9px] text-zinc-500 leading-normal">
                    Enter positive numbers to restock (add stock) or negative numbers to write-off (remove stock).
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">Audit Reason / Notes</label>
                  <select
                    value={adjustReason}
                    onChange={(e) => setAdjustReason(e.target.value)}
                    className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-150 focus:outline-none"
                  >
                    <option value="Restocked from vendor">Restocked from vendor (Petstep)</option>
                    <option value="Direct wholesale intake">Direct wholesale intake (Kote B2B)</option>
                    <option value="Wastage write-off">Wastage write-off (Damage/Expiry)</option>
                    <option value="Manual override check">Manual override check</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={updating || adjustAmount === 0}
                    className="flex-1 py-2 bg-primary hover:bg-primary/95 text-brand-bg rounded text-xs font-semibold uppercase tracking-wider cursor-pointer disabled:bg-zinc-800 disabled:text-zinc-500"
                  >
                    {updating ? 'Auditing...' : 'Submit Adjust'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="px-3 py-2 bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 rounded text-xs font-semibold text-zinc-300 uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : null}

          {/* Audit log history timeline */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-300 font-mono flex items-center gap-1.5">
              <History className="h-4 w-4 text-primary" />
              Stock Operations Log
            </h3>
            
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
              {filteredLogs.length === 0 ? (
                <p className="text-zinc-500 text-xs italic text-center py-6">No inventory changes recorded.</p>
              ) : (
                filteredLogs.map((log) => {
                  const isPositive = log.changeAmount > 0;
                  return (
                    <div key={log.id} className="border-l-2 border-zinc-800 pl-4 py-1 space-y-1 text-xs relative">
                      <span className={`absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-zinc-200">{log.productName || 'Product'}</span>
                        <span className={`font-bold font-mono ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                          {isPositive ? `+${log.changeAmount}` : log.changeAmount}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400">{log.reason}</p>
                      <p className="text-[9px] text-zinc-500 font-mono">
                        {new Date(log.createdAt).toLocaleString('en-IN', { timeStyle: 'short', dateStyle: 'short' })}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
