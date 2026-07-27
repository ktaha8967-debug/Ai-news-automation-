import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import { VerificationBadge } from '@/components/VerificationBadge';
import { AuthorCard } from '@/components/AuthorCard';
import { ArticleCard } from '@/components/ArticleCard';
import { generateNewsArticleSchema, generateBreadcrumbSchema } from '@/lib/services/seo-engine';
import { Clock, Eye, Calendar, ArrowLeft, Share2, Tag, HelpCircle, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = db.getArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: `${article.title} | Worldwide AI News`,
    description: article.metaDescription,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [{ url: article.featuredImage, width: 1200, height: 630, alt: article.title }]
    }
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = db.getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // SEO Schemas
  const newsSchema = generateNewsArticleSchema(article);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://ainews-automation.org' },
    { name: article.category, url: `https://ainews-automation.org/topics/${article.topicSlug}` },
    { name: article.title, url: `https://ainews-automation.org/news/${article.slug}` }
  ]);

  // Related articles
  const relatedArticles = db.getArticles(undefined, article.topicSlug)
    .filter(a => a.id !== article.id)
    .slice(0, 2);

  return (
    <article className="min-h-screen pb-20">
      {/* Schema.org JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Top Breadcrumb */}
      <div className="bg-[#070a12] border-b border-slate-800/80 py-3">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between text-xs text-slate-400">
          <Link href="/" className="hover:text-brand-400 flex items-center gap-1.5 font-bold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Top Stories</span>
          </Link>
          <div className="flex items-center gap-2">
            <span>{article.category}</span>
            <span>/</span>
            <span className="text-slate-200 truncate max-w-[200px]">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-10">
        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-heading">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readTimeMinutes} min read
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              {article.views} views
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-heading leading-tight tracking-tight">
            {article.title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans border-l-4 border-brand-500 pl-4 py-1 bg-[#131b2e]/60 rounded-r-xl">
            {article.summary}
          </p>

          {/* Author info */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative border border-brand-500/40 shrink-0">
                <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold text-white font-heading">{article.author.name}</p>
                <p className="text-[11px] text-slate-400">{article.author.role}</p>
              </div>
            </div>

            <button 
              className="p-2 rounded-xl bg-[#131b2e] border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Share Story"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* 1200px+ Featured Hero Image */}
        <div className="relative h-[300px] sm:h-[450px] w-full rounded-2xl overflow-hidden border border-slate-800 mb-8 shadow-2xl">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          {article.imageCaption && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#070a12] p-4 text-xs text-slate-300">
              <p>📷 {article.imageCaption}</p>
            </div>
          )}
        </div>

        {/* Fact Verification Badge */}
        <VerificationBadge
          score={article.trustScore}
          status={article.verificationStatus}
          sources={article.sources}
        />

        {/* Article Body */}
        <div 
          className="prose-friendly my-10"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Keyword Tags */}
        <div className="pt-6 border-t border-slate-800 space-y-3 my-8">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-heading">
            <Tag className="w-3.5 h-3.5 text-brand-400" />
            <span>Topic Tags</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {article.keywords.map((kw, idx) => (
              <span key={idx} className="bg-[#131b2e] text-slate-300 text-xs px-3 py-1.5 rounded-xl border border-slate-800 font-medium">
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        {article.faq && article.faq.length > 0 && (
          <section className="bg-[#131b2e] border border-slate-800 rounded-2xl p-6 my-10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              <span>Questions & Answers About This Story</span>
            </h3>

            <div className="space-y-3">
              {article.faq.map((item, idx) => (
                <div key={idx} className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <h4 className="text-sm font-bold text-brand-300 flex items-center gap-2 font-heading">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item.question}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* E-E-A-T Author Card */}
        <div className="my-12">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-heading">About the Author</h3>
          <AuthorCard author={article.author} />
        </div>

        {/* Related Stories */}
        {relatedArticles.length > 0 && (
          <section className="pt-10 border-t border-slate-800 space-y-5">
            <h3 className="text-lg font-bold text-white font-heading">
              More Verified Stories in {article.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
