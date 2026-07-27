'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cpu, Menu, X, Sparkles, CheckCircle2 } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 light-header">
      {/* Light Top News Wire */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-emerald-400 tracking-wide text-xs uppercase">
              LIVE FACT CHECKER ACTIVE
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">All stories cross-verified across 2+ official sources</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Average Rating: <strong className="text-white font-bold">96.8% Verified</strong></span>
          </div>
        </div>
      </div>

      {/* Main Light Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-500 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-sky-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 font-heading">
                WORLDWIDE AI NEWS
              </span>
              <span className="pill-emerald text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                100% VERIFIED
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Simple, Honest & Fact-Checked AI News</p>
          </div>
        </Link>

        {/* Clean Light Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
          <Link href="/" className="hover:text-sky-600 transition-colors flex items-center gap-1.5 text-slate-900">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>Top Stories</span>
          </Link>
          <Link href="/topics/llm-foundation-models" className="hover:text-sky-600 transition-colors">
            AI Models
          </Link>
          <Link href="/topics/autonomous-ai-agents" className="hover:text-sky-600 transition-colors">
            AI Tools & Agents
          </Link>
          <Link href="/topics/ai-chips-infrastructure" className="hover:text-sky-600 transition-colors">
            AI Chips
          </Link>
          <Link href="/topics/ai-safety-governance" className="hover:text-sky-600 transition-colors">
            Safety & Rules
          </Link>
          <Link href="/topics/computer-vision-robotics" className="hover:text-sky-600 transition-colors">
            Robotics
          </Link>
          <Link href="/editorial-standards" className="text-slate-500 hover:text-slate-900 transition-colors text-xs border-l border-slate-200 pl-4">
            How We Check Facts
          </Link>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-xl bg-white border border-slate-200 shadow-sm"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-slate-900 hover:text-sky-600 py-1 font-bold text-sm">
            Top Stories
          </Link>
          <Link href="/topics/llm-foundation-models" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-sky-600 py-1 text-sm">
            AI Models
          </Link>
          <Link href="/topics/autonomous-ai-agents" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-sky-600 py-1 text-sm">
            AI Tools & Agents
          </Link>
          <Link href="/topics/ai-chips-infrastructure" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-sky-600 py-1 text-sm">
            AI Chips & Hardware
          </Link>
          <Link href="/topics/ai-safety-governance" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-sky-600 py-1 text-sm">
            Safety & Rules
          </Link>
          <Link href="/topics/computer-vision-robotics" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-sky-600 py-1 text-sm">
            Robotics
          </Link>
          <div className="pt-2 border-t border-slate-100">
            <Link href="/editorial-standards" onClick={() => setMobileMenuOpen(false)} className="text-slate-500 hover:underline text-xs">
              How We Check Facts
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
