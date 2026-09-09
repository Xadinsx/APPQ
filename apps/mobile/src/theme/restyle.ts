import { createBox, createText, createTheme } from '@shopify/restyle';
import type { Theme } from './theme';

export { createTheme };
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
