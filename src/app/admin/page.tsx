'use client';

import { useState, useEffect } from 'react';
import { dbService } from '../../services/dbService';
import { Order, Consultation, Product, Branch, Category } from '../../types';
import { useAuthStore } from '../../store/authStore';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { 
  Stethoscope, TrendingUp, Calendar, ArrowRight, ClipboardCheck, Boxes, FolderTree, MessageSquare
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedAdminBranchId, setSelectedAdminBranchId] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const getBranchIdFromRole = (role: string): string | null => {
    if (role === 'manager_garden_area') return 'garden-area';
    if (role === 'manager_police_chowki') return 'police-chowki';
    if (role === 'manager_hospital') return 'buddy-kitty';
    if (role === 'manager_wholesale') return 'wholesale';
    if (role === 'manager_petstep') return 'petstep';
    return null;
  };

  useEffect(() => {
    async function loadStats() {
      if (!user) return;
      setLoading(true);
      
      const isManager = user.role.startsWith('manager_');
      const activeBranchId = isManager 
        ? getBranchIdFromRole(user.role) 
        : (selectedAdminBranchId === 'all' ? undefined : selectedAdminBranchId);

      const prods = await dbService.getProducts(undefined, undefined, activeBranchId || undefined);
      setProducts(prods);

      const cats = await dbService.getCategories();
      setCategories(cats);

      const cons = await dbService.getConsultations(undefined, activeBranchId || undefined);
      setConsultations(cons);

      if (user.role === 'admin' && branches.length === 0) {
        const bList = await dbService.getBranches();
        setBranches(bList);
      }
      setLoading(false);
    }
    loadStats();
  }, [user, selectedAdminBranchId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-primary" />
      </div>
    );
  }

  // 1. Calculations
  const pendingConsultationsCount = consultations.filter(c => c.status === 'pending').length;

  // 2. Chart Mock Data - Consultations and Showcase Enquiries
  const chartData = [
    { name: 'Mon', enquiries: 12, consultations: 1 },
    { name: 'Tue', enquiries: 8, consultations: 2 },
    { name: 'Wed', enquiries: 23, consultations: 3 },
    { name: 'Thu', enquiries: 14, consultations: 2 },
    { name: 'Fri', enquiries: 20, consultations: 4 },
    { name: 'Sat', enquiries: 35, consultations: 5 },
    { name: 'Sun', enquiries: consultations.length > 0 ? consultations.length * 3 : 15, consultations: consultations.length > 0 ? consultations.length : 2 }
  ];

  const recentConsultations = consultations.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Scope Selector */}
      {user?.role === 'admin' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300 font-mono">Platform Scope View</h2>
            <p className="text-xs text-zinc-500 mt-1">Select a division to filter gross metrics and transaction ledger scopes.</p>
          </div>
          <select
            value={selectedAdminBranchId}
            onChange={(e) => setSelectedAdminBranchId(e.target.value)}
            className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-semibold text-zinc-200 focus:outline-none cursor-pointer"
          >
            <option value="all">All Ecosystem Divisions</option>
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
            Viewing isolated branch metrics for: <strong className="text-primary font-mono">{user.role.replace('manager_', '').replace(/_/g, ' ').toUpperCase()}</strong>. Logged entries outside this branch are filtered.
          </p>
        </div>
      )}
      {/* Overview stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Showcase Products */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Showcased Products</p>
            <h3 className="font-serif text-2xl font-bold text-zinc-100">
              {products.length}
            </h3>
          </div>
          <div className="h-10 w-10 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-primary">
            <Boxes className="h-5 w-5" />
          </div>
        </div>

        {/* Total Collections */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Boutique Collections</p>
            <h3 className="font-serif text-2xl font-bold text-zinc-100">
              {categories.length}
            </h3>
          </div>
          <div className="h-10 w-10 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-primary">
            <FolderTree className="h-5 w-5" />
          </div>
        </div>

        {/* Active Branches */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Ecosystem Divisions</p>
            <h3 className="font-serif text-2xl font-bold text-secondary">
              5
            </h3>
          </div>
          <div className="h-10 w-10 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-secondary">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        {/* Active Vet bookings */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Vet Bookings Active</p>
            <h3 className="font-serif text-2xl font-bold text-accent">
              {pendingConsultationsCount}
            </h3>
          </div>
          <div className="h-10 w-10 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-accent">
            <Stethoscope className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-400 flex items-center gap-1.5 font-mono">
              <TrendingUp className="h-4 w-4 text-primary" />
              Weekly Enquiry Velocity
            </h3>
          </div>
          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="name" stroke="#71717a" />
                <YAxis stroke="#71717a" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }}
                  labelStyle={{ color: '#a1a1aa' }}
                />
                <Line type="monotone" dataKey="enquiries" stroke="#6b4f3b" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-4">
          <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-400 flex items-center gap-1.5 font-mono">
            <Calendar className="h-4 w-4 text-primary" />
            Weekly Consultation Density
          </h3>
          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="name" stroke="#71717a" />
                <YAxis stroke="#71717a" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }}
                  labelStyle={{ color: '#a1a1aa' }}
                />
                <Bar dataKey="consultations" fill="#8fa58e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Consultations table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-300 font-mono">Recent Consultation Queries</h3>
          <Link
            href="/admin/consultations"
            className="text-xs font-semibold text-primary hover:text-accent transition-colors flex items-center gap-1"
          >
            Manage Bookings <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        
        {recentConsultations.length === 0 ? (
          <p className="text-zinc-500 text-xs italic text-center py-8">No consultations logged in system.</p>
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 font-mono">
                  <th className="p-4 uppercase">Pet Name</th>
                  <th className="p-4 uppercase">Type</th>
                  <th className="p-4 uppercase">Customer Email</th>
                  <th className="p-4 uppercase">Date Requested</th>
                  <th className="p-4 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {recentConsultations.map((cons) => (
                  <tr key={cons.id} className="hover:bg-zinc-800/20">
                    <td className="p-4 font-bold">{cons.petName}</td>
                    <td className="p-4 uppercase font-mono text-[10px] text-zinc-400">{cons.petType}</td>
                    <td className="p-4">{cons.userEmail}</td>
                    <td className="p-4">{new Date(cons.createdAt).toLocaleDateString('en-IN', { dateStyle: 'short' })}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                        cons.status === 'scheduled' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        cons.status === 'pending' ? 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse' :
                        'bg-zinc-950 text-zinc-400 border border-zinc-800'
                      }`}>
                        {cons.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
