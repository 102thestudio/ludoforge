import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface ThemeState {
  themeId: string;
  themeOverrides: Record<string, any>;
  
  // Reverso
  backStyle: 'matching' | 'static';
  backColor: string;
  backDesign: 'classic' | 'minimal' | 'empty';
  
  // Opciones de Impresión
  showCropMarks: boolean;
  showBleed: boolean;
  
  setTheme: (id: string) => void;
  updateThemeSetting: (key: keyof Omit<ThemeState, 'setTheme' | 'updateThemeSetting'>, value: any) => void;
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        themeId: "fantasy",
        themeOverrides: {},
        backStyle: "matching",
        backColor: "#212121",
        backDesign: "classic",
        showCropMarks: true,
        showBleed: false,

        setTheme: (id) => set({ themeId: id }),
        
        updateThemeSetting: (key, value) => set({ [key]: value })
      }),
      { name: 'ludoforge-theme-storage' }
    )
  )
);
