import React from 'react';

interface Props {
  score: number;
  level: 'hypothèse' | 'faible' | 'forte';
}

export const ConfidenceGauge = ({ score, level }: Props) => {
  const compromised = score === 0;
  return (
    <div className={p-4 border-l-4 \}>
      <h3 className="text-xs font-bold uppercase text-gray-400">Module 22 - Gouvernance du Doute</h3>
      <div className="mt-2 flex items-baseline gap-4">
        <span className="text-3xl font-mono font-bold text-white">{(score * 100).toFixed(0)}%</span>
        <span className={	ext-sm font-medium \}>
          {compromised ? 'INTÉGRITÉ ROMPUE' : level.toUpperCase()}
        </span>
      </div>
    </div>
  );
};
