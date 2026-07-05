import { create } from 'zustand';

interface UIState {
  currentStep: number;
  selectedItemId: string | null;
  editorView: 'global' | 'items';
  userPlan: 'FREE' | 'PRO';

  setCurrentStep: (step: number) => void;
  setSelectedItemId: (id: string | null) => void;
  setEditorView: (view: 'global' | 'items') => void;
  setUserPlan: (plan: 'FREE' | 'PRO') => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentStep: 0,
  selectedItemId: null,
  editorView: 'items',
  userPlan: 'FREE',

  setCurrentStep: (step) => set({ currentStep: step }),
  setSelectedItemId: (id) => set({ selectedItemId: id }),
  setEditorView: (view) => set({ editorView: view }),
  setUserPlan: (plan) => set({ userPlan: plan }),
}));
