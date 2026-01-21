'use server'
import fs from 'fs';
import path from 'path';
import CryptoJS from 'crypto-js';

export async function checkExportIntegrity() {
    const dataPath = path.join(process.cwd(), 'STRATWATCH_PROD_EXPORT_20260111_030900.zip');
    const hashPath = path.join(process.cwd(), 'STRATWATCH_PROD_EXPORT_20260111_030900.zip.sha256');

    if (!fs.existsSync(dataPath) || !fs.existsSync(hashPath)) {
        return { score: 0, level: 'hypothèse', status: 'FICHIERS_MANQUANTS', hash: 'N/A' };
    }

    try {
        const fileBuffer = fs.readFileSync(dataPath);
        const expectedHash = fs.readFileSync(hashPath, 'utf8').trim().split(' ')[0];
        const actualHash = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(fileBuffer)).toString();

        const isValid = actualHash.toLowerCase() === expectedHash.toLowerCase();
        
        return {
            score: isValid ? 1.0 : 0.0,
            level: isValid ? 'forte' : 'faible',
            status: isValid ? 'INTÈGRE' : 'CORROMPU',
            hash: actualHash
        };
    } catch (error) {
        return { score: 0, level: 'hypothèse', status: 'ERREUR_LECTURE', hash: 'ERROR' };
    }
}
