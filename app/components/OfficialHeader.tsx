'use client';
import React from "react";
import { Menu, Shield } from "lucide-react";

export default function OfficialHeader({ onMenuClick }: any) {
  return (
    <header className="bg-stw-charcoal border-b border-soft h-12 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="text-white hover:bg-white/10 p-1 rounded"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 text-white font-bold uppercase tracking-widest">
          <Shield size={16} className="text-stw-amber" />
          StratWatch AI
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-[10px] font-mono text-stw-ivory-muted">
          SYSTEM_ONLINE
        </span>
      </div>
    </header>
  );
}
