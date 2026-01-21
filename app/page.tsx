import { ConfidenceGauge } from '../components/ConfidenceGauge';

export default function Dashboard() {
  const mockIntegrity = { score: 1.0, level: 'forte' as const };

  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="mb-12 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-black tracking-tighter text-white">STRATWATCH <span className="text-blue-600">2026</span></h1>
        <p className="text-gray-500 text-sm">Usine de Vérité Stratégique | Mode Expert Senior</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConfidenceGauge score={mockIntegrity.score} level={mockIntegrity.level} />
        <div className="p-4 bg-gray-900/50 border border-gray-800">
          <h3 className="text-xs font-bold uppercase text-gray-400">Module 01 - Ingestion HIVE</h3>
          <p className="mt-2 font-mono text-green-500 text-sm"> SYNC_READY: STRATWATCH_PROD_EXPORT.zip</p>
        </div>
      </div>
    </main>
  );
}
