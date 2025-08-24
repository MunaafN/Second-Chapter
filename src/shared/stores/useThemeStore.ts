import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme;
};

type ThemeActions = {
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      // State
      theme: 'light',

      // Actions
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-store',
    }
  )
);
