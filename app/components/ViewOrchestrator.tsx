'use client';
import React from "react";

export default function ViewOrchestrator({ activeView }: any) {
  return (
    <div className="p-10 text-white font-mono text-center">
      <div>VUE ACTIVE : {activeView}</div>

      <div className="mt-4 text-stw-amber text-xs">
        Système Opérationnel
      </div>
    </div>
  );
}
