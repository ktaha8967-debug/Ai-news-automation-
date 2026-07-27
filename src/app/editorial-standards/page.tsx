import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, AlertTriangle, Cpu, FileText, ArrowLeft } from 'lucide-react';

export default function EditorialStandardsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/" className="text-xs text-brand-400 hover:underline flex items-center gap-1 font-bold">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </Link>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full verified-pill text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Our Fact Verification Process</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          How We Check Facts & Guarantee Real News
        </h1>

        <p className="text-slate-300 text-base leading-relaxed font-sans">
          The Worldwide AI News Network follows simple, strict rules to ensure every story published is 100% accurate, verified by official sources, and free of fake news or hallucinations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#131b2e] border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white font-heading">1. Checking Multiple Real Sources</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Every story must be confirmed by at least two separate official websites or academic databases (like MIT, IEEE, ArXiv, or TechCrunch) before it is published.
          </p>
        </div>

        <div className="bg-[#131b2e] border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white font-heading">2. 80% Minimum Score Requirement</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            If a story cannot be verified with at least 80% confidence, it is automatically held in our review queue and will not be published automatically.
          </p>
        </div>

        <div className="bg-[#131b2e] border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white font-heading">3. Groq AI & Zero-Cost Model</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            We use Groq's free AI models (Llama 3.3) for writing high quality articles. If the API is unavailable, our offline system writes original structured news with zero cost.
          </p>
        </div>

        <div className="bg-[#131b2e] border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white font-heading">4. High-Res Images & Clear SEO</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            All articles feature 1200px+ high-definition images, NewsArticle Google schema markup, Google News XML sitemaps, and verified author profiles.
          </p>
        </div>
      </div>
    </div>
  );
}
