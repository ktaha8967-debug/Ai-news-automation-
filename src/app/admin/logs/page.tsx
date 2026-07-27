import React from 'react';
import { db } from '@/lib/db';
import { Activity, CheckCircle2, Clock, Terminal } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AutomationLogsPage() {
  const logs = db.getAutomationLogs();

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Automation Execution & Retry Logs
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete audit trail for RSS research scans, Groq model completions, and sitemap generation cycles.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span className="font-bold text-white uppercase tracking-wider font-display">Execution Logs ({logs.length})</span>
          <span>Zero Paid API Costs</span>
        </div>

        <div className="divide-y divide-slate-800">
          {logs.map((log) => (
            <div key={log.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-white">{log.taskName}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{log.details}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-xs">
                <span className="bg-slate-900 text-slate-400 px-2.5 py-1 rounded font-mono">
                  {log.durationMs}ms
                </span>
                <span className={`px-3 py-1 rounded-full font-bold ${
                  log.status === 'SUCCESS' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' : 'bg-rose-950 text-rose-400'
                }`}>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
