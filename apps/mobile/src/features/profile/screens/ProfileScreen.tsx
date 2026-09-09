import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppText, Button, ErrorState, Loading } from '../../../components';
import { Box, useThemeMode } from '../../../theme';
import { useSession } from '../../../store/SessionContext';
import {
  fetchProfile,
  getErrorMessage,
  type AuthUser,
} from '../../../services/api';

export function ProfileScreen(): React.JSX.Element {
  const { signOut } = useSession();
  const { mode, toggleMode } = useThemeMode();
  const [profile, setProfile] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProfile(await fetchProfile());
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to load profile'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load().catch(() => undefined);
  }, [load]);

  if (loading) {
    return (
      <Box flex={1} backgroundColor="background" justifyContent="center">
        <Loading label="Loading profile…" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex={1} backgroundColor="background" justifyContent="center">
        <ErrorState
          title="Profile unavailable"
          message={error}
          onRetry={load}
        />
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor="background" padding="l" style={styles.stack}>
      <AppText variant="header">Profile</AppText>
      <AppText variant="bodyMuted">
        {profile?.name ?? profile?.email} ·{' '}
        {(profile?.pointsBalance ?? 0).toLocaleString('en-US')} pts
      </AppText>
      <AppText variant="caption">
        Theme is {mode}. Session uses API JWTs.
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
