import React, { useCallback, useMemo, useState } from 'react';
import { ThemeProvider } from '@shopify/restyle';
import {
  getStoredThemeMode,
  setStoredThemeMode,
} from '../store/themePreference';
import type { ThemeMode } from './theme';
import { themes } from './theme';
import { ThemeModeContext } from './ThemeModeContext';

type AppThemeProviderProps = {
  children: React.ReactNode;
  initialMode?: ThemeMode;
};

export function AppThemeProvider({
  children,
  initialMode,
}: AppThemeProviderProps): React.JSX.Element {
  const [mode, setModeState] = useState<ThemeMode>(
    () => initialMode ?? getStoredThemeMode(),
  );

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    setStoredThemeMode(next);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode,
    }),
    [mode, setMode, toggleMode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={themes[mode]}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
