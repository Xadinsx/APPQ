import React from 'react';
import {
  Modal as RNModal,
  Pressable,
  StyleSheet,
  type ModalProps as RNModalProps,
} from 'react-native';
import { Box } from '../../theme';
import { AppText } from '../Text/AppText';
import { Button } from '../Button/Button';

export type AppModalProps = RNModalProps & {
  title: string;
  message?: string;
  onClose: () => void;
  confirmLabel?: string;
  onConfirm?: () => void;
};

export function AppModal({
  title,
  message,
  onClose,
  confirmLabel = 'OK',
  onConfirm,
  ...modalProps
}: AppModalProps): React.JSX.Element {
  return (
    <RNModal
      transparent
      animationType="fade"
      onRequestClose={onClose}
      {...modalProps}
    >
      <Pressable
        style={styles.backdrop}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Dismiss modal"
      >
        <Box
          flex={1}
          backgroundColor="overlay"
          alignItems="center"
          justifyContent="center"
          padding="l"
        >
          <Pressable onPress={event => event.stopPropagation()}>
            <Box
              backgroundColor="surface"
              borderRadius="l"
              borderColor="border"
              borderWidth={1}
              padding="l"
              minWidth={280}
              maxWidth={420}
              style={styles.stack}
            >
              <AppText variant="title">{title}</AppText>
              {message ? (
                <AppText variant="bodyMuted">{message}</AppText>
              ) : null}
              <Box
                flexDirection="row"
                justifyContent="flex-end"
                style={styles.row}
              >
                <Button label="Close" variant="ghost" onPress={onClose} />
                {onConfirm ? (
                  <Button label={confirmLabel} onPress={onConfirm} />
                ) : null}
              </Box>
            </Box>
          </Pressable>
        </Box>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  stack: {
    gap: 16,
  },
  row: {
    gap: 8,
  },
});
