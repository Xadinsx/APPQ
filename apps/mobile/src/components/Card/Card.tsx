import React from 'react';
import type { BoxProps } from '@shopify/restyle';
import type { Theme } from '../../theme';
import { Box } from '../../theme';

export type CardProps = BoxProps<Theme> & {
  children: React.ReactNode;
};

export function Card({ children, ...boxProps }: CardProps): React.JSX.Element {
  return (
    <Box
      backgroundColor="surface"
      borderColor="border"
      borderWidth={1}
      borderRadius="l"
      padding="m"
      {...boxProps}
    >
      {children}
    </Box>
  );
}
