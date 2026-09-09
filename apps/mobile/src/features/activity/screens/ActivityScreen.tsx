import React from 'react';
import { StyleSheet } from 'react-native';
import { Box } from '../../../theme';
import { AppText } from '../../../components';

export function ActivityScreen(): React.JSX.Element {
  return (
    <Box
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      padding="l"
      style={styles.stack}
    >
      <AppText variant="header">Activity</AppText>
      <AppText variant="bodyMuted">
        Quest progress and transactions will live here.
      </AppText>
    </Box>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 8,
  },
});
