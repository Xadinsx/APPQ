import React from 'react';
import { StyleSheet } from 'react-native';
import { AppText, Button } from '../../../components';
import { Box, useThemeMode } from '../../../theme';
import { useSession } from '../../../store/SessionContext';

export function ProfileScreen(): React.JSX.Element {
  const { signOut } = useSession();
  const { mode, toggleMode } = useThemeMode();

  return (
    <Box flex={1} backgroundColor="background" padding="l" style={styles.stack}>
      <AppText variant="header">Profile</AppText>
      <AppText variant="bodyMuted">
        Theme is {mode}. Session is mock-persisted in MMKV.
      </AppText>
      <Button
        label={mode === 'dark' ? 'Switch to light' : 'Switch to dark'}
        variant="secondary"
        fullWidth
        onPress={toggleMode}
      />
      <Button label="Sign out" variant="danger" fullWidth onPress={signOut} />
    </Box>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 16,
  },
});
