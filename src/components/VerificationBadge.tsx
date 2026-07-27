'use client';

import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, CheckCircle2, ChevronDown, Info } from 'lucide-react';
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
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold verified-pill">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>{score}% Verified</span>
      </div>
    );
  }

  return (
    <div className="bg-[#131b2e] border border-slate-800 rounded-2xl p-5 my-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-extrabold shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white font-heading">Fact Check Rating: {score}%</span>
              <span className="verified-pill text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {isVerified ? 'VERIFIED REAL NEWS' : 'NEEDS EDITORIAL REVIEW'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Verified by checking {sources.length} independent official sources
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-white font-semibold bg-slate-900/80 hover:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 transition-colors"
        >
          <Info className="w-4 h-4 text-brand-400" />
          <span>{showDetails ? 'Hide Sources' : 'View Verified Sources'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-heading">Official Sources Checked</h4>
          <div className="space-y-2">
            {sources.map((src) => (
              <div key={src.id} className="flex items-start justify-between gap-3 bg-[#0b0f19] p-3 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white font-heading">{src.sourceName}</span>
                    <p className="text-slate-300 text-xs mt-0.5">{src.claim}</p>
                  </div>
                </div>
                <a 
                  href={src.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-400 hover:underline flex items-center gap-1 shrink-0 font-semibold text-xs"
                >
                  <span>Open Link</span>
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
