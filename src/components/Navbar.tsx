'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Globe, Cpu, Sparkles, ShieldCheck, Zap, Layers, Bot, Radio } from 'lucide-react';
import { SearchModal } from '@/components/SearchModal';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Dynamic formatted date e.g., "Monday, July 27, 2026"
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Global Keyboard Shortcut (Ctrl+K or Cmd+K) to trigger search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Latest Feed', href: '/', icon: Zap, match: pathname === '/' },
    { name: 'Models & LLMs', href: '/topics/llm-foundation-models', icon: Cpu, match: pathname.includes('llm-foundation-models') },
    { name: 'AI Tools & Agents', href: '/topics/autonomous-ai-agents', icon: Bot, match: pathname.includes('autonomous-ai-agents') },
    { name: 'Hardware & Silicon', href: '/topics/ai-chips-infrastructure', icon: Layers, match: pathname.includes('ai-chips-infrastructure') },
    { name: 'Safety & Policy', href: '/topics/ai-safety-governance', icon: ShieldCheck, match: pathname.includes('ai-safety-governance') },
    { name: 'Robotics', href: '/topics/computer-vision-robotics', icon: Sparkles, match: pathname.includes('computer-vision-robotics') },
  ];

  return (
    <>
      <header className="bg-white text-slate-900 font-sans border-b border-slate-200">
        {/* Top Micro Utility Bar */}
        <div className="bg-slate-900 text-slate-300 py-2 px-4 text-xs border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-bold text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span>LIVE 24/7 AUTO-PIPELINE SCANNER</span>
              </span>
              <span className="text-slate-700">|</span>
              <span className="hidden sm:inline text-slate-400">{currentDate}</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400">
              <span className="hidden md:inline text-slate-400 font-mono">ISSN 2940-811X</span>
              <span className="hidden md:inline text-slate-700">|</span>
              <Link href="/editorial-standards" className="hover:text-white transition-colors flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Editorial Code</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Publication High-Impact Masthead Logo Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100">
          {/* Left Emblem & Journal Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-600 via-indigo-600 to-slate-900 flex items-center justify-center shadow-md text-white shrink-0 ring-4 ring-sky-50">
              <Radio className="w-6 h-6 text-sky-300 animate-pulse" />
            </div>

            <Link href="/" className="group">
              <div className="flex items-center gap-2">
                <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 group-hover:text-sky-700 transition-colors uppercase">
                  World Bulletin
                </h1>
                <span className="bg-sky-100 text-sky-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md font-mono uppercase tracking-wider hidden sm:inline">
                  Verified Edition
                </span>
              </div>
              <p className="text-xs text-slate-500 font-sans tracking-widest uppercase mt-0.5 font-semibold flex items-center gap-2">
                <span>Fact-Checked Artificial Intelligence Journal</span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-mono text-[11px]">3x Daily Pipeline</span>
              </p>
            </Link>
          </div>

          {/* Right Header Search Box Trigger & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-between gap-4 px-4 py-2.5 rounded-2xl border border-slate-200 hover:border-sky-400 bg-slate-50/80 hover:bg-sky-50/60 transition-all font-sans text-xs text-slate-600 shadow-2xs group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-slate-500 group-hover:text-slate-900">
                  Search news, benchmarks & LLMs...
                </span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-white rounded border border-slate-200 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700 hover:text-slate-900 rounded-2xl border border-slate-200 bg-slate-50 shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Primary Sticky Category Navigation Pill Bar */}
        <div className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-start lg:justify-center gap-2 py-3 overflow-x-auto no-scrollbar font-sans">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      link.match
                        ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20 font-heading'
                        : 'text-slate-300 hover:text-white hover:bg-white/5 font-heading'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${link.match ? 'text-slate-950' : 'text-slate-400'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 font-sans shadow-xl">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    link.match ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-sky-500" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-2">
              <Link href="/editorial-standards" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-900">
                Editorial Code
              </Link>
              <span className="font-mono">ISSN 2940-811X</span>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
