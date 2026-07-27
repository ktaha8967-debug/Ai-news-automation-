import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Cpu, ExternalLink, Award } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-600 text-sm mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold shadow-md shadow-sky-600/20">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 font-heading">WORLDWIDE AI NEWS</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Automated worldwide AI news platform. Powered by multi-source fact-checking, automated claim extraction, and verified editorial standards.
            </p>
            <div className="flex items-center gap-2 text-xs pill-emerald font-semibold px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero-Hallucination Shield Active</span>
            </div>
          </div>

          {/* Column 2: Topic Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-heading">Coverage Hubs</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/topics/llm-foundation-models" className="hover:text-sky-600 transition-colors">LLMs & Foundation Models</Link></li>
              <li><Link href="/topics/autonomous-ai-agents" className="hover:text-sky-600 transition-colors">Autonomous AI Agents</Link></li>
              <li><Link href="/topics/ai-chips-infrastructure" className="hover:text-sky-600 transition-colors">AI Chips & Silicon</Link></li>
              <li><Link href="/topics/ai-safety-governance" className="hover:text-sky-600 transition-colors">AI Safety & Governance</Link></li>
              <li><Link href="/topics/computer-vision-robotics" className="hover:text-sky-600 transition-colors">Vision & Robotics</Link></li>
            </ul>
          </div>

          {/* Column 3: E-E-A-T & Google Indexing */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-heading">E-E-A-T & Indexing</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/authors/elena-rostova" className="hover:text-sky-600 transition-colors">Author: Dr. Elena Rostova</Link></li>
              <li><Link href="/authors/marcus-vance" className="hover:text-sky-600 transition-colors">Author: Marcus Vance</Link></li>
              <li><a href="/google-news-sitemap.xml" target="_blank" className="hover:text-sky-600 transition-colors flex items-center gap-1"><span>Google News XML Sitemap</span> <ExternalLink className="w-3 h-3 text-slate-400" /></a></li>
              <li><a href="/sitemap.xml" target="_blank" className="hover:text-sky-600 transition-colors flex items-center gap-1"><span>XML Site Map</span> <ExternalLink className="w-3 h-3 text-slate-400" /></a></li>
              <li><a href="/robots.txt" target="_blank" className="hover:text-sky-600 transition-colors flex items-center gap-1"><span>Robots.txt Directives</span> <ExternalLink className="w-3 h-3 text-slate-400" /></a></li>
            </ul>
          </div>

          {/* Column 4: System Architecture */}
          <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <Award className="w-4 h-4 text-purple-600" />
              <span>Google Discover Ready</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal font-sans">
              Features NewsArticle & Breadcrumb JSON-LD schema, 1200px+ high-res visual assets, and verified source citations.
            </p>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>Groq API: Active</span>
              <span>Fast ISR Engine</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4 font-sans">
          <p>© {new Date().getFullYear()} Worldwide AI News Network. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Multi-Source Fact Verification System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
