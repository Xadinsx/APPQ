import React from 'react';
import { StyleSheet } from 'react-native';
import { CircleAlert } from 'lucide-react-native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import { Box } from '../../theme';
import { AppText } from '../Text/AppText';
import { Button } from '../Button/Button';

export type ErrorStateProps = {
  title?: string;
  message: string;
  retryLabel?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = 'Something went wrong',
  message,
  retryLabel = 'Try again',
  onRetry,
}: ErrorStateProps): React.JSX.Element {
  const theme = useTheme<Theme>();

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      padding="xl"
      style={styles.stack}
    >
      <CircleAlert color={theme.colors.danger} size={40} />
      <AppText variant="title" textAlign="center">
        {title}
      </AppText>
      <AppText variant="bodyMuted" textAlign="center">
        {message}
      </AppText>
      {onRetry ? <Button label={retryLabel} onPress={onRetry} /> : null}
    </Box>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 16,
  },
});
