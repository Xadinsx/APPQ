import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { RootNavigator } from '../navigation/RootNavigator';
import { SessionProvider } from '../store/SessionContext';
import { AppThemeProvider, useThemeMode } from '../theme';

enableScreens();

function AppStatusBar(): React.JSX.Element {
  const { mode } = useThemeMode();
  return (
    <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} />
  );
}

function AppShell(): React.JSX.Element {
  return (
    <>
      <AppStatusBar />
      <RootNavigator />
    </>
  );
}

export function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <AppThemeProvider>
          <SessionProvider>
            <AppShell />
          </SessionProvider>
        </AppThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
