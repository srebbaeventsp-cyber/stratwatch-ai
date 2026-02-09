'use server'
import AdmZip from 'adm-zip';
import path from 'path';
import fs from 'fs';

export async function extractNarrativeData() {
    const zipPath = path.join(process.cwd(), 'STRATWATCH_PROD_EXPORT_20260111_030900.zip');
    
    if (!fs.existsSync(zipPath)) {
        return { success: false, count: 0, status: 'ZIP_NON_DÉTECTÉ' };
    }

    try {
        const zip = new AdmZip(zipPath);
        const zipEntries = zip.getEntries();
        
        return {
            success: true,
            count: zipEntries.length,
            status: 'EXTRACTION_PRÊTE'
        };
    } catch (e) {
        return { success: false, count: 0, status: 'ERREUR_EXTRACTION' };
    }
}
