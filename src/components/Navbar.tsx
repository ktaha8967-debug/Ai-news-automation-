'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cpu, Menu, X, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-header">
      {/* Handcrafted Editorial Top Wire */}
      <div className="bg-[#05070d] border-b border-slate-800/60 text-xs py-1.5 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400 tracking-wider uppercase text-[11px]">
              VERIFICATION WIRE LIVE
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Multi-Source Trust Index: <strong className="text-white">96.8% Avg</strong></span>
          </div>
        </div>
      </div>

      {/* Main Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-purple-600 p-0.5 shadow-lg shadow-brand-600/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#070a11] rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-brand-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-display">
                WORLDWIDE AI NEWS
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest">
                VERIFIED
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Fact-Checked Global Intelligence Network</p>
          </div>
        </Link>

        {/* Natural Magazine Information Architecture */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
          <Link href="/" className="hover:text-brand-400 transition-colors flex items-center gap-1.5 text-white">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>Top Stories</span>
          </Link>
          <Link href="/topics/llm-foundation-models" className="hover:text-brand-400 transition-colors">
            AI Models
          </Link>
          <Link href="/topics/autonomous-ai-agents" className="hover:text-brand-400 transition-colors">
            Autonomous Agents
          </Link>
          <Link href="/topics/ai-chips-infrastructure" className="hover:text-brand-400 transition-colors">
            Chips & Silicon
          </Link>
          <Link href="/topics/ai-safety-governance" className="hover:text-brand-400 transition-colors">
            Governance
          </Link>
          <Link href="/topics/computer-vision-robotics" className="hover:text-brand-400 transition-colors">
            Robotics
          </Link>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070a11] border-b border-slate-800 px-4 py-4 space-y-3">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-slate-100 hover:text-brand-400 py-1 font-semibold text-sm">
            Top Stories
          </Link>
          <Link href="/topics/llm-foundation-models" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-brand-400 py-1 text-sm">
            AI Models & LLMs
          </Link>
          <Link href="/topics/autonomous-ai-agents" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-brand-400 py-1 text-sm">
            Autonomous Agents
          </Link>
          <Link href="/topics/ai-chips-infrastructure" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-brand-400 py-1 text-sm">
            Chips & Silicon
          </Link>
          <Link href="/topics/ai-safety-governance" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-brand-400 py-1 text-sm">
            Governance & Policy
          </Link>
          <Link href="/topics/computer-vision-robotics" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-brand-400 py-1 text-sm">
            Robotics & Vision
          </Link>
        </div>
      )}
    </header>
  );
};
