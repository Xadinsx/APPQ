import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppText, Button, Input } from '../../../components';
import { Box } from '../../../theme';
import { useSession } from '../../../store/SessionContext';
import { getErrorMessage, loginRequest } from '../../../services/api';
import type { AuthStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen(_props: Props): React.JSX.Element {
  const { signIn } = useSession();
  const [email, setEmail] = useState('demo@appquest.dev');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      await loginRequest(email.trim(), password);
      signIn();
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to log in'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      padding="l"
      style={styles.stack}
    >
      <AppText variant="header">Log in</AppText>
      <AppText variant="bodyMuted">
        Use demo@appquest.dev / password123 after seeding the API.
      </AppText>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@example.com"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="••••••••"
      />
      {error ? (
        <AppText variant="caption" color="danger">
          {error}
        </AppText>
      ) : null}
      <Button
        label="Continue"
        fullWidth
        loading={loading}
        onPress={() => {
          onSubmit().catch(() => undefined);
        }}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 16,
  },
});
