import React from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../theme';
import { useThemeMode } from '../theme';
import { useSession } from '../store/SessionContext';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { linking } from './linking';

export function RootNavigator(): React.JSX.Element {
  const theme = useTheme<Theme>();
  const { mode } = useThemeMode();
  const { isAuthenticated } = useSession();

  const navigationTheme = {
    ...(mode === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(mode === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.textPrimary,
      border: theme.colors.border,
      primary: theme.colors.accent,
    },
  };

  return (
    <NavigationContainer
      theme={navigationTheme}
      linking={isAuthenticated ? linking : undefined}
    >
      {isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
