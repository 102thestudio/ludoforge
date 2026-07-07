'use client';

import { useEffect, useState, useRef } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { useThemeStore } from '@/store/useThemeStore';

export function useDebounceSave(projectId: string) {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const unsubscribe = useGameStore.subscribe(
      () => {
        if (isInitialLoad.current) {
          isInitialLoad.current = false;
          return;
        }

        setSaveStatus('saving');

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
          try {
            const gameState = useGameStore.getState();
            const themeState = useThemeStore.getState();

            const res = await fetch(`/api/projects/${projectId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                gameState: {
                  ...gameState,
                  themeState: {
                    themeId: themeState.themeId,
                    themeOverrides: themeState.themeOverrides,
                    backStyle: themeState.backStyle,
                    backColor: themeState.backColor,
                    backDesign: themeState.backDesign,
                    showCropMarks: themeState.showCropMarks,
                    showBleed: themeState.showBleed,
                  }
                },
                name: gameState.cover?.title || 'Nuevo Juego',
              }),
            });

            if (!res.ok) throw new Error('Failed to save');
            
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 3000);
          } catch (err) {
            console.error('Auto-save error:', err);
            setSaveStatus('error');
          }
        }, 2000);
      }
    );

    return () => {
      unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [projectId]);

  return { saveStatus };
}
