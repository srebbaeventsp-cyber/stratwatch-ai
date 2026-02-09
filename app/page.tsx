'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Shield, Activity, Globe, Terminal, Lock, Cpu, Server, Radio } from 'lucide-react';

// --- DYNAMIC IMPORTS (NO SSR) ---
const GlobalMap = dynamic(() => import('./components/GlobalMap'), { 
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center bg-green-950/10 text-green-500 animate-pulse text-xs">INITIALIZING SAT_LINK...</div>
});

export default function StratWatchDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono selection:bg-green-900 selection:text-white">
      {/* HEADER */}
      <header className="border-b border-green-900/50 p-4 flex justify-between items-center bg-black/90 backdrop-blur fixed w-full top-0 z-50">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 animate-pulse text-green-400" />
          <h1 className="text-xl font-bold tracking-widest">STRATWATCH<span className="text-white">.AI</span> <span className="text-xs text-green-900 bg-green-400/20 ml-2 border border-green-500/30 px-2 py-0.5 rounded">V4.1 MODULAR</span></h1>
        </div>
        <div className="flex gap-6 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>SYSTEM: ONLINE</span>
          </div>
        </div>
      </header>

      <div className="pt-24 px-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
        
        {/* SIDEBAR */}
        <aside className="md:col-span-3 space-y-6">
          <div className="p-4 border border-green-900/50 bg-green-950/10 rounded-sm">
             <div className="flex items-center justify-between mb-4 border-b border-green-900/50 pb-2">
                <span className="text-xs text-gray-400">RESSOURCES</span>
                <Server className="w-4 h-4 text-green-600" />
             </div>
             <div className="space-y-3 text-xs">
                <div className="flex justify-between"><span>CPU_CORE_0</span> <span className="text-white">18%</span></div>
                <div className="w-full bg-green-900/20 h-1"><div className="bg-green-600 h-1 w-[18%]"></div></div>
             </div>
          </div>
          <nav className="space-y-2">
            <div className="text-xs text-gray-500 font-bold px-2 mb-2">MODULES ACTIFS</div>
            <button className="w-full text-left p-3 border border-green-500/50 bg-green-500/10 flex items-center gap-3 border-l-4 border-l-green-500">
              <Globe className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-bold">Global Surveillance</span>
            </button>
            <button className="w-full text-left p-3 border border-green-900/30 hover:bg-green-900/10 flex items-center gap-3 opacity-50">
              <Terminal className="w-4 h-4" />
              <span className="text-sm">OSINT Toolkit</span>
            </button>
          </nav>
        </aside>

        {/* DASHBOARD */}
        <section className="md:col-span-9 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px]">
            
            {/* SLOT 01 : MODULE MAP ACTIF (GLOBAL SURVEILLANCE) */}
            <div className="md:col-span-2 border border-green-500/30 bg-green-950/5 relative group shadow-[0_0_20px_rgba(21,128,61,0.1)]">
                <GlobalMap />
            </div>

            {/* SLOT 02 & 03 : PENDING */}
            <div className="space-y-4">
                <div className="h-full border border-green-900/30 bg-green-950/5 flex flex-col items-center justify-center gap-2 text-green-900/50">
                    <div className="text-xs font-bold border border-green-900/30 px-2 py-1 rounded">SLOT_02</div>
                    <span className="text-[10px] tracking-widest">OSINT SCANNER</span>
                </div>
                 <div className="h-full border border-green-900/30 bg-green-950/5 flex flex-col items-center justify-center gap-2 text-green-900/50">
                    <div className="text-xs font-bold border border-green-900/30 px-2 py-1 rounded">SLOT_03</div>
                    <span className="text-[10px] tracking-widest">AI CHAT</span>
                </div>
            </div>
          </div>

          {/* LOGS */}
          <div className="border border-green-900/30 bg-black p-4 font-mono text-xs h-32 overflow-hidden relative">
            <div className="absolute top-2 right-2 text-green-800 text-[10px]">LIVE LOGS</div>
            <div className="space-y-1 text-green-600/80">
                <p>> [SYSTEM] Module A (Map) loaded.</p>
                <p>> [ASSETS] Icons loaded from local storage (Sovereign Mode).</p>
                <p>> [RENDER] MapContainer initialized with ResizeController.</p>
                <p className="text-green-400 animate-pulse">> [READY] Tactical Grid Online.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}