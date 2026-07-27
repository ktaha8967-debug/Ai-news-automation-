import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Cpu, ExternalLink, Award } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#04060a] border-t border-slate-900 text-slate-400 text-sm mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white font-display">WORLDWIDE AI NEWS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Autonomous worldwide AI intelligence platform. Powered by multi-source fact verification, claim extraction, and E-E-A-T editorial standards.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero-Hallucination Shield Active</span>
            </div>
          </div>

          {/* Column 2: Topic Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-display">Coverage Hubs</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/topics/llm-foundation-models" className="hover:text-brand-400 transition-colors">LLMs & Foundation Models</Link></li>
              <li><Link href="/topics/autonomous-ai-agents" className="hover:text-brand-400 transition-colors">Autonomous AI Agents</Link></li>
              <li><Link href="/topics/ai-chips-infrastructure" className="hover:text-brand-400 transition-colors">AI Chips & Silicon</Link></li>
              <li><Link href="/topics/ai-safety-governance" className="hover:text-brand-400 transition-colors">AI Safety & Governance</Link></li>
              <li><Link href="/topics/computer-vision-robotics" className="hover:text-brand-400 transition-colors">Vision & Robotics</Link></li>
            </ul>
          </div>

          {/* Column 3: E-E-A-T & Google Indexing */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-display">E-E-A-T & Indexing</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/authors/elena-rostova" className="hover:text-brand-400 transition-colors">Author: Dr. Elena Rostova</Link></li>
              <li><Link href="/authors/marcus-vance" className="hover:text-brand-400 transition-colors">Author: Marcus Vance</Link></li>
              <li><a href="/google-news-sitemap.xml" target="_blank" className="hover:text-brand-400 transition-colors flex items-center gap-1"><span>Google News XML Sitemap</span> <ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
              <li><a href="/sitemap.xml" target="_blank" className="hover:text-brand-400 transition-colors flex items-center gap-1"><span>XML Site Map</span> <ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
              <li><a href="/robots.txt" target="_blank" className="hover:text-brand-400 transition-colors flex items-center gap-1"><span>Robots.txt Directives</span> <ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
            </ul>
          </div>

          {/* Column 4: System Architecture */}
          <div className="space-y-3 bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center gap-2 text-white font-bold text-xs">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Google Discover Ready</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal font-sans">
              Features NewsArticle & Breadcrumb JSON-LD schema, 1200px+ high-res visual assets, and verified source citations.
            </p>
            <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>Groq API: Active</span>
              <span>Fast ISR Engine</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4 font-sans">
          <p>© {new Date().getFullYear()} Worldwide AI News Network. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Multi-Source Fact Verification System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
