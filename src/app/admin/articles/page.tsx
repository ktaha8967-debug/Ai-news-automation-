import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ShieldCheck, AlertTriangle, FileText, CheckCircle2, ExternalLink, Search, Filter } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function ArticleReviewPage() {
  const articles = db.getArticles();
  const verifiedCount = articles.filter(a => a.verificationStatus === 'VERIFIED').length;
  const reviewCount = articles.filter(a => a.verificationStatus === 'NEEDS_REVIEW').length;

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1 font-heading">
            <FileText className="w-4 h-4 text-sky-600" />
            <span>Content Publishing & Verification Queue</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Article Review & Queue Controls
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Inspect live stories, review verification scores, and manage articles stored in database.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 font-mono">
            {verifiedCount} Verified
          </div>
          {reviewCount > 0 && (
            <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 font-mono">
              {reviewCount} In Review
            </div>
          )}
        </div>
      </div>

      {/* Main Articles Table Container */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        {/* Table Controls */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 font-heading">
            <span>Total Stored Articles:</span>
            <span className="bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full font-mono">{articles.length} Stories</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Fact Confidence Threshold: 80% Minimum</span>
          </div>
        </div>

        {/* Article List */}
        <div className="divide-y divide-slate-100">
          {articles.map((art) => (
            <div key={art.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="bg-sky-50 text-sky-700 font-extrabold uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded border border-sky-200 font-heading">
                    {art.category}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-medium text-[11px]">Authored by <strong className="text-slate-700">{art.author.name}</strong></span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400 font-mono text-[11px]">{new Date(art.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 font-heading hover:text-sky-700 transition-colors">
                  <Link href={`/news/${art.slug}`} target="_blank">
                    {art.title}
                  </Link>
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-sans">{art.summary}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-mono ${
                  art.verificationStatus === 'VERIFIED'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{art.trustScore}% Score ({art.verificationStatus})</span>
                </span>

                <Link
                  href={`/news/${art.slug}`}
                  target="_blank"
                  className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-sky-700 hover:bg-sky-50 border border-slate-200 transition-all"
                  title="View Live Article Page"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

