'use client';
import React from 'react';
import { 
  LayoutDashboard, Activity, Globe, Scan, FileText, ClipboardCheck, Zap,
  ShieldCheck, Search, Share2, Network
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FeedFilters } from '../types';
import { useStore } from '../store/useStore';

export enum View {
  DASHBOARD = "VUE GLOBALE",
  WORLD_MAP = "CARTE MONDIALE",
  FEED = "SURVEILLANCE",
  SOCIAL = "RÉSEAUX SOCIAUX",
  INFLUENCE_NET = "RÉSEAU D'INFLUENCE",
  CAMPAIGN_TIMELINE = "TIMELINE CRISE",
  TV = "MONITORING TV",
  RADIO = "RADIO INTERCEPTION",
  SOURCES_LIST = "FIABILITÉ SOURCES",
  MIND_MAP = "ANALYSE MATRIX",
  RESPONSE = "RIPOSTE IA",
  FORENSICS = "FORENSIC LAB",
  REPORTS = "EXPORTS PDF",
  ADMIN_MASTER = "MASTER COMMAND",
  REFERRALS = "SAISINES L2I",
  DECISION_NOTE = "NOTE DÉCIDEUR",
  POWER_REPORT = "RAPPORT PUISSANCE",
  ARCHITECTURE = "ARCHITECTURE",
  MINISTERIAL = "BRIEFING MAE",
  OSINT = "OSINT TOOLKIT"
}

interface NavSidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
  isOpen?: boolean; 
  onClose?: () => void;
  filters?: FeedFilters;
  setFilters?: (f: Partial<FeedFilters>) => void;
  setActiveView?: (v: View) => void; 
}

const NavSidebar: React.FC<NavSidebarProps> = ({ activeView, onViewChange, isOpen }) => {
  const { t } = useLanguage();
  const { isSidebarOpen } = useStore();
  
  const baseClasses = "fixed inset-y-0 left-0 z-40 w-64 bg-stw-surface border-r border-soft transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col";
  const mobileTransform = (isOpen || isSidebarOpen) ? "translate-x-0" : "-translate-x-full";
  const sidebarClasses = baseClasses + " " + mobileTransform;

  const menuItems = [
    { 
      category: "OPÉRATIONS",
      items: [
        { id: View.DASHBOARD, label: "Tableau de Bord", icon: LayoutDashboard },
        { id: View.WORLD_MAP, label: "Carte Mondiale", icon: Globe },
        { id: View.FEED, label: "Flux Temps Réel", icon: Activity },
      ]
    },
    {
      category: "INTELLIGENCE",
      items: [
        { id: View.SOCIAL, label: "Réseaux Sociaux", icon: Share2 },
        { id: View.INFLUENCE_NET, label: "Graphes d'Influence", icon: Network },
        { id: View.FORENSICS, label: "Labo Forensic", icon: Scan },
        { id: View.OSINT, label: "Boîte à Outils OSINT", icon: Search },
      ]
    },
    {
      category: "STRATÉGIE",
      items: [
        { id: View.RESPONSE, label: "Générateur Riposte", icon: Zap },
        { id: View.DECISION_NOTE, label: "Note Décideur", icon: FileText },
        { id: View.REPORTS, label: "Rapports PDF", icon: ClipboardCheck },
      ]
    }
  ];

  return (
    <div className={sidebarClasses}>
      <div className="p-4 border-b border-soft flex items-center gap-3">
        <div className="w-8 h-8 bg-stw-amber rounded-sm flex items-center justify-center">
            <ShieldCheck size={18} className="text-stw-charcoal" />
        </div>
        <div>
            <div className="text-xs font-black uppercase text-stw-ivory tracking-widest">StratWatch</div>
            <div className="text-[8px] font-mono text-stw-meta">Sovereign v4.0.1</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6 px-4">
            <h3 className="text-[9px] font-black text-stw-meta uppercase tracking-[0.2em] mb-3 ml-2">
              {section.category}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = activeView === item.id;
                const activeBtnClass = "bg-stw-amber/10 text-stw-amber border border-stw-amber/20 shadow-[0_0_15px_rgba(138,106,47,0.1)]";
                const inactiveBtnClass = "text-stw-ivory-muted hover:bg-white/5 hover:text-stw-ivory";
                const btnClasses = "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[11px] font-bold uppercase tracking-wide transition-all " + (isActive ? activeBtnClass : inactiveBtnClass);

                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={btnClasses}
                  >
                    <item.icon size={14} className={isActive ? "text-stw-amber" : "opacity-70"} />
                    {item.label}
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-stw-amber animate-pulse" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavSidebar;