'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Zap, FileText, ShieldCheck, ListOrdered, ArrowLeft, Activity, LogOut } from 'lucide-react';

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Automation Pipeline', href: '/admin/automation', icon: Zap, highlight: true },
    { name: 'Article Review Queue', href: '/admin/articles', icon: FileText },
    { name: 'Fact-Check Logs', href: '/admin/verification-logs', icon: ShieldCheck },
    { name: 'System Logs & Retries', href: '/admin/logs', icon: ListOrdered },
  ];

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-64 bg-[#0a0e18] border-r border-slate-800 p-5 min-h-screen flex flex-col justify-between shrink-0 font-sans">
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-white block leading-tight font-heading">SYSTEM ADMIN</span>
            <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">Authenticated Console</span>
          </div>
        </div>

        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
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

      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <div className="bg-[#05070d] p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1 font-mono">
          <div className="flex items-center justify-between font-semibold text-slate-300">
            <span>Groq Engine:</span>
            <span className="text-emerald-400 font-bold">{process.env.GROQ_API_KEY ? 'Active' : 'Fallback'}</span>
          </div>
          <p className="text-[10px] text-slate-500">Model: llama-3.3-70b-versatile</p>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors bg-rose-950/50 hover:bg-rose-900 px-2.5 py-1 rounded-lg border border-rose-800/60 font-bold"
          >
            <LogOut className="w-3 h-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
