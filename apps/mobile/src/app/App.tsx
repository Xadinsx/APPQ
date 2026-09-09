import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { useFonts } from 'expo-font';
import {
  IBMPlexMono_600SemiBold,
  IBMPlexMono_700Bold,
} from '@expo-google-fonts/ibm-plex-mono';
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import { RootNavigator } from '../navigation/RootNavigator';
import { AppThemeProvider, palette, useThemeMode } from '../theme';
import { StatusBar } from 'react-native';

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
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    IBMPlexMono_600SemiBold,
    IBMPlexMono_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <View style={styles.boot}>
          <ActivityIndicator color={palette.lime} size="large" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <AppShell />
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    backgroundColor: palette.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
