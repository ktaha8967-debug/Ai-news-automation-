import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, AlertTriangle, Cpu, FileText, ArrowLeft, RefreshCw } from 'lucide-react';

export default function EditorialStandardsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/" className="text-xs text-brand-400 hover:underline flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </Link>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glow-pill text-xs font-semibold text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>E-E-A-T & Transparency Framework</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Editorial & Automated Fact-Verification Policy
        </h1>

        <p className="text-slate-300 text-base leading-relaxed">
          The Worldwide AI News Automation System operates under strict empirical integrity protocols. Our mission is to provide zero-hallucination, multi-source validated AI reporting at scale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white font-display">1. Multi-Source Cross-Verification</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every raw news item must be independently validated across at least two distinct academic or technical repositories (e.g. ArXiv, MIT CSAIL, IEEE, or official foundry releases) before being processed into article drafts.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white font-display">2. 80% Trust Score Auto-Publish Guard</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Stories failing to achieve an 80% confidence score are automatically withheld from public indexing and sent to the Admin Review Queue for human oversight.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white font-display">3. Groq API & Zero-Cost Model</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our platform leverages Groq’s free Llama 3.3 70B tier for natural language generation. In offline mode, an intelligent rule-based synthesis engine ensures 100% operational uptime without paid dependencies.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white font-display">4. NewsArticle Schema & Google Discover</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Full compliance with Google News indexing rules, featuring structured JSON-LD NewsArticle markup, 1200px+ high-res image automation, breadcrumb schemas, and Google News XML sitemaps.
          </p>
        </div>
      </div>
    </div>
  );
}
