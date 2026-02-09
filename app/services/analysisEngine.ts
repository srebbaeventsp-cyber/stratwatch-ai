import { Article, Priority, Tone, Zone, StrategicAxis, MediaType } from '../types';

export const generateMockArticle = (): Article => ({
    id: Math.random().toString(36).substr(2, 9),
    title: "Signal detecte : Mouvement suspect a la frontiere",
    summary: "Analyse preliminaire indique une activite non conventionnelle.",
    sourceName: "Source Locale",
    sourceCountry: "Mauritanie",
    date: new Date().toISOString(),
    priority: Priority.WATCH,
    tone: Tone.NEU,
    zones: [Zone.SAHEL],
    axes: [StrategicAxis.SEC],
    influence_score: 45,
    isFlagged: false,
    link: "#",
    sourceType: MediaType.ONLINE
});

export const detectZones = (text: string): Zone[] => {
    const zones: Zone[] = [];
    const lower = text.toLowerCase();
    if (lower.includes('sahel') || lower.includes('mali')) zones.push(Zone.SAHEL);
    if (lower.includes('maghreb') || lower.includes('maroc')) zones.push(Zone.MAGHREB);
    return zones.length > 0 ? zones : [Zone.MAURITANIE];
};

export const classifyAxes = (text: string): StrategicAxis[] => {
    const axes: StrategicAxis[] = [];
    const lower = text.toLowerCase();
    if (lower.includes('armee') || lower.includes('militaire')) axes.push(StrategicAxis.MIL);
    if (lower.includes('securite')) axes.push(StrategicAxis.SEC);
    return axes.length > 0 ? axes : [StrategicAxis.GEO];
};

export const getReportStatistics = (articles: Article[], period: string) => {
    return {
        totalArticles: articles.length,
        alertArticles: articles.filter(a => a.priority === Priority.ALERT),
        hostileArticles: articles.filter(a => a.tone === Tone.HOS),
        topZone: "SAHEL",
        axisStats: [
            { name: "SECURITE", count: 12, hostileCount: 2 },
            { name: "POLITIQUE", count: 8, hostileCount: 1 }
        ]
    };
};

export const generateReportSummary = (stats: any, period: string) => {
    return `Rapport ${period} genere. Volume total: ${stats.totalArticles} signaux. Niveau de menace: MODERE.`;
};