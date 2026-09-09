import { createTheme } from '@shopify/restyle';
import { borderRadii, palette, spacing } from './tokens';

const textVariants = {
  defaults: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: 'textPrimary' as const,
  },
  header: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 28,
    lineHeight: 34,
    color: 'textPrimary' as const,
  },
  title: {
    fontFamily: 'SpaceGrotesk-SemiBold',
    fontSize: 20,
    lineHeight: 26,
    color: 'textPrimary' as const,
  },
  body: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: 'textPrimary' as const,
  },
  bodyMuted: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: 'textSecondary' as const,
  },
  caption: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 13,
    lineHeight: 18,
    color: 'textSecondary' as const,
  },
  label: {
    fontFamily: 'SpaceGrotesk-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: 'textPrimary' as const,
  },
  points: {
    fontFamily: 'IBMPlexMono-SemiBold',
    fontSize: 18,
    lineHeight: 24,
    color: 'accent' as const,
  },
  pointsLarge: {
    fontFamily: 'IBMPlexMono-Bold',
    fontSize: 32,
    lineHeight: 38,
    color: 'accent' as const,
  },
  button: {
    fontFamily: 'SpaceGrotesk-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: 'textOnAccent' as const,
  },
};

const base = {
  spacing,
  borderRadii,
  textVariants,
  breakpoints: {
    phone: 0,
    phoneLarge: 390,
    tablet: 768,
  },
};

export const darkTheme = createTheme({
  ...base,
  colors: {
    background: palette.charcoal,
    surface: palette.charcoalElevated,
    border: palette.charcoalBorder,
    textPrimary: palette.offWhite,
    textSecondary: palette.mutedGray,
    accent: palette.lime,
    accentMuted: palette.limeMuted,
    textOnAccent: palette.black,
    danger: palette.danger,
    overlay: 'rgba(0,0,0,0.55)',
    inputBackground: palette.charcoal,
    transparent: 'transparent',
  },
});

export const lightTheme = createTheme({
  ...base,
  colors: {
    background: palette.lightBg,
    surface: palette.lightElevated,
    border: palette.lightBorder,
    textPrimary: palette.lightText,
    textSecondary: palette.lightMuted,
    accent: palette.limeMuted,
    accentMuted: palette.lime,
    textOnAccent: palette.black,
    danger: palette.danger,
    overlay: 'rgba(18,21,26,0.45)',
    inputBackground: palette.white,
    transparent: 'transparent',
  },
});

export type Theme = typeof darkTheme;
export type ThemeMode = 'dark' | 'light';

export const themes: Record<ThemeMode, Theme> = {
  dark: darkTheme,
  light: lightTheme as unknown as Theme,
};
