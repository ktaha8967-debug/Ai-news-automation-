import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { NewsTicker } from '@/components/NewsTicker';
import { Clock, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const articles = db.getArticles();
  const topics = db.getTopics();

  const leadStory = articles.find(a => a.isFeatured) || articles[0];
  const secondaryStories = articles.filter(a => a.id !== leadStory?.id).slice(0, 3);
  const remainingArticles = articles.filter(a => a.id !== leadStory?.id && !secondaryStories.some(s => s.id === a.id));

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* Breaking News Ticker */}
      <NewsTicker articles={articles} />

      {/* Main Newspaper Spotlight Front Page */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 news-border-b">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Lead Feature (8 Cols) */}
          {leadStory && (
            <div className="lg:col-span-8 lg:pr-6 lg:border-r border-slate-200 space-y-5 group">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-widest font-heading">
                <span>Top Story</span>
                <span className="text-slate-300">•</span>
                <span>{leadStory.category}</span>
              </div>

              <Link href={`/news/${leadStory.slug}`}>
                <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight group-hover:text-sky-700 transition-colors">
                  {leadStory.title}
                </h2>
              </Link>

              <div className="relative h-[320px] sm:h-[440px] w-full rounded-xl overflow-hidden bg-slate-100 my-4">
                <img
                  src={leadStory.featuredImage}
                  alt={leadStory.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>

              <p className="text-slate-700 text-base leading-relaxed font-sans max-w-3xl">
                {leadStory.summary}
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2 font-medium">
                  <img src={leadStory.author.avatar} alt={leadStory.author.name} className="w-6 h-6 rounded-full object-cover border border-slate-200" />
                  <span className="font-bold text-slate-900">{leadStory.author.name}</span>
                  <span>•</span>
                  <span>{leadStory.author.role}</span>
                </div>
                <span className="font-mono text-slate-400">{leadStory.readTimeMinutes} min read</span>
              </div>
            </div>
          )}

          {/* Secondary Top Headlines Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border-b border-slate-900 pb-2">
              <h3 className="font-heading font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                Trending Headlines
              </h3>
            </div>

            <div className="space-y-6">
              {secondaryStories.map((story) => (
                <div key={story.id} className="group space-y-2 news-border-b pb-5 last:border-0">
                  <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider font-heading">
                    {story.category}
                  </span>

                  <Link href={`/news/${story.slug}`}>
                    <h4 className="font-headline text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug">
                      {story.title}
                    </h4>
                  </Link>

                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                    {story.summary}
                  </p>

                  <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{story.readTimeMinutes} min read</span>
                    <span>•</span>
                    <span>{story.author.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Topic Directory */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-heading text-xs font-bold text-slate-900 uppercase tracking-wider">
                Browse Topics
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {topics.map((t) => (
                  <Link
                    key={t.id}
                    href={`/topics/${t.slug}`}
                    className="bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 text-xs px-2.5 py-1 rounded-md border border-slate-200 transition-colors font-medium"
                  >
                    {t.name} ({t.articleCount})
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Articles Grid & Topic Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Latest Articles Feed (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="border-b border-slate-900 pb-3 flex items-center justify-between">
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                Latest Reporting & Analysis
              </h3>
              <span className="text-xs text-slate-500 font-medium">Updated Daily</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {remainingArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Editorial Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Journalistic Commitment Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm font-heading">
                <BookOpen className="w-4 h-4 text-sky-700" />
                <span>Editorial Standard</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Worldwide AI News is an automated technical news service. Every story is cross-referenced across technical repositories and research publications before publication.
              </p>
              <Link href="/editorial-standards" className="inline-flex items-center gap-1 text-xs text-sky-700 font-bold hover:underline">
                <span>Read Verification Guidelines</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Coverage Directory */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <h4 className="font-heading text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Coverage Desk Index
              </h4>
              <div className="space-y-2 text-xs">
                {topics.map((t) => (
                  <Link
                    key={t.id}
                    href={`/topics/${t.slug}`}
                    className="flex items-center justify-between text-slate-700 hover:text-sky-700 py-1.5 border-b border-slate-50 last:border-0"
                  >
                    <span className="font-medium">{t.name}</span>
                    <span className="text-slate-400 font-mono">{t.articleCount} articles</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
