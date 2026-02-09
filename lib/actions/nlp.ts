'use server'
import AdmZip from 'adm-zip';
import path from 'path';

export async function analyzeNarratives() {
    const zipPath = path.join(process.cwd(), 'STRATWATCH_PROD_EXPORT_20260111_030900.zip');
    
    // Mots-clés de veille stratégique (dictionnaire déterministe)
    const indicators = ['alerte', 'sécurité', 'influence', 'menace', 'opportunité', 'souveraineté'];
    
    try {
        const zip = new AdmZip(zipPath);
        const zipEntries = zip.getEntries();
        let combinedText = '';

        // On scanne uniquement les fichiers texte ou JSON
        zipEntries.forEach(entry => {
            if (entry.entryName.endsWith('.txt') || entry.entryName.endsWith('.json')) {
                combinedText += entry.getData().toString('utf8').toLowerCase();
            }
        });

        // Calcul des fréquences
        const findings = indicators.map(word => ({
            keyword: word,
            count: (combinedText.match(new RegExp(word, 'g')) || []).length
        })).filter(f => f.count > 0);

        return {
            success: true,
            narratives: findings,
            totalHits: findings.reduce((acc, curr) => acc + curr.count, 0)
        };
    } catch (e) {
        return { success: false, narratives: [], totalHits: 0 };
    }
}
