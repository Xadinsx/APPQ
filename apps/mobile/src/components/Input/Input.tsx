import React from 'react';
import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import { Box } from '../../theme';
import { AppText } from '../Text/AppText';

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({
  label,
  error,
  style,
  ...textInputProps
}: InputProps): React.JSX.Element {
  const theme = useTheme<Theme>();

  return (
    <Box alignSelf="stretch" style={styles.stack}>
      {label ? <AppText variant="label">{label}</AppText> : null}
      <Box
        backgroundColor="inputBackground"
        borderColor={error ? 'danger' : 'border'}
        borderWidth={1}
        borderRadius="m"
        paddingHorizontal="m"
        paddingVertical="s"
      >
        <TextInput
          placeholderTextColor={theme.colors.textSecondary}
          style={[
            styles.input,
            {
              color: theme.colors.textPrimary,
              fontFamily: 'SpaceGrotesk_400Regular',
            },
            style,
          ]}
          {...textInputProps}
        />
      </Box>
      {error ? (
        <AppText variant="caption" color="danger">
          {error}
        </AppText>
      ) : null}
    </Box>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 4,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
  },
});
