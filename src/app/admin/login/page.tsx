'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, User, Key, ArrowRight, Activity, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Invalid admin credentials');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a11] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Logo Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-purple-600 p-0.5 shadow-xl shadow-brand-500/20 mx-auto flex items-center justify-center">
            <div className="w-full h-full bg-[#070a11] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-brand-400" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white font-display tracking-tight">
            SYSTEM ADMIN CONSOLE
          </h1>
          <p className="text-xs text-slate-400 font-sans">
            Authentication Required to Access Automation Pipeline
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-[#0f1624] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
          {error && (
            <div className="bg-rose-950/80 border border-rose-800/60 p-3 rounded-xl flex items-center gap-2 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-display">
              Admin Username / Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#070a11] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                placeholder="admin or admin@ainews.org"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-display">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#070a11] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                placeholder="Enter password (default: admin123)"
              />
            </div>
          </div>

          {/* Quick Credential Hint */}
          <div className="bg-[#070a11] p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1 font-mono">
            <div className="flex items-center justify-between text-slate-300 font-semibold">
              <span className="flex items-center gap-1"><Key className="w-3 h-3 text-purple-400" /> Default Credentials:</span>
            </div>
            <p>Username: <strong className="text-white">admin</strong></p>
            <p>Password: <strong className="text-white">admin123</strong></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs shadow-xl shadow-brand-600/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Login to Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
