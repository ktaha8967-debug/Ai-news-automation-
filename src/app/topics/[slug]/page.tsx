import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { ArrowLeft, BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface TopicPageProps {
  params: {
    slug: string;
  };
}

export default function TopicPage({ params }: TopicPageProps) {
  const topic = db.getTopicBySlug(params.slug);

  if (!topic) {
    notFound();
  }

  const articles = db.getArticles(undefined, topic.slug);

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* Top Breadcrumb */}
      <div className="border-b border-slate-100 py-3 bg-slate-50 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="hover:text-sky-700 flex items-center gap-1 font-bold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Latest News</span>
          </Link>
          <div className="flex items-center gap-2">
            <span>Desks</span>
            <span>/</span>
            <span className="text-slate-900 font-bold">{topic.name}</span>
          </div>
        </div>
      </div>

      {/* Topic Desk Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 news-border-b">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-widest font-heading">
            <BookOpen className="w-4 h-4" />
            <span>Editorial Desk Index</span>
          </div>
          <h1 className="font-headline text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            {topic.name}
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            {topic.description}
          </p>
        </div>
      </div>

      {/* Articles Feed Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="font-heading font-extrabold text-lg text-slate-900">
              Published Reporting ({articles.length} Stories)
            </h2>
            <span className="text-xs text-slate-500 font-mono">Sorted by recency</span>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-12 text-center text-slate-500 text-sm">
              No published articles found in this desk index yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
