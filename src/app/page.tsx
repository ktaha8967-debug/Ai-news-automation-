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
    <div className="space-y-10 pb-16 bg-slate-50 min-h-screen">
      {/* Live Breaking News Ticker */}
      <NewsTicker articles={articles} />

      {/* STUNNING Light Theme Hero Header Section */}
      <section className="bg-gradient-to-b from-sky-100/60 via-indigo-50/40 to-slate-50 py-12 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full pill-sky text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Reliable & Fact-Checked Artificial Intelligence News</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight">
              Fact-Checked AI News <br />
              <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                Simple, Honest & Automated
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              We collect trending artificial intelligence news from top research labs and tech websites, verify the facts across independent sources, and publish clean, reliable articles every day.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 flex flex-wrap justify-center items-center gap-4 text-xs text-slate-700">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Trust Rating: <strong className="text-slate-900 font-bold">{stats.avgTrustScore}% Verified</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Published Stories: <strong className="text-slate-900 font-bold">{stats.verifiedArticles} Verified</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                <Activity className="w-4 h-4 text-purple-600" />
                <span>Fact Checking: <strong className="text-slate-900 font-bold">100% Active</strong></span>
              </div>
            </div>
          </div>

          {/* Lead Featured Story */}
          {featuredArticle && (
            <div>
              <ArticleCard article={featuredArticle} featured />
            </div>
          )}
        </div>
      </section>

      {/* Category Quick Filter Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-sky-600" />
              <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider font-heading">Popular AI Categories</h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">Explore Topics</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {topics.map((t) => (
              <Link
                key={t.id}
                href={`/topics/${t.slug}`}
                className="bg-slate-50 hover:bg-sky-50 p-4 rounded-xl border border-slate-200 hover:border-sky-300 transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1 font-heading">{t.name}</span>
                  <span className="text-[10px] pill-sky font-bold px-2 py-0.5 rounded-full font-mono">
                    {t.articleCount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{t.searchDemand}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 transition-transform text-sky-600" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main News Feed & Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
              <h3 className="text-lg font-extrabold text-slate-900 font-heading flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Latest Verified AI News</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">Updated Daily</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {remainingArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Fact-Checking Guarantee Box */}
            <div className="bg-gradient-to-br from-white via-white to-sky-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm font-heading">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>100% Fact Checked Guarantee</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Every story is cross-checked across at least two independent sources. If a story cannot be verified with 80%+ accuracy, it is held in our review queue and will not be published.
              </p>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-500">Verification Requirement:</span>
                <span className="text-emerald-600 font-bold">80% Minimum Score</span>
              </div>
            </div>

            {/* Trending Topics Today */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span>Trending AI Topics Today</span>
                </h4>
              </div>

              <div className="space-y-3">
                {[
                  { tag: 'Quantum AI Reasoning', demand: 'Very Popular', trend: '+140% 24h' },
                  { tag: '3nm AI Hardware Chips', demand: 'High Interest', trend: '+92% 24h' },
                  { tag: 'Autonomous Coding Agents', demand: 'Very Popular', trend: '+85% 24h' },
                  { tag: 'Groq Llama 3.3 Model', demand: 'Trending Now', trend: '+74% 24h' },
                  { tag: 'Google Discover AI News', demand: 'Trending Now', trend: '+60% 24h' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block font-heading">{item.tag}</span>
                      <span className="text-[10px] text-slate-500">{item.demand}</span>
                    </div>
                    <span className="text-[10px] font-bold pill-emerald px-2 py-0.5 rounded-full">
                      {item.trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Commitment */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 font-bold text-sm font-heading">
                <Award className="w-4 h-4" />
                <span>Original & High Quality</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Our articles are original, structured with clear titles, key summaries, and verified expert author profiles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
