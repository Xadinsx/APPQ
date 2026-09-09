import React from 'react';
import { StyleSheet } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import { Box } from '../../theme';
import { AppText } from '../Text/AppText';
import { Button } from '../Button/Button';

export type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps): React.JSX.Element {
  const theme = useTheme<Theme>();

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      padding="xl"
      style={styles.stack}
    >
      <Inbox color={theme.colors.textSecondary} size={40} />
      <AppText variant="title" textAlign="center">
        {title}
      </AppText>
      {description ? (
        <AppText variant="bodyMuted" textAlign="center">
          {description}
        </AppText>
      ) : null}
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} />
      ) : null}
    </Box>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 16,
  },
});
