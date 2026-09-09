import { createMMKV } from 'react-native-mmkv';
import type { ThemeMode } from '../theme/theme';

const storage = createMMKV({ id: 'appq-theme' });
const THEME_KEY = 'theme-mode';

export function getStoredThemeMode(): ThemeMode {
  const value = storage.getString(THEME_KEY);
  if (value === 'light' || value === 'dark') {
    return value;
  }
  return 'dark';
}

export function setStoredThemeMode(mode: ThemeMode): void {
  storage.set(THEME_KEY, mode);
}
