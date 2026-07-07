import { create } from 'zustand';

interface UIState {
  currentStep: number;
  selectedItemId: string | null;
  editorView: 'global' | 'items';
  userPlan: 'FREE' | 'PRO';
  settingsTab: 'global' | 'cover' | 'print';
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;

  setCurrentStep: (step: number) => void;
  setSelectedItemId: (id: string | null) => void;
  setEditorView: (view: 'global' | 'items') => void;
  setUserPlan: (plan: 'FREE' | 'PRO') => void;
  setSettingsTab: (tab: 'global' | 'cover' | 'print') => void;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  closeSidebars: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentStep: 0,
  selectedItemId: null,
  editorView: 'items',
  userPlan: 'FREE',
  settingsTab: 'global',
  leftSidebarOpen: false,
  rightSidebarOpen: false,

  setCurrentStep: (step) => set({ currentStep: step }),
  setSelectedItemId: (id) => set({ selectedItemId: id }),
  setEditorView: (view) => set({ editorView: view }),
  setUserPlan: (plan) => set({ userPlan: plan }),
  setSettingsTab: (tab) => set({ settingsTab: tab, rightSidebarOpen: true }),
  toggleLeftSidebar: () => set((s) => ({ leftSidebarOpen: !s.leftSidebarOpen, rightSidebarOpen: false })),
  toggleRightSidebar: () => set((s) => ({ rightSidebarOpen: !s.rightSidebarOpen, leftSidebarOpen: false })),
  closeSidebars: () => set({ leftSidebarOpen: false, rightSidebarOpen: false }),
}));
