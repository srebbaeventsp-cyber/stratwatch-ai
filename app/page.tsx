'use client';
import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import OfficialHeader from './components/OfficialHeader';
import NavSidebar, { View } from './components/NavSidebar';
import ViewOrchestrator from './components/ViewOrchestrator';
import AIAssistantCommand from './components/AIAssistantCommand';
import AlertToastContainer from './components/AlertToastContainer';
import FocusOverlay from './components/FocusOverlay';
import { useLanguage } from './contexts/LanguageContext';

export default function App() {
  const { 
    fetchArticles, 
    startAutoIngest,
    activeView,
    setActiveView,
    filters,
    setFilters,
    isSidebarOpen,
    setIsSidebarOpen,
    auditLogs,
    notifications,
    dismissNotification,
    focusMode
  } = useStore();
  
  useEffect(() => {
    fetchArticles();
    startAutoIngest();
  }, []);

  return (
    <div className='flex h-screen bg-stw-charcoal overflow-hidden font-tech selection:bg-stw-amber/30'>
        {/* Navigation Latérale */}
        <NavSidebar 
          activeView={activeView} 
          onViewChange={setActiveView}
          isOpen={isSidebarOpen}
        />
        
        <div className='flex-1 flex flex-col min-w-0 overflow-hidden relative'>
          {/* Header de Commandement */}
          <OfficialHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          
          {/* Zone de Rendu Dynamique */}
          <main className='flex-1 overflow-y-auto situation-grid custom-scrollbar p-6'>
            <ViewOrchestrator activeView={activeView} />
          </main>

          {/* Overlays de Sécurité et Intelligence */}
          <div className='absolute bottom-6 right-6 z-50'>
             <AIAssistantCommand />
          </div>
          
          <AlertToastContainer notifications={notifications} onDismiss={dismissNotification} />
          {focusMode && <FocusOverlay />}
        </div>
    </div>
  );
}
