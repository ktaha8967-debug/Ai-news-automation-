import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { NewsTicker } from '@/components/NewsTicker';
import { Clock, ArrowUpRight, ChevronRight, TrendingUp, BookOpen, ShieldCheck, Sparkles, Cpu, Bot, Zap, Eye, Layers } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const articles = db.getArticles();
  const topics = db.getTopics();

  // Lead spotlight story & secondary breaking stories
  const leadStory = articles.find(a => a.isFeatured) || articles[0];
  const secondaryStories = articles.filter(a => a.id !== leadStory?.id).slice(0, 4);

  // Latest Published Articles Stream (Cap at Max 20 articles: newest top, older decrease off end)
  const latestNewsStream = articles.slice(0, 20);

  // Deep dive special reports (stories 5 to 8 for featured section)
  const specialReports = articles.filter(a => a.id !== leadStory?.id && !secondaryStories.some(s => s.id === a.id)).slice(0, 3);

  return (
    <div className="bg-[#fafafa] min-h-screen pb-24 font-sans text-slate-900">
      {/* Breaking News Ticker */}
      <NewsTicker articles={articles} />

      {/* EDITORIAL FRONT PAGE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 news-border-b">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Lead Spotlight Story (7 Cols) */}
          {leadStory && (
            <div className="lg:col-span-7 lg:pr-8 lg:border-r border-slate-200 space-y-5 group">
              <div className="relative h-[340px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-slate-200 shadow-md">
                <Image
                  src={leadStory.featuredImage}
                  alt={leadStory.title}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                  priority
                />
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-widest font-heading shadow-md">
                  {leadStory.category}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <span className="font-bold text-sky-700 uppercase tracking-wider">LEAD STORY</span>
                  <span>•</span>
                  <span>{new Date(leadStory.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>{leadStory.readTimeMinutes} min read</span>
                </div>

                <Link href={`/news/${leadStory.slug}`}>
                  <h2 className="font-headline text-2xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 leading-tight group-hover:text-sky-700 transition-colors">
                    {leadStory.title}
                  </h2>
                </Link>

                <p className="text-slate-600 text-base leading-relaxed font-sans line-clamp-3">
                  {leadStory.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden relative border border-slate-200 shrink-0 shadow-xs">
                    <Image src={leadStory.author.avatar} alt={leadStory.author.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 font-heading text-xs">{leadStory.author.name}</p>
                    <p className="text-[11px] text-slate-500">{leadStory.author.role}</p>
                  </div>
                </div>

                <Link 
                  href={`/news/${leadStory.slug}`}
                  className="text-sky-700 font-bold hover:underline flex items-center gap-1 text-xs font-heading"
                >
                  <span>Read Full Coverage</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Secondary Top Breaking Headlines Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
              <h3 className="font-heading font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                Top Breaking Headlines
              </h3>
              <span className="text-[11px] font-bold text-sky-700 font-mono">Live Feed</span>
            </div>

            <div className="space-y-5">
              {secondaryStories.map((story) => (
                <div key={story.id} className="group grid grid-cols-12 gap-4 items-center pb-4 border-b border-slate-200 last:border-0">
                  <div className="col-span-8 space-y-1.5">
                    <span className="text-[10px] font-bold text-sky-700 uppercase tracking-widest font-heading block">
                      {story.category}
                    </span>

                    <Link href={`/news/${story.slug}`}>
                      <h4 className="font-headline text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug line-clamp-2">
                        {story.title}
                      </h4>
                    </Link>

                    <div className="text-[11px] text-slate-400 flex items-center gap-2 font-mono pt-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{story.readTimeMinutes} min read</span>
                      <span>•</span>
                      <span>{story.author.name}</span>
                    </div>
                  </div>

                  <div className="col-span-4 relative h-20 w-full rounded-xl overflow-hidden bg-slate-100 shadow-xs">
                    <Image
                      src={story.featuredImage}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Fact-Check Verification Standard Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Journalistic Verification Standard</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Every story published by Worldwide AI News is verified against peer-reviewed preprints, technical repositories, and official lab announcements before release.
              </p>
              <Link href="/editorial-standards" className="inline-flex items-center gap-1 text-xs text-sky-700 font-bold hover:underline">
                <span>View Reporting Code & Guidelines</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COVERAGE DESKS INDEX STRIP */}
      <section className="bg-white border-y border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-base text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-600" />
              <span>Coverage Desks Index</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Explore All Desks</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {topics.map((t) => (
              <Link
                key={t.id}
                href={`/topics/${t.slug}`}
                className="bg-slate-50 hover:bg-sky-50 p-4 rounded-2xl border border-slate-200 hover:border-sky-300 transition-all group shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-1 font-heading">
                    {t.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-sans">
                  {t.description}
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] text-sky-700 font-bold font-mono">
                  <span>{t.articleCount} Stories</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DEEP DIVES & SPECIAL REPORTS */}
      {specialReports.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 news-border-b">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-600" />
                <h3 className="font-heading font-extrabold text-xl text-slate-900">
                  Featured Deep Dives & Special Reports
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500">Peer-Verified Analyses</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specialReports.map((report) => (
                <div key={report.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 hover:shadow-md transition-all group">
                  <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-100">
                    <Image
                      src={report.featuredImage}
                      alt={report.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-sky-900/90 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {report.category}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{report.readTimeMinutes} min read</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {report.trustScore}% Trust
                      </span>
                    </div>

                    <Link href={`/news/${report.slug}`}>
                      <h4 className="font-headline text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug line-clamp-2">
                        {report.title}
                      </h4>
                    </Link>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {report.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>By {report.author.name}</span>
                    <Link href={`/news/${report.slug}`} className="text-sky-700 font-bold hover:underline flex items-center gap-1 font-heading text-[11px]">
                      <span>Read Story</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LATEST PUBLISHED ARTICLES FEED (CAPPED AT 20 MAX) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Latest Articles Feed Stream (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="border-b-2 border-slate-900 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-slate-900">
                  Latest Reporting & Analysis Stream
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing top 20 latest verified news stories. New stories automatically push older articles down.
                </p>
              </div>
              <span className="text-xs text-sky-700 font-mono font-bold bg-sky-50 px-3 py-1 rounded-full border border-sky-200 shrink-0">
                {latestNewsStream.length} / 20 Active Stream
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {latestNewsStream.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Editorial Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Editor's Desk Directory */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <h4 className="font-heading text-sm font-bold text-slate-900 border-b border-slate-100 pb-2.5 uppercase tracking-wider">
                Desks Directory
              </h4>
              <div className="space-y-3 text-xs">
                {topics.map((t) => (
                  <Link
                    key={t.id}
                    href={`/topics/${t.slug}`}
                    className="flex items-center justify-between text-slate-700 hover:text-sky-700 py-1.5 border-b border-slate-100 last:border-0 transition-colors"
                  >
                    <span className="font-semibold">{t.name}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{t.articleCount} articles</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Verification Telemetry Badge */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider font-heading border-b border-slate-100 pb-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verification Intelligence</span>
              </div>
              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Verification Rate:</span>
                  <span className="text-emerald-700 font-bold">100% Peer-Checked</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Scan Pipeline:</span>
                  <span className="text-sky-700 font-bold">3x Daily Automated</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Hallucination Guard:</span>
                  <span className="text-emerald-700 font-bold">Multi-Source Cross</span>
                </div>
              </div>
            </div>

            {/* Journalistic Code */}
            <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900 font-heading">
                <BookOpen className="w-4 h-4 text-sky-700" />
                <span>Journalistic Standards</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Articles published on Worldwide AI News strictly adhere to multi-source verification and claim validation.
              </p>
              <Link href="/editorial-standards" className="text-sky-700 font-bold hover:underline block pt-1">
                Read Ethics & Standards Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
