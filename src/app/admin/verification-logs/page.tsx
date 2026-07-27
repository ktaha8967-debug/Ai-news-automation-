import React from 'react';
import { db } from '@/lib/db';
import { ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function VerificationLogsPage() {
  const logs = db.getVerificationLogs();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Fact-Verification Audit & Hallucination Logs
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Detailed log of every factual claim evaluated across academic databases and multi-source RSS feeds.
        </p>
      </div>

      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                  log.status === 'VERIFIED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400'
                }`}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm text-white">Trust Index Score: {log.score}%</span>
                  <span className="text-[10px] text-slate-400 block">Logged at: {new Date(log.checkedAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="bg-slate-950 text-slate-300 px-3 py-1 rounded-lg border border-slate-800">
                  Sources Checked: {log.matchingSources}/{log.sourcesChecked}
                </span>
                <span className={`px-3 py-1 rounded-lg border font-bold ${
                  log.hallucinationRisk === 'LOW' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-amber-950 text-amber-400 border-amber-800'
                }`}>
                  Hallucination Risk: {log.hallucinationRisk}
                </span>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs">
              <span className="text-slate-400 font-semibold block mb-1">Evaluated Claim:</span>
              <p className="text-slate-200">{log.claim}</p>
            </div>

            <p className="text-xs text-slate-400 italic">
              Audit Note: {log.notes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
