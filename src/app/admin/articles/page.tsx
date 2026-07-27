import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ShieldCheck, AlertTriangle, FileText, CheckCircle2, Trash2, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function ArticleReviewPage() {
  const articles = db.getArticles();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Article Review & Queue Controls
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect, edit, force approve, or remove articles from the database and Google News sitemaps.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span className="font-bold text-white uppercase tracking-wider font-display">Total Articles in DB ({articles.length})</span>
          <span>Fact Threshold: 80% Min</span>
        </div>

        <div className="divide-y divide-slate-800">
          {articles.map((art) => (
            <div key={art.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/40 hover:bg-slate-900/60 transition-colors">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-brand-400 font-bold uppercase tracking-wider">{art.category}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">Authored by {art.author.name}</span>
                </div>
                <h3 className="font-bold text-sm text-white font-display">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1">{art.summary}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                  art.verificationStatus === 'VERIFIED'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                    : 'bg-amber-950 text-amber-400 border border-amber-800/40'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{art.trustScore}% Score ({art.verificationStatus})</span>
                </span>

                <Link
                  href={`/news/${art.slug}`}
                  target="_blank"
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="View Live Page"
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
