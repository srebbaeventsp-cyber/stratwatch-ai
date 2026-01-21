import { ConfidenceGauge } from '../components/ConfidenceGauge';
import { checkExportIntegrity } from '../lib/actions/integrity';
import { extractNarrativeData } from '../lib/actions/extractor';
import { analyzeNarratives } from '../lib/actions/nlp';
import { analyzeSentiment } from '../lib/actions/sentiment';
import { analyzeGeoData } from '../lib/actions/geoloc';
import { runOsintScan } from '../lib/actions/osint';

export default async function Dashboard() {
  const [integrity, extraction, nlp, sementic, geo, osint] = await Promise.all([
    checkExportIntegrity(),
    extractNarrativeData(),
    analyzeNarratives(),
    analyzeSentiment(),
    analyzeGeoData(),
    runOsintScan()
  ]);

  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="mb-12 border-b border-gray-800 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase">STRATWATCH <span className="text-blue-600">2026</span></h1>
          <p className="text-gray-500 text-sm italic font-mono uppercase">Full Sovereign Intelligence | Expert senior</p>
        </div>
        <div className="text-right font-mono text-[10px] text-gray-600 uppercase">
          Preuve : \...
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ConfidenceGauge score={integrity.score} level={integrity.level as any} />
        
        <div className="p-4 bg-gray-900/50 border border-gray-800">
          <h3 className="text-xs font-bold uppercase text-blue-500">M-01 Ingestion / M-23 OSINT</h3>
          <p className="mt-2 font-mono text-sm text-green-500 font-bold uppercase"> \</p>
          <p className="text-[10px] mt-2 text-white font-black bg-red-900/60 px-2 inline-block rounded uppercase">
             CIBLES : \
          </p>
        </div>

        <div className="p-4 bg-gray-900/50 border border-gray-800">
          <h3 className="text-xs font-bold uppercase text-purple-500">M-15 Narratifs / M-11 Géo</h3>
          <p className="mt-2 font-mono text-sm text-white font-bold uppercase"> \ DOCS</p>
          <p className="text-[10px] text-gray-400 mt-2 font-mono uppercase italic">\ Lieux identifiés</p>
        </div>

        <div className="p-4 bg-gray-900/50 border border-gray-800">
          <h3 className="text-xs font-bold uppercase text-orange-500 font-black">M-05 Climat</h3>
          <div className="mt-2">
            <span className="text-2xl font-mono font-bold">\</span>
            <div className="mt-2 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
               <div className="h-full bg-red-600" style={{ width: '\%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
