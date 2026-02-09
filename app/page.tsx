'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Activity, Globe, Terminal, Lock, Cpu, Server, Radio } from 'lucide-react';

export default function StratWatchDashboard() {
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono selection:bg-green-900 selection:text-white">
      {/* HEADER STRATÉGIQUE */}
      <header className="border-b border-green-900/50 p-4 flex justify-between items-center bg-black/90 backdrop-blur fixed w-full top-0 z-50">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 animate-pulse text-green-400" />
          <h1 className="text-xl font-bold tracking-widest">STRATWATCH<span className="text-white">.AI</span> <span className="text-xs text-green-900 bg-green-400/20 ml-2 border border-green-500/30 px-2 py-0.5 rounded">V4.0 SOVEREIGN</span></h1>
        </div>
        <div className="flex gap-6 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>SYSTEM: ONLINE</span>
          </div>
          <div className="flex items-center gap-2 text-green-700">
            <Lock className="w-3 h-3" />
            <span>ENCRYPTED_CHANNEL</span>
          </div>
        </div>
      </header>

      {/* ZONE OPÉRATIONNELLE */}
      <div className="pt-24 px-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
        
        {/* COLONNE GAUCHE : NAVIGATION TACTIQUE */}
        <aside className="md:col-span-3 space-y-6">
          
          {/* STATUS PANEL */}
          <div className="p-4 border border-green-900/50 bg-green-950/10 rounded-sm">
             <div className="flex items-center justify-between mb-4 border-b border-green-900/50 pb-2">
                <span className="text-xs text-gray-400">RESSOURCES</span>
                <Server className="w-4 h-4 text-green-600" />
             </div>
             <div className="space-y-3 text-xs">
                <div className="flex justify-between"><span>CPU_CORE_0</span> <span className="text-white">12%</span></div>
                <div className="w-full bg-green-900/20 h-1"><div className="bg-green-600 h-1 w-[12%]"></div></div>
                
                <div className="flex justify-between"><span>MEM_ALLOC</span> <span className="text-white">342MB</span></div>
                <div className="w-full bg-green-900/20 h-1"><div className="bg-green-600 h-1 w-[24%]"></div></div>
             </div>
          </div>

          <nav className="space-y-2">
            <div className="text-xs text-gray-500 font-bold px-2 mb-2">MODULES ACTIFS</div>
            <button className="w-full text-left p-3 border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/50 transition-all flex items-center gap-3 group">
              <Globe className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
              <span className="text-sm">Global Surveillance</span>
            </button>
            <button className="w-full text-left p-3 border border-green-900/30 hover:bg-green-900/10 transition-all flex items-center gap-3 group">
              <Terminal className="w-4 h-4 text-gray-500 group-hover:text-green-500" />
              <span className="text-sm text-gray-400 group-hover:text-green-400">OSINT Toolkit</span>
            </button>
            <button className="w-full text-left p-3 border border-green-900/30 hover:bg-green-900/10 transition-all flex items-center gap-3 group">
              <Radio className="w-4 h-4 text-gray-500 group-hover:text-green-500" />
              <span className="text-sm text-gray-400 group-hover:text-green-400">Signals Intelligence</span>
            </button>
          </nav>
        </aside>

        {/* ZONE CENTRALE : DASHBOARD */}
        <section className="md:col-span-9 space-y-6">
          {/* WELCOME PANEL */}
          <div className="border border-green-800 bg-black p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cpu className="w-32 h-32 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">INITIALISATION V4 TERMINÉE.</h2>
            <div className="h-1 w-24 bg-green-600 mb-6"></div>
            <p className="text-gray-400 mb-8 max-w-2xl leading-relaxed">
              Le noyau <span className="text-green-400 font-bold">StratWatch Sovereign</span> est opérationnel.
              L'architecture Next.js 14 App Router assure désormais la stabilité du flux de données.
              Les modules d'intelligence sont en attente de connexion.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-sm font-bold text-sm tracking-wider transition-all shadow-[0_0_15px_rgba(21,128,61,0.4)] hover:shadow-[0_0_25px_rgba(21,128,61,0.6)]">
                LANCER LE SCAN PRIORITAIRE
              </button>
              <Link href="/dashboard" className="flex items-center gap-2 border border-green-800 text-green-500 hover:border-green-500 hover:text-white px-8 py-3 rounded-sm font-bold text-sm transition-all">
                <Activity className="w-4 h-4" />
                ACCÉDER AU SYSTÈME V3 (LEGACY)
              </Link>
            </div>
          </div>

          {/* GRID MODULES EMPTY SLOTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 border border-green-900/30 bg-green-950/5 flex flex-col items-center justify-center gap-2 text-green-900/50 hover:text-green-500/50 hover:border-green-500/30 hover:bg-green-900/10 transition-all cursor-crosshair">
                <div className="text-xs font-bold border border-green-900/30 px-2 py-1 rounded">SLOT_0{i}</div>
                <span className="text-[10px] tracking-widest">AWAITING MODULE</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      {/* FOOTER */}
      <footer className="fixed bottom-0 w-full text-center p-2 text-[10px] text-green-900 bg-black/80 border-t border-green-900/30 pointer-events-none">
        STRATWATCH AI CORE  V4.0.1-DEV  LATENCY: 12ms  ENCRYPTION: AES-256
      </footer>
    </main>
  );
}