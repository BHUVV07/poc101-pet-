'use client';

import { useState, useEffect } from 'react';
import { dbService } from '../../../services/dbService';
import { ClipboardList, Search, Activity, UserCheck, ShieldAlert, Sliders } from 'lucide-react';

export default function ActivityLogsAdmin() {
  const [logs, setLogs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      setLoading(true);
      const data = await dbService.getActivityLogs();
      setLogs(data);
      setLoading(false);
    }
    loadLogs();
  }, []);

  const filteredLogs = logs.filter(l => 
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.details && l.details.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-zinc-100">
      {/* 1. Control bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-zinc-900/40 p-4 border border-zinc-800 rounded-lg">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search audit trail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-100 focus:outline-none focus:border-primary"
          />
        </div>
        <div className="text-zinc-500 text-[10px] font-mono">
          Showing {filteredLogs.length} audit entries chronologically
        </div>
      </div>

      {/* 2. Timeline Grid */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-6">
        {filteredLogs.length === 0 ? (
          <p className="text-zinc-500 text-xs italic text-center py-8">No matching actions logged in audit timeline.</p>
        ) : (
          <div className="relative border-l border-zinc-800 ml-4 pl-8 space-y-8 py-2">
            {filteredLogs.map((log) => {
              // Get icon based on action type
              let Icon = Activity;
              let iconColor = 'text-primary';
              let bgColor = 'bg-zinc-900 border-zinc-850';

              if (log.action.includes('Stock') || log.action.includes('Inventory')) {
                Icon = Sliders;
                iconColor = 'text-accent';
              } else if (log.action.includes('Payment') || log.action.includes('Ledger')) {
                Icon = UserCheck;
                iconColor = 'text-amber-500';
              } else if (log.action.includes('Delete') || log.action.includes('Remove')) {
                Icon = ShieldAlert;
                iconColor = 'text-red-500';
              }

              return (
                <div key={log.id} className="relative group text-xs">
                  {/* Timeline point */}
                  <span className={`absolute left-[-42px] top-0.5 h-7 w-7 rounded-md border flex items-center justify-center ${iconColor} ${bgColor} shadow`}>
                    <Icon className="h-4 w-4" />
                  </span>

                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 justify-between">
                      <span className="font-bold text-zinc-200 font-mono uppercase text-[10px] tracking-wider">
                        {log.action}
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono">
                        {new Date(log.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </div>

                    <div className="text-zinc-400 leading-relaxed font-sans mt-1">
                      {log.details}
                    </div>

                    <div className="flex gap-4 items-center text-[10px] text-zinc-500 font-mono pt-1">
                      <span>Target: <code className="text-secondary">{log.target}</code></span>
                      <span>Operator: <code>{log.userId}</code></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
