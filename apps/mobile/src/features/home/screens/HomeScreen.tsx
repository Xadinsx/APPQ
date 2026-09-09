import React from 'react';
import { StyleSheet } from 'react-native';
import { Box } from '../../../theme';
import { AppText } from '../../../components';

export function HomeScreen(): React.JSX.Element {
  return (
    <Box
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      padding="l"
      style={styles.stack}
    >
      <AppText variant="header">Home</AppText>
      <AppText variant="bodyMuted">
        Featured offer card lands in the offer-components PR.
      </AppText>
      <AppText variant="points">12,450 pts</AppText>
    </Box>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 8,
  },
});
