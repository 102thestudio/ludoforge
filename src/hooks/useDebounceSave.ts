'use client';

import { useEffect, useState, useRef } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { useUIStore } from '@/store/useUIStore';

export function useDebounceSave(projectId: string) {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // We only want to track changes after initial load
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Subscribe to changes in the game store
    const unsubscribe = useGameStore.subscribe(
      (state) => {
        if (isInitialLoad.current) {
          isInitialLoad.current = false;
          return; // Skip first save
        }

        setSaveStatus('saving');

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
          try {
            // We get the latest state directly
            const currentState = useGameStore.getState();
            
            const res = await fetch(`/api/projects/${projectId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                gameState: currentState,
                name: currentState.cover?.title || 'Nuevo Juego',
              }),
            });

            if (!res.ok) throw new Error('Failed to save');
            
            setSaveStatus('saved');
            
            // Return to idle after a few seconds of showing "Saved"
            setTimeout(() => setSaveStatus('idle'), 3000);
          } catch (err) {
            console.error('Auto-save error:', err);
            setSaveStatus('error');
          }
        }, 2000); // 2 seconds debounce
      }
    );

    return () => {
      unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [projectId]);

  return { saveStatus };
}
