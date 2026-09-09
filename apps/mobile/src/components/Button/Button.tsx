import React from 'react';
import {
  Pressable,
  type PressableProps,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import { Box } from '../../theme';
import { AppText } from '../Text/AppText';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type ButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
};

export function Button({
  label,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  ...pressableProps
}: ButtonProps): React.JSX.Element {
  const theme = useTheme<Theme>();
  const isDisabled = Boolean(disabled || loading);

  const backgroundColor = {
    primary: 'accent',
    secondary: 'surface',
    ghost: 'transparent',
    danger: 'danger',
  }[variant] as keyof Theme['colors'];

  const borderColor = {
    primary: 'accent',
    secondary: 'border',
    ghost: 'border',
    danger: 'danger',
  }[variant] as keyof Theme['colors'];

  const textColor = {
    primary: 'textOnAccent',
    secondary: 'textPrimary',
    ghost: 'textPrimary',
    danger: 'textOnAccent',
  }[variant] as keyof Theme['colors'];

  return (
    <Pressable
      testID="app-button"
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => ({ opacity: pressed || isDisabled ? 0.7 : 1 })}
      {...pressableProps}
    >
      <Box
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderWidth={variant === 'ghost' || variant === 'secondary' ? 1 : 0}
        borderRadius="m"
        paddingHorizontal="l"
        paddingVertical="m"
        alignItems="center"
        justifyContent="center"
        minWidth={fullWidth ? undefined : 120}
        alignSelf={fullWidth ? 'stretch' : 'flex-start'}
        flexDirection="row"
        style={styles.row}
      >
        {loading ? (
          <ActivityIndicator
            color={
              variant === 'primary' || variant === 'danger'
                ? theme.colors.textOnAccent
                : theme.colors.textPrimary
            }
          />
        ) : (
          <AppText variant="button" color={textColor}>
            {label}
          </AppText>
        )}
      </Box>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 8,
  },
});
