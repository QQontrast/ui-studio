// src/store/buttonStore.ts
import { create } from 'zustand';
import { ButtonConfig, defaultButtonConfig } from '@/types/button';

interface ButtonStore {
  config: ButtonConfig;
  previewBg: 'light' | 'dark' | 'checkerboard';
  updateConfig: (updates: Partial<ButtonConfig>) => void;
  setPreviewBg: (bg: 'light' | 'dark' | 'checkerboard') => void;
  applyPreset: (config: ButtonConfig) => void;
  resetConfig: () => void;
}

export const useButtonStore = create<ButtonStore>((set) => ({
  config: defaultButtonConfig,
  previewBg: 'light',
  
  updateConfig: (updates) =>
    set((state) => ({
      config: { ...state.config, ...updates },
    })),

  setPreviewBg: (bg) => set({ previewBg: bg }),

  applyPreset: (config) => set({ config }),
    
  resetConfig: () => set({ config: defaultButtonConfig }),
}));