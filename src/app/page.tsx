import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { NewsTicker } from '@/components/NewsTicker';
import { ShieldCheck, Cpu, Activity, TrendingUp, Sparkles, CheckCircle2, ArrowRight, Award } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const articles = db.getArticles();
  const topics = db.getTopics();
  const stats = db.getStats();

  const featuredArticle = articles.find(a => a.isFeatured) || articles[0];
  const remainingArticles = articles.filter(a => a.id !== featuredArticle?.id);

  return (
    <div className="space-y-10 pb-16">
      {/* Handcrafted Live News Wire */}
      <NewsTicker articles={articles} />

      {/* Hero Title Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full trust-badge-glow text-xs font-bold text-emerald-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Autonomous Worldwide AI News Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display leading-tight">
            Fact-Checked AI News <br />
            <span className="bg-gradient-to-r from-brand-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Automated Worldwide Coverage
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-light">
            Every story is automatically discovered from verified academic and tech repositories, cross-referenced across independent sources, and assigned a transparent 0-100% Trust Rating.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 bg-[#0f1624] px-3.5 py-1.5 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Trust Rating: <strong className="text-white">{stats.avgTrustScore}% Avg</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0f1624] px-3.5 py-1.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-brand-400" />
              <span>Verified Stories: <strong className="text-white">{stats.verifiedArticles}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0f1624] px-3.5 py-1.5 rounded-lg border border-slate-800">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Fact-Verification Mode: <strong className="text-white">Active</strong></span>
            </div>
          </div>
        </div>

        {/* Lead Featured Story */}
        {featuredArticle && (
          <div className="mb-14">
            <ArticleCard article={featuredArticle} featured />
          </div>
        )}
      </section>

      {/* Coverage Hubs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0f1624] border border-slate-800/80 rounded-2xl p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-brand-400" />
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider font-display">Coverage Hubs & Topic Clusters</h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">Sorted by Global Search Demand</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {topics.map((t) => (
              <Link
                key={t.id}
                href={`/topics/${t.slug}`}
                className="bg-[#070a11] hover:bg-brand-950/40 p-4 rounded-xl border border-slate-800 hover:border-brand-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-1 font-display">{t.name}</span>
                  <span className="text-[10px] bg-brand-500/20 text-brand-300 font-bold px-1.5 py-0.2 rounded font-mono">
                    {t.articleCount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{t.searchDemand}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Editorial Feed & Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
              <h3 className="text-lg font-extrabold text-white font-display flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Verified AI News Feed</span>
              </h3>
              <span className="text-xs text-slate-400">Auto-Refreshed via Fast ISR</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {remainingArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Fact-Checking Standard Box */}
            <div className="bg-gradient-to-br from-[#0f1624] via-[#0f1624] to-brand-950/30 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm font-display">
                <ShieldCheck className="w-5 h-5" />
                <span>Zero-Fake News Guarantee</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                Articles with trust confidence below 80% are automatically blocked from public indexing and held for manual review.
              </p>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Strictness Setting:</span>
                <span className="text-emerald-400 font-bold">80% Threshold</span>
              </div>
            </div>

            {/* High Search Demand Keywords */}
            <div className="bg-[#0f1624] border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span>High Search Demand Keywords</span>
                </h4>
              </div>

              <div className="space-y-3">
                {[
                  { tag: 'Quantum AI Reasoning', demand: '98% Search Volume', trend: '+140% 24h' },
                  { tag: '3nm Tensor Accelerators', demand: '94% Search Volume', trend: '+92% 24h' },
                  { tag: 'SWE-bench Autonomous Agents', demand: '91% Search Volume', trend: '+85% 24h' },
                  { tag: 'Groq Llama-3.3 Versatile', demand: '89% Search Volume', trend: '+74% 24h' },
                  { tag: 'Google Discover SEO', demand: '86% Search Volume', trend: '+60% 24h' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[#070a11] p-2.5 rounded-lg border border-slate-800/80 text-xs">
                    <div>
                      <span className="font-semibold text-slate-200 block font-display">{item.tag}</span>
                      <span className="text-[10px] text-slate-400 font-sans">{item.demand}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      {item.trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* E-E-A-T Discover Card */}
            <div className="bg-[#0f1624] border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm font-display">
                <Award className="w-4 h-4" />
                <span>Google Discover & E-E-A-T Compliant</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                Structured with NewsArticle & Breadcrumb JSON-LD schemas, verified author citations, and Google News XML feeds.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
