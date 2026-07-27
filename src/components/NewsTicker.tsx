import React from 'react';
import Link from 'next/link';
import { Flame, ShieldCheck } from 'lucide-react';
import { Article } from '@/types';

interface NewsTickerProps {
  articles: Article[];
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-slate-900/90 border-y border-slate-800 py-2.5 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <div className="flex items-center gap-1.5 shrink-0 bg-rose-950/80 border border-rose-800/60 text-rose-400 font-extrabold text-xs px-2.5 py-1 rounded uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 animate-pulse" />
          <span>BREAKING INTELLIGENCE</span>
        </div>

        <div className="overflow-hidden relative w-full">
          <div className="flex items-center gap-8 whitespace-nowrap animate-ticker">
            {articles.concat(articles).map((art, idx) => (
              <Link 
                key={`${art.id}-${idx}`} 
                href={`/news/${art.slug}`}
                className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-brand-300 transition-colors"
              >
                <span className="text-slate-400 font-semibold">•</span>
                <span className="font-medium">{art.title}</span>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/40 text-[10px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                  <ShieldCheck className="w-2.5 h-2.5" />
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
