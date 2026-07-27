import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs font-sans mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Masthead Col */}
          <div className="space-y-3">
            <h3 className="font-headline text-lg font-black text-white uppercase tracking-tight">
              Worldwide AI News
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              An independent technical news platform providing reporting on artificial intelligence research, hardware infrastructure, and governance.
            </p>
          </div>

          {/* Navigation Sections */}
          <div className="space-y-2.5">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">Desks</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/topics/llm-foundation-models" className="hover:text-white transition-colors">Foundation Models & LLMs</Link></li>
              <li><Link href="/topics/autonomous-ai-agents" className="hover:text-white transition-colors">Autonomous AI Tools</Link></li>
              <li><Link href="/topics/ai-chips-infrastructure" className="hover:text-white transition-colors">Silicon & Hardware</Link></li>
              <li><Link href="/topics/ai-safety-governance" className="hover:text-white transition-colors">Safety & Policy</Link></li>
              <li><Link href="/topics/computer-vision-robotics" className="hover:text-white transition-colors">Vision & Robotics</Link></li>
            </ul>
          </div>

          {/* Editorial & Authors */}
          <div className="space-y-2.5">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">Editorial & Standards</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/editorial-standards" className="hover:text-white transition-colors">Fact-Checking Policy</Link></li>
              <li><Link href="/authors/elena-rostova" className="hover:text-white transition-colors">Dr. Elena Rostova</Link></li>
              <li><Link href="/authors/marcus-vance" className="hover:text-white transition-colors">Marcus Vance</Link></li>
              <li><a href="/google-news-sitemap.xml" target="_blank" className="hover:text-white transition-colors">Google News XML Sitemap</a></li>
            </ul>
          </div>

          {/* System & Feeds */}
          <div className="space-y-2.5">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">Feeds & Directives</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="/sitemap.xml" target="_blank" className="hover:text-white transition-colors">XML Sitemap Index</a></li>
              <li><a href="/robots.txt" target="_blank" className="hover:text-white transition-colors">Robots.txt Directives</a></li>
              <li><span className="text-slate-500 font-mono">Automated Technical Reporting</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} Worldwide AI News Network. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/editorial-standards" className="hover:text-slate-300">Journalism Ethics</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
