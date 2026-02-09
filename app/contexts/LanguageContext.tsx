'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

export const translations = {
  fr: {
    'nav.dashboard': 'Tableau de Bord',
    'nav.worldMap': 'Carte Mondiale',
    'nav.feed': 'Flux Temps Réel',
    'app.title': 'StratWatch AI'
  },
  ar: {
    'nav.dashboard': 'لوحة القيادة',
    'nav.worldMap': 'خريطة العالم',
    'nav.feed': 'التدفق المباشر',
    'app.title': 'استرات-واتش'
  }
};

// Valeur par défaut robuste (Empêche le crash SSG si hors Provider)
const defaultContextValue: LanguageContextType = {
  language: 'fr',
  setLanguage: () => {},
  t: (key: string) => key,
  dir: 'ltr'
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string) => {
    // CORRECTIF DETTE 1 : Typage strict, plus de @ts-ignore
    const langData = translations[language];
    return langData[key as keyof typeof langData] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir} className="contents">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

// CORRECTIF DETTE 2 : Hook simplifié (Context garanti non-null)
export const useLanguage = () => useContext(LanguageContext);