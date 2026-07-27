'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';
import { ChevronLeft, ChevronRight, ArrowUpRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroCarouselProps {
  articles: Article[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Take top 3 latest news stories
  const featuredList = articles.slice(0, 3);

  useEffect(() => {
    if (isPaused || featuredList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredList.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, featuredList.length]);

  if (featuredList.length === 0) return null;

  const currentStory = featuredList[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredList.length);
  };

  return (
    <div 
      className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Visual Area (7 Cols) */}
        <div className="lg:col-span-7 relative h-[340px] sm:h-[480px] w-full overflow-hidden bg-slate-900">
          <Image
            src={currentStory.featuredImage}
            alt={currentStory.title}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-102"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

          {/* Category Tag Overlay */}
          <div className="absolute top-5 left-5 flex items-center gap-2">
            <span className="bg-slate-900/90 backdrop-blur-md text-white font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-widest font-heading border border-white/20 shadow-md">
              {currentStory.category}
            </span>
            <span className="bg-emerald-500/90 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-mono flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-white" />
              {currentStory.trustScore}% Verified
            </span>
          </div>

          {/* Navigation Controls on Image */}
          <div className="absolute bottom-5 right-5 flex items-center gap-2 z-10">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-sky-600 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md hover:scale-105"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-sky-600 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md hover:scale-105"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Content Area (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span className="font-bold text-sky-700 uppercase tracking-wider">Spotlight Cover</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentStory.readTimeMinutes} min read</span>
              </div>
            </div>

            <Link href={`/news/${currentStory.slug}`}>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight hover:text-sky-700 transition-colors line-clamp-3">
                {currentStory.title}
              </h2>
            </Link>

            <p className="text-slate-600 text-sm leading-relaxed font-sans line-clamp-4">
              {currentStory.summary}
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            {/* Author Attribution & Action */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden relative border border-slate-200 shrink-0 shadow-2xs">
                  <Image src={currentStory.author.avatar} alt={currentStory.author.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 font-heading text-xs">{currentStory.author.name}</p>
                  <p className="text-[11px] text-slate-500">{currentStory.author.role}</p>
                </div>
              </div>

              <Link
                href={`/news/${currentStory.slug}`}
                className="px-4 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-sky-700/20 transition-all font-heading"
              >
                <span>Read Story</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Slide Pagination Dots */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {featuredList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'w-8 bg-sky-700' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
