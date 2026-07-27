import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { Cpu, ArrowLeft, ShieldCheck, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface TopicPageProps {
  params: {
    slug: string;
  };
}

export default function TopicPage({ params }: TopicPageProps) {
  const topic = db.getTopicBySlug(params.slug);
  if (!topic) notFound();

  const articles = db.getArticles(undefined, topic.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link href="/" className="text-xs text-brand-400 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Coverage Hubs</span>
        </Link>

        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-brand-950/60 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-brand-500/20 text-brand-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-brand-500/30">
              TOPIC CLUSTER
            </span>
            <span className="bg-emerald-950 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-800/40 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Search Demand: {topic.searchDemand}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            {topic.name}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            {topic.description}
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
            <span>Verified Articles: <strong className="text-white">{articles.length}</strong></span>
            <span>•</span>
            <span>Fact-Check Threshold: <strong className="text-emerald-400">80% Trust Score Minimum</strong></span>
          </div>
        </div>
      </div>

      {/* Grid of Topic Articles */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Verified Stories in {topic.name}</span>
        </h2>

        {articles.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-3">
            <Cpu className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-slate-400 text-sm">No stories currently published under this cluster.</p>
            <Link href="/admin/automation" className="text-xs text-brand-400 font-bold hover:underline">
              Run Automation Pipeline to generate articles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
