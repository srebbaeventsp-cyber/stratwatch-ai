'use server'
import AdmZip from 'adm-zip';
import path from 'path';

export async function runOsintScan() {
    const zipPath = path.join(process.cwd(), 'STRATWATCH_PROD_EXPORT_20260111_030900.zip');
    
    try {
        const zip = new AdmZip(zipPath);
        const zipEntries = zip.getEntries();
        let content = '';

        zipEntries.forEach(entry => {
            if (entry.entryName.match(/\.(txt|json|csv)$/i)) {
                content += entry.getData().toString('utf8');
            }
        });

        // Regex déterministe pour emails et patterns d'identifiants
        const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const emailsFound = Array.from(new Set(content.match(emailPattern) || []));

        return {
            success: true,
            entitiesCount: emailsFound.length,
            preview: emailsFound.slice(0, 3),
            status: emailsFound.length > 0 ? 'IDENTITÉS_DÉTECTÉES' : 'CLEAN'
        };
    } catch (e) {
        return { success: false, entitiesCount: 0, status: 'ERREUR_OSINT' };
    }
}
