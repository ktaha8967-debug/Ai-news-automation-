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
    <div className="space-y-8 text-slate-800 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            System Control & Automation Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time telemetry for news research, fact verification, Groq AI model generation, and SEO sitemaps.
          </p>
        </div>

        <Link
          href="/admin/automation"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Launch Automation Pipeline</span>
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider font-heading">Total Published Stories</span>
            <FileText className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-heading">{stats.totalArticles}</p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {stats.verifiedArticles} 100% Verified
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider font-heading">Trust Score Average</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 font-heading">{stats.avgTrustScore}%</p>
          <p className="text-[11px] text-slate-500">Target Threshold: 80% Min</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider font-heading">Review Queue</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600 font-heading">{stats.needsReviewArticles}</p>
          <p className="text-[11px] text-slate-500">Held for low confidence score</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider font-heading">Total Organic Reads</span>
            <Eye className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-purple-600 font-heading">{stats.totalViews.toLocaleString()}</p>
          <p className="text-[11px] text-slate-500">Google Discover Ready</p>
        </div>
      </div>

      {/* Main Grid: Recent Articles & Automation Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Article Manager Quick Table (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading">Recent Articles in Database</h3>
            <Link href="/admin/articles" className="text-xs text-sky-600 hover:underline flex items-center gap-1 font-bold">
              <span>View All Queue</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {articles.slice(0, 4).map((art) => (
              <div key={art.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider font-heading">{art.category}</span>
                  <Link href={`/news/${art.slug}`} target="_blank" className="font-bold text-xs text-slate-900 hover:text-sky-600 block truncate font-heading">
                    {art.title}
                  </Link>
                </div>
                <div className="shrink-0 flex items-center gap-3">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    art.verificationStatus === 'VERIFIED' ? 'pill-emerald' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {art.trustScore}% Score
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automation Task Logs (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-600" />
              <span>Recent Automation Logs</span>
            </h3>
            <Link href="/admin/logs" className="text-xs text-sky-600 hover:underline font-bold">
              Full Logs
            </Link>
          </div>

          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-heading">
                  <span className="font-bold text-slate-900">{log.taskName}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-mono">
                    {log.durationMs}ms
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] line-clamp-1">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
