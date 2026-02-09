'use server'
import AdmZip from 'adm-zip';
import path from 'path';

export async function analyzeGeoData() {
    const zipPath = path.join(process.cwd(), 'STRATWATCH_PROD_EXPORT_20260111_030900.zip');
    
    // Zone d'intérêt stratégique
    const locations = ['algérie', 'mauritanie', 'mali', 'niger', 'burkina faso', 'maroc'];

    try {
        const zip = new AdmZip(zipPath);
        const zipEntries = zip.getEntries();
        let combinedText = '';

        zipEntries.forEach(entry => {
            if (entry.entryName.endsWith('.txt') || entry.entryName.endsWith('.json')) {
                combinedText += entry.getData().toString('utf8').toLowerCase();
            }
        });

        const geoHits = locations.map(loc => ({
            place: loc,
            count: (combinedText.match(new RegExp(loc, 'g')) || []).length
        })).filter(g => g.count > 0);

        return {
            success: true,
            locations: geoHits,
            totalHits: geoHits.length
        };
    } catch (e) {
        return { success: false, locations: [], totalHits: 0 };
    }
}
