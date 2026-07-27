import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';

interface NewsTickerProps {
  articles: Article[];
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-slate-50 border-b border-slate-200 py-2 px-4 text-xs font-sans">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <div className="flex items-center gap-1.5 shrink-0 text-slate-900 font-extrabold uppercase tracking-wider text-[11px] font-heading">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
          <span>BREAKING NEWS:</span>
        </div>

        <div className="overflow-hidden relative w-full">
          <div className="flex items-center gap-8 whitespace-nowrap animate-ticker">
            {articles.concat(articles).map((art, idx) => (
              <Link 
                key={`${art.id}-${idx}`} 
                href={`/news/${art.slug}`}
                className="inline-flex items-center gap-2 text-slate-700 hover:text-sky-700 transition-colors font-medium"
              >
                <span className="text-slate-400 font-bold">•</span>
                <span>{art.title}</span>
                <span className="text-[11px] text-slate-400 font-mono">({art.category})</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
