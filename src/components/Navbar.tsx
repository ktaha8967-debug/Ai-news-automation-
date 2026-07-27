'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Globe } from 'lucide-react';
import { SearchModal } from '@/components/SearchModal';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Dynamic formatted date e.g., "Monday, July 27, 2026"
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <>
      <header className="bg-white border-b border-slate-200">
        {/* Top Editorial Utility Bar */}
        <div className="border-b border-slate-100 py-1.5 px-4 text-xs text-slate-500 bg-slate-50 font-sans">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-medium">{currentDate}</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <Globe className="w-3.5 h-3.5 text-sky-600" />
                Worldwide Edition
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/editorial-standards" className="hover:text-slate-900 transition-colors">
                Editorial Standards
              </Link>
            </div>
          </div>
        </div>

        {/* Main Publication Masthead */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-slate-200">
          <div className="hidden lg:block w-36 text-xs text-slate-400 font-serif italic">
            The Independent Artificial Intelligence Journal
          </div>

          {/* Masthead Logo */}
          <Link href="/" className="text-center group">
            <h1 className="font-headline text-2xl sm:text-4xl font-black tracking-tight text-slate-900 group-hover:text-sky-700 transition-colors uppercase">
              Worldwide AI News
            </h1>
            <p className="text-[11px] text-slate-500 font-sans tracking-widest uppercase mt-0.5 font-semibold">
              Fact-Checked AI Journalism & Technical Reporting
            </p>
          </Link>

          {/* Search Trigger Button & Actions */}
          <div className="flex items-center gap-3 w-36 justify-end">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 p-2.5 sm:px-3 sm:py-1.5 text-slate-600 hover:text-sky-700 rounded-xl border border-slate-200 hover:border-sky-300 bg-slate-50 hover:bg-sky-50 transition-all font-sans text-xs font-bold shadow-2xs"
              title="Search News & Topics"
            >
              <Search className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="hidden sm:inline font-heading">Search...</span>
            </button>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Primary Category Navigation Bar */}
        <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-8 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 font-sans">
            <Link href="/" className="hover:text-sky-600 transition-colors py-1 text-slate-900 border-b-2 border-slate-900">
              Latest News
            </Link>
            <Link href="/topics/llm-foundation-models" className="hover:text-sky-600 transition-colors py-1">
              Models & LLMs
            </Link>
            <Link href="/topics/autonomous-ai-agents" className="hover:text-sky-600 transition-colors py-1">
              AI Tools & Agents
            </Link>
            <Link href="/topics/ai-chips-infrastructure" className="hover:text-sky-600 transition-colors py-1">
              Hardware & Silicon
            </Link>
            <Link href="/topics/ai-safety-governance" className="hover:text-sky-600 transition-colors py-1">
              Safety & Policy
            </Link>
            <Link href="/topics/computer-vision-robotics" className="hover:text-sky-600 transition-colors py-1">
              Robotics
            </Link>
          </nav>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 font-sans shadow-lg">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-slate-900 hover:text-sky-600 py-1 font-bold text-sm">
              Latest News
            </Link>
            <Link href="/topics/llm-foundation-models" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-sky-600 py-1 text-sm">
              Models & LLMs
            </Link>
            <Link href="/topics/autonomous-ai-agents" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-sky-600 py-1 text-sm">
              AI Tools & Agents
            </Link>
            <Link href="/topics/ai-chips-infrastructure" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-sky-600 py-1 text-sm">
              Hardware & Silicon
            </Link>
            <Link href="/topics/ai-safety-governance" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-sky-600 py-1 text-sm">
              Safety & Policy
            </Link>
            <Link href="/topics/computer-vision-robotics" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-sky-600 py-1 text-sm">
              Robotics
            </Link>
            <div className="pt-2 border-t border-slate-100">
              <Link href="/editorial-standards" onClick={() => setMobileMenuOpen(false)} className="text-slate-500 hover:underline text-xs">
                Editorial Standards
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
