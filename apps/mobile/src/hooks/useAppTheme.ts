import { useTheme } from '@shopify/restyle';
import type { Theme } from '../theme';
import { useThemeMode } from '../theme';

export function useAppTheme() {
  const theme = useTheme<Theme>();
  const mode = useThemeMode();
  return { ...mode, theme };
}
