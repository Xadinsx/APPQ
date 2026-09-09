import React from 'react';
import { Box } from '../../theme';
import { AppText } from '../Text/AppText';

export type AvatarProps = {
  label: string;
  size?: number;
};

export function Avatar({ label, size = 40 }: AvatarProps): React.JSX.Element {
  const initials = label
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <Box
      width={size}
      height={size}
      borderRadius="pill"
      backgroundColor="accent"
      alignItems="center"
      justifyContent="center"
    >
      <AppText variant="label" color="textOnAccent">
        {initials || '?'}
      </AppText>
    </Box>
  );
}
