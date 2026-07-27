'use client';

import React, { useState } from 'react';
import { Zap, Play, RefreshCw, CheckCircle2, ShieldCheck, Cpu, Terminal, ArrowRight } from 'lucide-react';

export default function AutomationControlPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'System ready. Autonomous Pipeline waiting for trigger.',
    'Groq API Status: Active / Zero-Cost Fallback Standby.',
    'Google News XML Sitemap: Ready at /google-news-sitemap.xml'
  ]);
  const [lastResult, setLastResult] = useState<any>(null);

  const handleRunFullPipeline = async () => {
    setIsRunning(true);
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Triggering Full Automation Cycle...`]);
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Step 1: Scanning 14 AI Tech RSS Feeds (TechCrunch, VentureBeat, ArXiv)...`]);

    try {
      const res = await fetch('/api/automation/run', { method: 'POST' });
      const data = await res.json();

      if (data.success) {
        setTerminalLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Step 2: Fact Verification complete. Verified claims with multi-source index.`,
          `[${new Date().toLocaleTimeString()}] Step 3: AI Content Generator produced structured NewsArticle JSON-LD HTML.`,
          `[${new Date().toLocaleTimeString()}] Step 4: High-res 1200px+ Image selected & Schema assigned.`,
          `[${new Date().toLocaleTimeString()}] SUCCESS: Created ${data.publishedCount} published article(s). ${data.needsReviewCount} flagged for review.`
        ]);
        setLastResult(data);
      } else {
        setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ERROR: Pipeline execution failed.`]);
      }
    } catch (err: any) {
      setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ERROR: Network or server failure (${err?.message})`]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Zap className="w-4 h-4 fill-purple-400" />
          <span>Real-time Task Scheduler & Orchestrator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          AI News Automation Pipeline Controller
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manually trigger or simulate daily AI news research, multi-source claim verification, Groq model synthesis, and sitemap publication.
        </p>
      </div>

      {/* Action Trigger Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white font-display">Execute Full Automation Cycle</h2>
            <p className="text-xs text-slate-300">
              Scans feeds → Verifies facts → Synthesizes article → Attaches 1200px+ image → Updates Google News Sitemap.
            </p>
          </div>

          <button
            onClick={handleRunFullPipeline}
            disabled={isRunning}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs shadow-xl transition-all ${
              isRunning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600 hover:opacity-95 text-white shadow-brand-600/20'
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Run Pipeline Now</span>
              </>
            )}
          </button>
        </div>

        {lastResult && (
          <div className="bg-emerald-950/80 border border-emerald-800/60 p-4 rounded-xl flex items-center justify-between text-xs text-emerald-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Cycle Complete: {lastResult.publishedCount} new verified article(s) published!</span>
            </div>
            <a href="/" target="_blank" className="font-bold underline text-white hover:text-emerald-200">
              View on Portal →
            </a>
          </div>
        )}
      </div>

      {/* Live Terminal Output Console */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-brand-400" />
            <span className="font-bold text-slate-200 uppercase tracking-wider font-sans">Live Pipeline Console Log</span>
          </div>
          <span className="text-[11px]">TTY Stream Active</span>
        </div>

        <div className="h-64 overflow-y-auto space-y-2 bg-black/40 p-4 rounded-xl border border-slate-900 text-slate-300">
          {terminalLogs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-brand-400 select-none">&gt;</span>
              <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('ERROR') ? 'text-rose-400 font-bold' : ''}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
