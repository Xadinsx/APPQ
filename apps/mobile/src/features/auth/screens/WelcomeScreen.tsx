import React from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppText, Button } from '../../../components';
import { Box } from '../../../theme';
import type { AuthStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props): React.JSX.Element {
  return (
    <Box
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      padding="l"
      style={styles.stack}
    >
      <AppText variant="header">AppQuest</AppText>
      <AppText variant="bodyMuted">
        Discover apps, complete quests, earn rewards.
      </AppText>
      <Button
        label="Log in"
        fullWidth
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        label="Sign up"
        variant="secondary"
        fullWidth
        onPress={() => navigation.navigate('Signup')}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 16,
  },
});
