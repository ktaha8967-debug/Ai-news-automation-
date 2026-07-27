import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { NewsTicker } from '@/components/NewsTicker';
import { HeroCarousel } from '@/components/HeroCarousel';
import { Clock, ArrowUpRight, ChevronRight, TrendingUp, BookOpen, ShieldCheck, Sparkles, Flame, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const articles = db.getArticles();
  const topics = db.getTopics();

  // Top 3 latest news stories for interactive Hero Carousel
  const featuredArticles = articles.slice(0, 3);

  // Secondary breaking headlines (stories right after carousel)
  const topHeadlines = articles.slice(5, 9);

  // Deep Dive Special Reports (stories 9 to 12)
  const specialReports = articles.slice(9, 12);

  // Latest Published Articles Stream (Cap at 20 max, newest top)
  const latestNewsStream = articles.slice(0, 20);

  return (
    <div className="bg-[#fafafa] min-h-screen pb-24 font-sans text-slate-900">
      {/* Breaking News Ticker */}
      <NewsTicker articles={articles} />

      {/* HERO SECTION WITH FEATURED CAROUSEL & BREAKING HEADLINES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 news-border-b">
        <div className="space-y-8">
          {/* Top Interactive Hero Carousel Slider */}
          <HeroCarousel articles={featuredArticles} />

          {/* Secondary Top Breaking Headlines Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            {/* 4 Trending Breaking News Items (8 Cols) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="border-b-2 border-slate-900 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 uppercase tracking-wider">
                    Trending Intelligence Briefings
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-sky-700 font-mono bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
                  Live Dispatch
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {topHeadlines.map((story) => (
                  <div key={story.id} className="group space-y-3 pb-5 sm:pb-0 border-b sm:border-b-0 border-slate-100 last:border-0">
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-2xs">
                      <Image
                        src={story.featuredImage}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/90 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {story.category}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{story.readTimeMinutes} min read</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold">{story.trustScore}% Score</span>
                      </div>

                      <Link href={`/news/${story.slug}`}>
                        <h4 className="font-headline text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug line-clamp-2">
                          {story.title}
                        </h4>
                      </Link>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-sans">
                        {story.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Standard Card & Editorial Mission (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold shadow-xs">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading font-extrabold text-base text-slate-900 uppercase tracking-wider">
                    Verification Standard
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Every article published by Worldwide AI News undergoes multi-source claims validation against peer-reviewed ArXiv preprints, MIT CSAIL releases, and technical repositories.
                  </p>
                </div>

                <div className="space-y-2.5 text-xs font-mono pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Fact Confidence:</span>
                    <strong className="text-slate-900">80% Minimum</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Primary Sources:</span>
                    <strong className="text-slate-900">2+ Required</strong>
                  </div>
                </div>

                <Link href="/editorial-standards" className="inline-flex items-center gap-1 text-xs text-sky-700 font-extrabold hover:underline font-heading pt-2">
                  <span>View Reporting Code & Policy</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
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
            <span className="text-xs text-slate-500 font-medium font-mono">Explore All Desks</span>
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
                <div key={report.id} className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 hover:shadow-md transition-all group">
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-100">
                    <Image
                      src={report.featuredImage}
                      alt={report.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/90 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-heading">
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

      {/* LATEST PUBLISHED ARTICLES FEED STREAM (CAPPED AT 20 MAX) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Latest Articles Feed Stream (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="border-b-2 border-slate-900 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
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
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <h4 className="font-heading text-xs font-extrabold text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">
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
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider font-heading border-b border-slate-100 pb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verification Telemetry</span>
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
            <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900 font-heading">
                <BookOpen className="w-4 h-4 text-sky-700" />
                <span>Journalistic Standards</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Articles published on Worldwide AI News strictly adhere to multi-source verification and claim validation.
              </p>
              <Link href="/editorial-standards" className="text-sky-700 font-extrabold hover:underline block pt-1 font-heading">
                Read Ethics & Standards Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
