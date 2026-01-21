import { ConfidenceGauge } from '../components/ConfidenceGauge';
import { checkExportIntegrity } from '../lib/actions/integrity';
import { extractNarrativeData } from '../lib/actions/extractor';

export default async function Dashboard() {
  const integrity = await checkExportIntegrity();
  const extraction = await extractNarrativeData();

  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="mb-12 border-b border-gray-800 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-white">STRATWATCH <span className="text-blue-600">2026</span></h1>
          <p className="text-gray-500 text-sm">Usine de Vérité Stratégique | Expert Senior</p>
        </div>
        <div className="text-right font-mono text-[10px] text-gray-600 uppercase">
          Ancrage : \...
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module 22 & 04 */}
        <ConfidenceGauge score={integrity.score} level={integrity.level as any} />
        
        {/* Module 01 */}
        <div className="p-4 bg-gray-900/50 border border-gray-800">
          <h3 className="text-xs font-bold uppercase text-blue-500">Module 01 - Ingestion</h3>
          <p className="mt-2 font-mono text-sm \">
             \
          </p>
          <p className="text-[10px] text-gray-600 mt-2">TARGET: PROD_EXPORT_20260111</p>
        </div>

        {/* Module 15 */}
        <div className="p-4 bg-gray-900/50 border border-gray-800">
          <h3 className="text-xs font-bold uppercase text-purple-500">Module 15 - Narratifs</h3>
          <p className="mt-2 font-mono text-sm"> \</p>
          <p className="text-[10px] text-gray-400 mt-2 font-mono">FILES: \ entrées détectées</p>
        </div>
      </div>
    </main>
  );
}
