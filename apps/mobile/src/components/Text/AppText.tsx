import React from 'react';
import {
  createRestyleComponent,
  createVariant,
  type VariantProps,
} from '@shopify/restyle';
import type { Theme } from '../../theme';
import { Text } from '../../theme';

const textVariant = createVariant<Theme, 'textVariants'>({
  themeKey: 'textVariants',
});

const RestyleText = createRestyleComponent<
  VariantProps<Theme, 'textVariants'> & React.ComponentProps<typeof Text>,
  Theme
>([textVariant], Text);

export type AppTextProps = React.ComponentProps<typeof RestyleText>;

export function AppText(props: AppTextProps): React.JSX.Element {
  return <RestyleText variant="body" {...props} />;
}
