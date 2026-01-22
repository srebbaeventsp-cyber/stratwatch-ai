'use client'

import { jsPDF } from 'jspdf';

export function generateSaisineReport(data: any) {
  const doc = new jsPDF();

  doc.setFontSize(12);
  doc.text('Rapport de saisine', 10, 10);

  if (data) {
    doc.text(JSON.stringify(data, null, 2), 10, 20);
  }

  doc.save('saisine.pdf');
}
