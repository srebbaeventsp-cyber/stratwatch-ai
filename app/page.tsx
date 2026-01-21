import { ConfidenceGauge } from '../components/ConfidenceGauge';
import { checkExportIntegrity } from '../lib/actions/integrity';
import { extractNarrativeData } from '../lib/actions/extractor';
import { analyzeNarratives } from '../lib/actions/nlp';
import { analyzeSentiment } from '../lib/actions/sentiment';
import { analyzeGeoData } from '../lib/actions/geoloc';
import { analyzeTemporalData } from '../lib/actions/chrono';

export default async function Dashboard() {
  const [integrity, extraction, nlp, sementic, geo, chrono] = await Promise.all([
    checkExportIntegrity(),
    extractNarrativeData(),
    analyzeNarratives(),
    analyzeSentiment(),
    analyzeGeoData(),
    analyzeTemporalData()
  ]);

  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="mb-12 border-b border-gray-800 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase">STRATWATCH <span className="text-blue-600">2026</span></h1>
          <p className="text-gray-500 text-sm italic font-mono uppercase text-blue-400">Usine de Vérité | Cycle d'Analyse Actif</p>
        </div>
        <div className="text-right font-mono text-[10px] text-gray-600 uppercase">
          Ancrage : \...
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <ConfidenceGauge score={integrity.score} level={integrity.level as any} />
        
        <div className="p-4 bg-gray-900/50 border border-gray-800">
          <h3 className="text-xs font-bold uppercase text-blue-500">M-01 Ingestion / M-05 Climat</h3>
          <p className="mt-2 font-mono text-sm text-green-500 font-bold uppercase"> \</p>
          <p className="text-[10px] mt-2 text-white font-black bg-purple-900/60 px-2 inline-block rounded">
             CLIMAT : \
          </p>
        </div>

        <div className="p-4 bg-gray-900/50 border border-gray-800">
          <h3 className="text-xs font-bold uppercase text-purple-500">M-15 Narratifs / M-11 Géo</h3>
          <p className="mt-2 font-mono text-sm text-white font-bold uppercase"> \ DOCUMENTS</p>
          <div className="mt-2 flex flex-wrap gap-1">
             {geo.locations.map(g => (
               <span key={g.place} className="text-[9px] bg-gray-800 px-1 text-gray-300 border border-gray-700">
                 \ (\)
               </span>
             ))}
          </div>
        </div>

        <div className="p-4 bg-gray-900/50 border border-gray-800">
          <h3 className="text-xs font-bold uppercase text-orange-500">M-03 Chronologie</h3>
          <div className="mt-2 flex flex-col gap-1">
             {chrono.timeline.slice(0, 3).map(t => (
               <div key={t.year} className="flex justify-between font-mono text-[10px]">
                 <span className="text-gray-500">CYCLE \</span>
                 <span className="text-white font-bold">\ SIGNAUX</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </main>
  );
}
