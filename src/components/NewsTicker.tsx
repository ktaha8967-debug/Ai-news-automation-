import React from 'react';
import Link from 'next/link';
import { Flame, CheckCircle2 } from 'lucide-react';
import { Article } from '@/types';

interface NewsTickerProps {
  articles: Article[];
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-white border-y border-slate-200 py-2.5 px-4 overflow-hidden shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <div className="flex items-center gap-1.5 shrink-0 bg-rose-50 border border-rose-200 text-rose-600 font-extrabold text-xs px-2.5 py-1 rounded-md uppercase tracking-wider font-heading">
          <Flame className="w-3.5 h-3.5 animate-pulse text-rose-500" />
          <span>BREAKING AI NEWS</span>
        </div>

        <div className="overflow-hidden relative w-full">
          <div className="flex items-center gap-8 whitespace-nowrap animate-ticker">
            {articles.concat(articles).map((art, idx) => (
              <Link 
                key={`${art.id}-${idx}`} 
                href={`/news/${art.slug}`}
                className="inline-flex items-center gap-2 text-xs text-slate-700 hover:text-sky-600 transition-colors font-medium"
              >
                <span className="text-slate-400 font-bold">•</span>
                <span>{art.title}</span>
                <span className="pill-emerald text-[10px] font-bold px-2 py-0.2 rounded-full flex items-center gap-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>{art.trustScore}% Verified</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
