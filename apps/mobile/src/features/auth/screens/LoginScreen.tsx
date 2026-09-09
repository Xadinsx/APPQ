import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppText, Button, Input } from '../../../components';
import { Box } from '../../../theme';
import { useSession } from '../../../store/SessionContext';
import type { AuthStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen(_props: Props): React.JSX.Element {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      padding="l"
      style={styles.stack}
    >
      <AppText variant="header">Log in</AppText>
      <AppText variant="bodyMuted">Mock auth — any credentials work.</AppText>
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
      <Button label="Continue" fullWidth onPress={signIn} />
    </Box>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 16,
  },
});
