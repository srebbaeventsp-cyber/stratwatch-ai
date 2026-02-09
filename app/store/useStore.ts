import { create } from 'zustand';
import { Article, FeedFilters, Zone, SystemLog, StrategicAxis, MediaType, Priority, Tone, SystemNotification } from '../types';
import { generateMockArticle, detectZones, classifyAxes } from '../services/analysisEngine';
import { View } from '../components/NavSidebar';
import { aiService } from '../services/aiService';

interface StratWatchState {
  articles: Article[];
  auditLogs: SystemLog[];
  notifications: SystemNotification[];
  filters: FeedFilters;
  activeView: View;
  isLoading: boolean;
  isSidebarOpen: boolean;
  isFocusMode: boolean;
  isWorldDashboard: boolean;
  stagedMedia: any;
  neuronalMode: boolean;
  autoIngestActive: boolean;
  focusMode: boolean;

  setArticles: (articles: Article[]) => void;
  addArticle: (article: Article) => void;
  addAuditLog: (log: Partial<SystemLog>) => void;
  toggleFlag: (id: string) => void;
  setFilters: (filters: Partial<FeedFilters>) => void;
  setActiveView: (view: View) => void;
  toggleFocusMode: () => void;
  setIsSidebarOpen: (v: boolean) => void;
  setIsWorldDashboard: (v: boolean) => void;
  stageMedia: (m: any) => void;
  toggleNeuronalMode: () => void;
  fetchArticles: () => Promise<void>;
  triggerCrawl: () => Promise<void>;
  startAutoIngest: () => void;
  resetStore: () => void;
  dismissNotification: (id: string) => void;
}

const INITIAL_FILTERS: FeedFilters = { 
  zone: 'ALL', 
  axis: 'ALL', 
  sourceType: 'ALL', 
  tone: 'ALL', 
  crossReferencedOnly: false,
  country: 'ALL'
};

export const useStore = create<StratWatchState>((set, get) => ({
  articles: [],
  auditLogs: [],
  notifications: [],
  filters: INITIAL_FILTERS,
  activeView: View.DASHBOARD,
  isLoading: false,
  isSidebarOpen: false,
  isFocusMode: false,
  isWorldDashboard: false,
  stagedMedia: null,
  neuronalMode: true,
  autoIngestActive: false,
  focusMode: false,

  setArticles: (articles) => set({ articles }),
  addArticle: (article) => set((state) => ({ articles: [article, ...state.articles].slice(0, 500) })),
  
  addAuditLog: (log) => {
    const newLog: SystemLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      userId: log.userId || 'SYSTEM',
      action: log.action || 'UNKNOWN',
      severity: log.severity || 'info',
      details: log.details || '',
      ip: log.ip
    };
    if (newLog.severity === 'critical' || newLog.severity === 'high') {
       const notif: SystemNotification = {
         id: newLog.id,
         type: newLog.severity === 'critical' ? 'danger' : 'info',
         title: newLog.action,
         message: newLog.details,
         timestamp: newLog.timestamp
       };
       set(state => ({ notifications: [notif, ...state.notifications] }));
    }
    set((state) => ({ auditLogs: [newLog, ...state.auditLogs].slice(0, 100) }));
  },

  toggleFlag: (id) => set((state) => ({ articles: state.articles.map(a => a.id === id ? { ...a, isFlagged: !a.isFlagged } : a) })),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  setActiveView: (view) => set({ activeView: view }),
  toggleFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),
  setIsSidebarOpen: (v) => set({ isSidebarOpen: v }),
  setIsWorldDashboard: (v) => set({ isWorldDashboard: v }),
  stageMedia: (m) => set({ stagedMedia: m }),
  toggleNeuronalMode: () => set((state) => ({ neuronalMode: !state.neuronalMode })),
  
  dismissNotification: (id) => set(state => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),

  resetStore: () => {
      set({ articles: [], auditLogs: [], filters: INITIAL_FILTERS, activeView: View.DASHBOARD });
      get().fetchArticles();
  },

  fetchArticles: async () => {
    set({ isLoading: true });
    const mocks = Array.from({ length: 15 }, generateMockArticle);
    set({ articles: mocks, isLoading: false });
  },

  triggerCrawl: async () => {
    const article = generateMockArticle();
    const baseZones = detectZones(article.title);
    const baseAxes = classifyAxes(article.title);
    article.zones = [...new Set([...article.zones, ...baseZones])];
    article.axes = [...new Set([...article.axes, ...baseAxes])];

    if (get().neuronalMode) {
      try {
        if (Math.random() > 0.7) {
             article.analysis = "Signal enrichi par Aegis-AI.";
        }
      } catch (e) { }
    }
    get().addArticle(article);
  },

  startAutoIngest: () => {
      if (get().autoIngestActive) return;
      set({ autoIngestActive: true });
      setInterval(() => { get().triggerCrawl(); }, 8000);
  }
}));