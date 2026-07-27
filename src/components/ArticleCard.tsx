import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  if (featured) {
    return (
      <div className="news-card rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 group">
        <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[440px]">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1624] via-[#0f1624]/30 to-transparent lg:hidden" />
          
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-brand-600 text-white font-extrabold text-[11px] px-3 py-1 rounded-md uppercase tracking-wider shadow-lg font-display">
              LEAD STORY
            </span>
            <span className="bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 font-bold text-xs px-3 py-1 rounded-md flex items-center gap-1 shadow-lg font-sans">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{article.trustScore}% Verified</span>
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between bg-[#0f1624]">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="text-brand-400 font-bold uppercase tracking-wider font-display">{article.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTimeMinutes} min read</span>
            </div>

            <Link href={`/news/${article.slug}`}>
              <h2 className="text-xl lg:text-2xl font-extrabold text-white group-hover:text-brand-300 transition-colors leading-tight font-display">
                {article.title}
              </h2>
            </Link>

            <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed font-sans font-light">
              {article.summary}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden relative border border-brand-500/40 shrink-0">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200 font-display">{article.author.name}</p>
                <p className="text-[11px] text-slate-400 font-sans">Verified Fact Analyst</p>
              </div>
            </div>

            <Link 
              href={`/news/${article.slug}`}
              className="w-9 h-9 rounded-xl bg-brand-600/20 hover:bg-brand-600 text-brand-400 hover:text-white flex items-center justify-center transition-colors border border-brand-500/30"
              aria-label="Read full article"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-card rounded-xl overflow-hidden flex flex-col justify-between group">
      <div>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="bg-[#070a11]/90 backdrop-blur-md border border-slate-800 text-brand-300 font-bold text-[11px] px-2.5 py-0.5 rounded-md font-display uppercase tracking-wider">
              {article.category}
            </span>
          </div>

          <div className="absolute bottom-3 right-3">
            <span className="bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 font-extrabold text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
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
            <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-2 leading-snug font-display">
              {article.title}
            </h3>
          </Link>

          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed font-sans font-light">
            {article.summary}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-slate-800/40 mt-3 flex items-center justify-between text-xs text-slate-400">
        <span className="text-slate-300 font-semibold font-display">{article.author.name}</span>
        <Link 
          href={`/news/${article.slug}`} 
          className="text-brand-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold text-xs"
        >
          <span>Read Story</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
