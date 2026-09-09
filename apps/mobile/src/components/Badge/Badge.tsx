import React from 'react';
import { Box } from '../../theme';
import { AppText } from '../Text/AppText';

export type BadgeTone = 'accent' | 'neutral' | 'danger';

export type BadgeProps = {
  label: string;
  tone?: BadgeTone;
};

export function Badge({
  label,
  tone = 'accent',
}: BadgeProps): React.JSX.Element {
  const backgroundColor = {
    accent: 'accent',
    neutral: 'border',
    danger: 'danger',
  }[tone] as 'accent' | 'border' | 'danger';

  const color = tone === 'neutral' ? 'textPrimary' : 'textOnAccent';

  return (
    <Box
      backgroundColor={backgroundColor}
      borderRadius="pill"
      paddingHorizontal="s"
      paddingVertical="xxs"
      alignSelf="flex-start"
    >
      <AppText variant="caption" color={color}>
        {label}
      </AppText>
    </Box>
  );
}
