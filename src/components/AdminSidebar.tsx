'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Zap, FileText, ShieldCheck, ListOrdered, ArrowLeft, Activity, LogOut, CheckCircle2 } from 'lucide-react';

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
    <aside className="w-64 bg-white border-r border-slate-200 p-5 min-h-screen flex flex-col justify-between shrink-0 font-sans shadow-xs">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-sky-700 flex items-center justify-center font-bold text-white shadow-sm">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-slate-900 block leading-tight font-heading">ADMIN DASHBOARD</span>
            <span className="text-[10px] text-sky-700 font-bold uppercase tracking-wider">Fact-Check Console</span>
          </div>
        </div>

        {/* Navigation */}
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
                    ? 'bg-sky-700 text-white shadow-md shadow-sky-700/20'
                    : link.highlight
                    ? 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : link.highlight ? 'text-sky-700' : 'text-slate-500'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-4 border-t border-slate-200 space-y-3">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1 font-mono">
          <div className="flex items-center justify-between font-semibold text-slate-900">
            <span>Groq AI Engine:</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Active
            </span>
          </div>
          <p className="text-[10px] text-slate-500">llama-3.3-70b-versatile</p>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-800 transition-colors bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg border border-rose-200 font-bold"
          >
            <LogOut className="w-3 h-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
