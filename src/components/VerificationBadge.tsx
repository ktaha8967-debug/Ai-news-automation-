'use client';

import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, ExternalLink, CheckCircle2, ChevronDown, Info } from 'lucide-react';
import { SourceReference, VerificationStatus } from '@/types';

interface VerificationBadgeProps {
  score: number;
  status: VerificationStatus;
  sources: SourceReference[];
  compact?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ score, status, sources, compact = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  const isVerified = status === 'VERIFIED' && score >= 80;

  if (compact) {
    return (
      <div 
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
          isVerified 
            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
            : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
        }`}
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>{score}% Verified</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 my-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
            isVerified 
              ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' 
              : 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
          }`}>
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">Fact Verification Index: {score}%</span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                isVerified 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {isVerified ? 'VERIFIED REAL NEWS' : 'NEEDS EDITORIAL REVIEW'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Cross-referenced against {sources.length} independent academic & technical sources
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 font-medium bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showDetails ? 'Hide Source Logs' : 'View Verified Sources'}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-slate-800 space-y-2.5">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Independent References Checked</h4>
          <div className="space-y-2">
            {sources.map((src) => (
              <div key={src.id} className="flex items-start justify-between gap-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-200">{src.sourceName}</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">{src.claim}</p>
                  </div>
                </div>
                <a 
                  href={src.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-400 hover:text-brand-300 flex items-center gap-1 shrink-0 font-medium text-[11px]"
                >
                  <span>Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
