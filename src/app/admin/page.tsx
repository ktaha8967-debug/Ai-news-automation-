import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ShieldCheck, Zap, FileText, Activity, CheckCircle2, AlertTriangle, Eye, ArrowRight, Server, RefreshCw } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AdminDashboardPage() {
  const articles = db.getArticles();
  const verificationLogs = db.getVerificationLogs();
  const automationLogs = db.getAutomationLogs();
  
  // Real dynamic calculation from DB
  const totalArticles = articles.length;
  const verifiedArticles = articles.filter(a => a.verificationStatus === 'VERIFIED').length;
  const needsReviewArticles = articles.filter(a => a.verificationStatus === 'NEEDS_REVIEW').length;
  const avgTrustScore = totalArticles > 0
    ? Math.round(articles.reduce((sum, a) => sum + (a.trustScore || 0), 0) / totalArticles)
    : 0;
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);

  return (
    <div className="space-y-8 text-slate-100 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1 font-heading">
            <Server className="w-4 h-4 text-sky-400" />
            <span>Real-Time Database Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            System Control & Automation Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real data generated and stored in <code className="text-sky-300 font-mono">data/db.json</code>
          </p>
        </div>

        <Link
          href="/admin/automation"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 transition-all shrink-0"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Launch Pipeline</span>
        </Link>
      </div>

      {/* 4 Clean Real Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#0f1624] border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider font-heading">Total Articles</span>
            <FileText className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-heading">{totalArticles}</p>
          <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {verifiedArticles} Verified Stories
          </p>
        </div>

        <div className="bg-[#0f1624] border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider font-heading">Avg Trust Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400 font-heading">{avgTrustScore}%</p>
          <p className="text-[11px] text-slate-400">Calculated from {totalArticles} records</p>
        </div>

        <div className="bg-[#0f1624] border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider font-heading">Held in Review</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-amber-400 font-heading">{needsReviewArticles}</p>
          <p className="text-[11px] text-slate-400">Under 80% verification score</p>
        </div>

        <div className="bg-[#0f1624] border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider font-heading">Total Story Views</span>
            <Eye className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold text-purple-400 font-heading">{totalViews.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400">Real database view metrics</p>
        </div>
      </div>

      {/* Recent Articles & Recent System Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Real Articles List (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0f1624] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Stored Articles ({articles.length})</h3>
            <Link href="/admin/articles" className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-bold">
              <span>Manage All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {articles.slice(0, 5).map((art) => (
              <div key={art.id} className="bg-[#070a11] p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider font-heading">{art.category}</span>
                  <Link href={`/news/${art.slug}`} target="_blank" className="font-bold text-xs text-white hover:text-sky-300 block truncate font-heading">
                    {art.title}
                  </Link>
                  <p className="text-[11px] text-slate-400 font-mono">By {art.author.name} • {new Date(art.publishedAt).toLocaleDateString()}</p>
                </div>
                <div className="shrink-0 flex items-center gap-3">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    art.verificationStatus === 'VERIFIED' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60' : 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                  }`}>
                    {art.trustScore}% Score
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Automation Task Logs (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0f1624] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Real Automation Logs</span>
            </h3>
            <Link href="/admin/logs" className="text-xs text-sky-400 hover:underline font-bold">
              View All Logs
            </Link>
          </div>

          <div className="space-y-3">
            {automationLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="bg-[#070a11] p-3 rounded-xl border border-slate-800/80 text-xs space-y-1">
                <div className="flex items-center justify-between font-heading">
                  <span className="font-bold text-white">{log.taskName}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50 font-mono">
                    {log.durationMs}ms
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] line-clamp-1">{log.details}</p>
                <p className="text-[10px] text-slate-500 font-mono">{new Date(log.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
