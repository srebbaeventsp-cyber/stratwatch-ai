'use server'
import AdmZip from 'adm-zip';
import path from 'path';

export async function analyzeSentiment() {
    const zipPath = path.join(process.cwd(), 'STRATWATCH_PROD_EXPORT_20260111_030900.zip');
    
    // Lexiques déterministes
    const hostileWords = ['attaque', 'conflit', 'sanction', 'crise', 'désinformation', 'ingérence', 'agression'];
    const favorableWords = ['partenariat', 'accord', 'croissance', 'stabilité', 'coopération', 'succès', 'souveraineté'];

    try {
        const zip = new AdmZip(zipPath);
        const zipEntries = zip.getEntries();
        let combinedText = '';

        zipEntries.forEach(entry => {
            if (entry.entryName.endsWith('.txt') || entry.entryName.endsWith('.json')) {
                combinedText += entry.getData().toString('utf8').toLowerCase();
            }
        });

        const hostileHits = hostileWords.filter(word => combinedText.includes(word)).length;
        const favorableHits = favorableWords.filter(word => combinedText.includes(word)).length;

        // Calcul du climat (Ratio)
        let climate = 'NEUTRE';
        if (hostileHits > favorableHits) climate = 'HOSTILE';
        if (favorableHits > hostileHits) climate = 'FAVORABLE';

        return {
            success: true,
            climate: climate,
            hostileScore: hostileHits,
            favorableScore: favorableHits
        };
    } catch (e) {
        return { success: false, climate: 'ERREUR', hostileScore: 0, favorableScore: 0 };
    }
}
