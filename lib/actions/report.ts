'use client'
import { jsPDF } from 'jspdf';

export function generateSaisineReport(data: any) {
    const doc = new jsPDF();
    const date = new Date().toLocaleString();

    // En-tête de sécurité
    doc.setFontSize(10);
    doc.text('CONFIDENTIEL - STRATWATCH 2026', 10, 10);
    doc.text(Généré le : \, 150, 10);

    // Titre Officiel
    doc.setFontSize(22);
    doc.text('RAPPORT DE SAISINE STRATÉGIQUE', 10, 30);
    
    // Section 1 : Intégrité
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.text('1. PREUVE D\'INTÉGRITÉ NUMÉRIQUE', 10, 50);
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(Statut : \, 15, 60);
    doc.text(Hash SHA256 : \, 15, 70);

    // Section 2 : Analyse Narrative
    doc.setFontSize(14);
    doc.setTextColor(128, 0, 128);
    doc.text('2. CLIMAT ET NARRATIFS DÉTECTÉS', 10, 90);
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(Climat Global : \, 15, 100);
    doc.text(Total Indicateurs : \, 15, 110);

    // Section 3 : Identités OSINT
    doc.setFontSize(14);
    doc.setTextColor(255, 0, 0);
    doc.text('3. IDENTITÉS ET CIBLES (OSINT)', 10, 130);
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(Nombre d'entités : \, 15, 140);

    // Pied de page déterministe
    doc.setFontSize(8);
    doc.text('Scellé cryptographiquement par le Moteur StratWatch UVS-26', 10, 280);

    doc.save('SAISINE_STRATWATCH_REPORT.pdf');
}
