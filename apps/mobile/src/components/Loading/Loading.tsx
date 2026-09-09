import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import { Box } from '../../theme';
import { AppText } from '../Text/AppText';

export type LoadingProps = {
  label?: string;
};

export function Loading({
  label = 'Loading…',
}: LoadingProps): React.JSX.Element {
  const theme = useTheme<Theme>();

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      padding="l"
      style={styles.stack}
    >
      <ActivityIndicator color={theme.colors.accent} size="large" />
      <AppText variant="bodyMuted">{label}</AppText>
    </Box>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 16,
  },
});
