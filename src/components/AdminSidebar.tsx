'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Zap, FileText, ShieldCheck, ListOrdered, Settings, ArrowLeft, Activity } from 'lucide-react';

export const AdminSidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Automation Pipeline', href: '/admin/automation', icon: Zap, highlight: true },
    { name: 'Article Review Queue', href: '/admin/articles', icon: FileText },
    { name: 'Fact-Check Logs', href: '/admin/verification-logs', icon: ShieldCheck },
    { name: 'System Logs & Retries', href: '/admin/logs', icon: ListOrdered },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 min-h-screen flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-purple-600 flex items-center justify-center font-bold text-white">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-white block leading-tight font-display">SYSTEM ADMIN</span>
            <span className="text-[10px] text-brand-400 font-medium uppercase tracking-wider">Automation Console</span>
          </div>
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                    : link.highlight
                    ? 'bg-purple-950/60 border border-purple-800/50 text-purple-300 hover:bg-purple-900/60'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800 space-y-3">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center justify-between font-semibold text-slate-300">
            <span>Groq Engine:</span>
            <span className="text-emerald-400">{process.env.GROQ_API_KEY ? 'Active' : 'Fallback'}</span>
          </div>
          <p className="text-[10px] text-slate-500">Model: llama-3.3-70b-versatile</p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white px-2 py-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Portal</span>
        </Link>
      </div>
    </aside>
  );
};
