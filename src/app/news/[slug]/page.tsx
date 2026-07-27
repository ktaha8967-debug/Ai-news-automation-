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
import { ShareButtons } from '@/components/ShareButtons';
import { Clock, Calendar, ArrowLeft, Share2, Tag } from 'lucide-react';

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
    <article className="min-h-screen bg-white pb-20 font-sans">
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
      <div className="border-b border-slate-100 py-3 bg-slate-50 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="hover:text-sky-700 flex items-center gap-1 font-bold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Latest News</span>
          </Link>
          <div className="flex items-center gap-2">
            <span>{article.category}</span>
            <span>/</span>
            <span className="text-slate-800 truncate max-w-[200px] font-medium">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-10">
        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-xs text-sky-700 font-bold uppercase tracking-wider font-heading">
            <span>{article.category}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-normal flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-normal flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readTimeMinutes} min read
            </span>
          </div>

          <h1 className="font-headline text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            {article.title}
          </h1>

          <p className="text-slate-700 text-lg leading-relaxed font-sans border-l-3 border-sky-600 pl-4 py-1 italic bg-slate-50 rounded-r-lg">
            {article.summary}
          </p>

          {/* Author info & Share Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative border border-slate-200 shrink-0">
                <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-slate-900 font-heading text-sm">{article.author.name}</p>
                <p className="text-slate-500 text-xs">{article.author.role}</p>
              </div>
            </div>

            <ShareButtons title={article.title} slug={article.slug} />
          </div>

        </header>

        {/* 1200px+ Featured Hero Image */}
        <div className="relative h-[320px] sm:h-[480px] w-full rounded-xl overflow-hidden bg-slate-100 mb-8 border border-slate-200">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          {article.imageCaption && (
            <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 backdrop-blur-xs p-3 text-xs text-slate-200">
              <p>📷 {article.imageCaption}</p>
            </div>
          )}
        </div>

        {/* Fact Verification Citation Box */}
        <VerificationBadge
          score={article.trustScore}
          status={article.verificationStatus}
          sources={article.sources}
        />

        {/* Article Body */}
        <div 
          className="article-body my-10"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Topic Tags */}
        <div className="pt-6 border-t border-slate-200 space-y-3 my-8">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-heading">
            <Tag className="w-3.5 h-3.5 text-sky-700" />
            <span>Topics & Index Keywords</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {article.keywords.map((kw, idx) => (
              <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-md border border-slate-200 font-medium">
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* E-E-A-T Author Profile Card */}
        <div className="my-12">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 font-heading">About the Reporter</h3>
          <AuthorCard author={article.author} />
        </div>

        {/* Related Stories */}
        {relatedArticles.length > 0 && (
          <section className="pt-10 border-t border-slate-200 space-y-6">
            <h3 className="font-heading font-extrabold text-xl text-slate-900">
              Related Coverage in {article.category}
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
