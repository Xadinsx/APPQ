import { createContext, useContext } from 'react';
import type { ThemeMode } from './theme';
import { themes } from './theme';

export type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

export const ThemeModeContext = createContext<ThemeContextValue | null>(null);

export function useThemeMode(): ThemeContextValue {
  const value = useContext(ThemeModeContext);
  if (!value) {
    throw new Error('useThemeMode must be used within AppThemeProvider');
  }
  return value;
}

export function resolveTheme(mode: ThemeMode) {
  return themes[mode];
}
