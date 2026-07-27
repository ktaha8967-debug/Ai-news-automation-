import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { AuthorCard } from '@/components/AuthorCard';
import { ArticleCard } from '@/components/ArticleCard';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface AuthorPageProps {
  params: {
    slug: string;
  };
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = db.getAuthorBySlug(params.slug);
  if (!author) notFound();

  const authorArticles = db.getArticles().filter(a => a.author.slug === author.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link href="/" className="text-xs text-brand-400 hover:underline flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Top Stories</span>
      </Link>

      <div className="max-w-3xl">
        <AuthorCard author={author} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Fact-Checked Articles Authored by {author.name} ({authorArticles.length})</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </div>
    </div>
  );
}
