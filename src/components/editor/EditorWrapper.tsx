'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { useThemeStore } from '@/store/useThemeStore';
import { useDebounceSave } from '@/hooks/useDebounceSave';
import { CanvasCenter } from '@/components/editor/CanvasCenter/CanvasCenter';
import { SidebarLeft } from '@/components/editor/SidebarLeft/SidebarLeft';
import { SidebarRight } from '@/components/editor/SidebarRight/SidebarRight';
import { useUIStore } from '@/store/useUIStore';

export function EditorWrapper({ 
  projectId, 
  initialState,
  userPlan = 'FREE'
}: { 
  projectId: string, 
  initialState: any,
  userPlan?: 'FREE' | 'PRO'
}) {
  const { saveStatus } = useDebounceSave(projectId);
  const { setUserPlan } = useUIStore();
  const { leftSidebarOpen, rightSidebarOpen, toggleLeftSidebar, toggleRightSidebar, closeSidebars } = useUIStore();

  useEffect(() => { setUserPlan(userPlan as any); }, [userPlan, setUserPlan]);

  useEffect(() => {
    if (initialState && Object.keys(initialState).length > 0) {
      // Theme store
      const ts = (initialState as any).themeState as Partial<ThemeState> | undefined;
      if (ts) {
        const { themeId, themeOverrides } = ts;
        const updates: Partial<ThemeState> = {};
        if (themeId !== undefined) updates.themeId = themeId;
        if (themeOverrides !== undefined) updates.themeOverrides = themeOverrides as any;
        useThemeStore.setState(updates);
      }
      // Game store - clear items if not present in initialState (new project)
      const stateToApply: Record<string, any> = { ...initialState };
      delete stateToApply.themeState;
      if (!stateToApply.items) {
        stateToApply.items = [];
      }
      useGameStore.setState(stateToApply);
      // If template set but items empty, initialize defaults
      const state = useGameStore.getState();
      if (state.templateId && (!state.items || state.items.length === 0)) {
        useGameStore.getState().setTemplate(state.templateId);
      }
    }
  }, [initialState]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-black app-layout font-sans relative">
      {/* Auto-Save Indicator */}
      {saveStatus !== 'idle' && (
        <div className="absolute top-4 right-4 z-[60] bg-[#111115]/80 backdrop-blur border border-[#222228] px-3 py-1.5 rounded-full text-xs text-zinc-400 flex items-center gap-2 no-print">
          {saveStatus === 'saving' && <><div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> Guardando...</>}
          {saveStatus === 'saved' && <><div className="w-2 h-2 rounded-full bg-emerald-500" /> Guardado</>}
          {saveStatus === 'error' && <><div className="w-2 h-2 rounded-full bg-red-500" /> Error</>}
        </div>
      )}

      {/* Desktop layout */}
      <div className="hidden md:flex h-full">
        <SidebarLeft />
        <CanvasCenter />
        <SidebarRight />
      </div>

      {/* Back to dashboard button (desktop) */}
      <a href="/dashboard" className="hidden md:flex fixed top-4 left-4 z-[60] bg-[#111115]/80 backdrop-blur border border-[#222228] px-3 py-1.5 rounded-full text-xs text-zinc-400 hover:text-white hover:border-[#333] transition-colors items-center gap-2 no-print cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Dashboard
      </a>

      {/* Mobile layout */}
      <div className="md:hidden h-full relative">
        <CanvasCenter />

        {/* Overlay backdrop */}
        {(leftSidebarOpen || rightSidebarOpen) && (
          <div className="fixed inset-0 bg-black/50 z-30" onClick={closeSidebars} />
        )}

        {/* Left sidebar (mobile) */}
        <div className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300 ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarLeft />
        </div>

        {/* Right sidebar (mobile) */}
        <div className={`fixed top-0 right-0 h-full z-40 transition-transform duration-300 ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <SidebarRight />
        </div>

        {/* Mobile bottom nav */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#111115]/95 backdrop-blur border-t border-[#222228] flex items-center justify-around py-2 px-4 safe-area-bottom">
          <a href="/dashboard" className="flex flex-col items-center gap-0.5 py-1 px-3 text-zinc-400 hover:text-white transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span className="text-[10px] font-semibold">Volver</span>
          </a>
          <button onClick={toggleLeftSidebar} className="flex flex-col items-center gap-0.5 py-1 px-3 text-zinc-400 hover:text-white transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span className="text-[10px] font-semibold">Cartas</span>
          </button>
          <button onClick={() => { useUIStore.getState().setSelectedItemId(null); toggleRightSidebar(); useUIStore.getState().setSettingsTab('global'); }} className="flex flex-col items-center gap-0.5 py-1 px-3 text-zinc-400 hover:text-white transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span className="text-[10px] font-semibold">Ajustes</span>
          </button>
          <button onClick={() => { useUIStore.getState().setSelectedItemId(null); toggleRightSidebar(); useUIStore.getState().setSettingsTab('cover'); }} className="flex flex-col items-center gap-0.5 py-1 px-3 text-zinc-400 hover:text-white transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <span className="text-[10px] font-semibold">Portada</span>
          </button>
          <button onClick={() => { useUIStore.getState().setSelectedItemId(null); toggleRightSidebar(); useUIStore.getState().setSettingsTab('print'); }} className="flex flex-col items-center gap-0.5 py-1 px-3 text-zinc-400 hover:text-white transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/><rect x="6" y="2" width="12" height="6"/></svg>
            <span className="text-[10px] font-semibold">Imprimir</span>
          </button>
        </div>
      </div>
    </div>
  );
}
