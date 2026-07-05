'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
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

  useEffect(() => {
    setUserPlan(userPlan as any);
  }, [userPlan, setUserPlan]);

  useEffect(() => {
    if (initialState && Object.keys(initialState).length > 0) {
      useGameStore.setState(initialState);
    }
  }, [initialState]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black app-layout font-sans relative">
      
      {/* Auto-Save Indicator */}
      <div className="absolute top-4 right-4 z-50 bg-[#111115]/80 backdrop-blur border border-[#222228] px-3 py-1.5 rounded-full text-xs text-zinc-400 flex items-center gap-2">
        {saveStatus === 'saving' && (
          <><div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> Guardando...</>
        )}
        {saveStatus === 'saved' && (
          <><div className="w-2 h-2 rounded-full bg-emerald-500" /> Guardado en la nube</>
        )}
        {saveStatus === 'error' && (
          <><div className="w-2 h-2 rounded-full bg-red-500" /> Error al guardar</>
        )}
        {saveStatus === 'idle' && (
          <><div className="w-2 h-2 rounded-full bg-zinc-500" /> Sincronizado</>
        )}
      </div>

      <SidebarLeft />
      <CanvasCenter />
      <SidebarRight />
    </div>
  );
}
