import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ShieldCheck, Zap, FileText, Activity, CheckCircle2, AlertTriangle, Eye, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AdminDashboardPage() {
  const stats = db.getStats();
  const articles = db.getArticles();
  const logs = db.getAutomationLogs().slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            System Control & Automation Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry for news research, fact verification, Groq AI model generation, and SEO sitemaps.
          </p>
        </div>

        <Link
          href="/admin/automation"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-brand-600/20 hover:opacity-90 transition-opacity"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Launch Automation Pipeline</span>
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Published Stories</span>
            <FileText className="w-4 h-4 text-brand-400" />
          </div>
          <p className="text-2xl font-extrabold text-white font-display">{stats.totalArticles}</p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {stats.verifiedArticles} 100% Verified
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Trust Score Average</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400 font-display">{stats.avgTrustScore}%</p>
          <p className="text-[11px] text-slate-400">Target Threshold: 80% Min</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Review Queue</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400 font-display">{stats.needsReviewArticles}</p>
          <p className="text-[11px] text-slate-400">Held for low confidence score</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Organic Reads</span>
            <Eye className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-purple-300 font-display">{stats.totalViews.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400">Google Discover Ready</p>
        </div>
      </div>

      {/* Main Grid: Recent Articles & Automation Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Article Manager Quick Table (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Recent Articles in Database</h3>
            <Link href="/admin/articles" className="text-xs text-brand-400 hover:underline flex items-center gap-1 font-medium">
              <span>View All Queue</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {articles.slice(0, 4).map((art) => (
              <div key={art.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider">{art.category}</span>
                  <Link href={`/news/${art.slug}`} target="_blank" className="font-semibold text-xs text-white hover:text-brand-300 block truncate">
                    {art.title}
                  </Link>
                </div>
                <div className="shrink-0 flex items-center gap-3">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    art.verificationStatus === 'VERIFIED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' : 'bg-amber-950 text-amber-400'
                  }`}>
                    {art.trustScore}% Score
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automation Task Logs (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Recent Automation Execution Logs</span>
            </h3>
            <Link href="/admin/logs" className="text-xs text-brand-400 hover:underline">
              Full Logs
            </Link>
          </div>

          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">{log.taskName}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded">
                    {log.durationMs}ms
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] line-clamp-1">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
