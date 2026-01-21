import { ConfidenceGauge } from '../components/ConfidenceGauge';
import { checkExportIntegrity } from '../lib/actions/integrity';
import { extractNarrativeData } from '../lib/actions/extractor';
import { analyzeNarratives } from '../lib/actions/nlp';
import { analyzeSentiment } from '../lib/actions/sentiment';

export default async function Dashboard() {
  const integrity = await checkExportIntegrity();
  const extraction = await extractNarrativeData();
  const nlp = await analyzeNarratives();
  const sementic = await analyzeSentiment();

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ConfidenceGauge score={integrity.score} level={integrity.level as any} />
        
        <div className="p-4 bg-gray-900/50 border border-gray-800">
          <h3 className="text-xs font-bold uppercase text-blue-500">Module 01 - Ingestion</h3>
          <p className="mt-2 font-mono text-sm text-green-500 font-bold"> \</p>
          <p className="text-[10px] text-gray-600 mt-2 uppercase text-white font-black bg-purple-900/40 px-1 inline-block">
             CLIMAT : \
          </p>
        </div>

        <div className="p-4 bg-gray-900/50 border border-gray-800">
          <h3 className="text-xs font-bold uppercase text-purple-500">Module 15 - Narratifs</h3>
          <p className="mt-2 font-mono text-sm text-white uppercase font-bold"> \ Documents</p>
          <p className="text-[10px] text-gray-400 mt-2 font-mono uppercase">Hits : \ | Hostile : \</p>
        </div>

        <div className="p-4 bg-gray-900/50 border border-gray-800">
          <h3 className="text-xs font-bold uppercase text-orange-500 font-black">Analyse Lexicale</h3>
          <div className="mt-2 space-y-1">
            {nlp.narratives.map(n => (
              <div key={n.keyword} className="flex justify-between text-[10px] font-mono border-b border-gray-800 pb-1">
                <span className="text-gray-400 uppercase">{n.keyword}</span>
                <span className="text-white font-bold">{n.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
