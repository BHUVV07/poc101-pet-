'use client';

import { useState, useEffect } from 'react';
import { dbService } from '../../../services/dbService';
import { Search, Mail, Calendar, TrendingUp, Users, ShoppingBag } from 'lucide-react';

export default function CustomersAdmin() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomers() {
      setLoading(true);
      const data = await dbService.getCustomers();
      setCustomers(data);
      setLoading(false);
    }
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSpentAll = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const averageSpent = customers.length > 0 ? Math.round(totalSpentAll / customers.length) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-zinc-100">
      {/* 1. Header & Quick Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Total Directory Clients</p>
            <h3 className="font-serif text-2xl font-bold text-zinc-100">{customers.length}</h3>
          </div>
          <div className="h-10 w-10 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-primary">
            <Users className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Cumulative Sales Value</p>
            <h3 className="font-serif text-2xl font-bold text-zinc-100">₹{totalSpentAll.toLocaleString('en-IN')}</h3>
          </div>
          <div className="h-10 w-10 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-accent">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Average Client Value (LTV)</p>
            <h3 className="font-serif text-2xl font-bold text-zinc-100">₹{averageSpent.toLocaleString('en-IN')}</h3>
          </div>
          <div className="h-10 w-10 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-secondary">
            <ShoppingBag className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* 2. Control bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-zinc-900/40 p-4 border border-zinc-800 rounded-lg">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-100 focus:outline-none focus:border-primary"
          />
        </div>
        <div className="text-zinc-500 text-[10px] font-mono">
          Showing {filteredCustomers.length} of {customers.length} registered accounts
        </div>
      </div>

      {/* 3. Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-mono">
                <th className="p-4 uppercase">Profile</th>
                <th className="p-4 uppercase">Contact Coordinate</th>
                <th className="p-4 uppercase">Join Date</th>
                <th className="p-4 uppercase text-center">Orders Placed</th>
                <th className="p-4 uppercase text-right">LTV Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-500 italic">No customers found.</td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-zinc-800/20">
                    <td className="p-4 flex items-center gap-3">
                      {c.avatarUrl ? (
                        <img src={c.avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover bg-zinc-800 border border-zinc-700" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-zinc-300">
                          {c.fullName?.charAt(0) || 'C'}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-zinc-200">{c.fullName || 'Anonymous Client'}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">ID: {c.id.slice(0, 10)}...</p>
                      </div>
                    </td>
                    <td className="p-4 font-mono">
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <Mail className="h-3.5 w-3.5" />
                        {c.email}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                        {new Date(c.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold font-mono text-zinc-200">{c.totalOrders}</td>
                    <td className="p-4 text-right font-bold font-mono text-primary">₹{c.totalSpent.toLocaleString('en-IN')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
