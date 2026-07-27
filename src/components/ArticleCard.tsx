import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  if (featured) {
    return (
      <div className="light-card rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 group">
        <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px]">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-sky-600 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md font-heading">
              TOP STORY OF THE DAY
            </span>
            <span className="pill-emerald font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{article.trustScore}% Verified</span>
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between bg-white">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="text-sky-600 font-bold uppercase tracking-wider font-heading">{article.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {article.readTimeMinutes} min read</span>
            </div>

            <Link href={`/news/${article.slug}`}>
              <h2 className="text-xl lg:text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug font-heading">
                {article.title}
              </h2>
            </Link>

            <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
              {article.summary}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden relative border border-slate-200 shrink-0 shadow-sm">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 font-heading">{article.author.name}</p>
                <p className="text-[11px] text-slate-500">Verified Fact Checker</p>
              </div>
            </div>

            <Link 
              href={`/news/${article.slug}`}
              className="w-9 h-9 rounded-xl bg-sky-50 hover:bg-sky-600 text-sky-600 hover:text-white flex items-center justify-center transition-colors border border-sky-100"
              aria-label="Read full story"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="light-card rounded-2xl overflow-hidden flex flex-col justify-between group">
      <div>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="bg-white/95 backdrop-blur-md border border-slate-200 text-sky-700 font-bold text-[11px] px-2.5 py-0.5 rounded-full font-heading shadow-sm">
              {article.category}
            </span>
          </div>

          <div className="absolute bottom-3 right-3">
            <span className="pill-emerald font-bold text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <CheckCircle2 className="w-3 h-3" />
              <span>{article.trustScore}% Score</span>
            </span>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{article.readTimeMinutes} min read</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {article.views} reads</span>
          </div>

          <Link href={`/news/${article.slug}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug font-heading">
              {article.title}
            </h3>
          </Link>

          <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between text-xs text-slate-500">
        <span className="text-slate-700 font-semibold font-heading">{article.author.name}</span>
        <Link 
          href={`/news/${article.slug}`} 
          className="text-sky-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold text-xs"
        >
          <span>Read Story</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
