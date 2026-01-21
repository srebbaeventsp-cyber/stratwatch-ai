'use server'
import AdmZip from 'adm-zip';
import path from 'path';

export async function analyzeTemporalData() {
    const zipPath = path.join(process.cwd(), 'STRATWATCH_PROD_EXPORT_20260111_030900.zip');
    
    try {
        const zip = new AdmZip(zipPath);
        const zipEntries = zip.getEntries();
        let combinedText = '';

        zipEntries.forEach(entry => {
            if (entry.entryName.endsWith('.txt') || entry.entryName.endsWith('.json')) {
                combinedText += entry.getData().toString('utf8');
            }
        });

        // Extraction des années (2020-2026)
        const yearPattern = /202[0-6]/g;
        const yearsFound = combinedText.match(yearPattern) || [];
        
        const timeline = {};
        yearsFound.forEach(year => {
            timeline[year] = (timeline[year] || 0) + 1;
        });

        const sortedTimeline = Object.entries(timeline)
            .map(([year, count]) => ({ year, count }))
            .sort((a, b) => b.year.localeCompare(a.year));

        return {
            success: true,
            timeline: sortedTimeline,
            latestUpdate: sortedTimeline[0]?.year || '2026'
        };
    } catch (e) {
        return { success: false, timeline: [], latestUpdate: 'N/A' };
    }
}
