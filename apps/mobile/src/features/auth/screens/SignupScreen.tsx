import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppText, Button, Input } from '../../../components';
import { Box } from '../../../theme';
import { useSession } from '../../../store/SessionContext';
import { getErrorMessage, registerRequest } from '../../../services/api';
import type { AuthStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export function SignupScreen(_props: Props): React.JSX.Element {
  const { signIn } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      await registerRequest({
        email: email.trim(),
        password,
        name: name.trim() || undefined,
      });
      signIn();
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to create account'));
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
      <AppText variant="header">Sign up</AppText>
      <AppText variant="bodyMuted">
        Creates a real account on the AppQuest API.
      </AppText>
      <Input
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Your name"
      />
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
        label="Create account"
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
