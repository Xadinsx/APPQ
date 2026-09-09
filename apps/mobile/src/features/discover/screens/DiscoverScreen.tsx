import React from 'react';
import { StyleSheet } from 'react-native';
import { Box } from '../../../theme';
import { AppText } from '../../../components';

export function DiscoverScreen(): React.JSX.Element {
  return (
    <Box
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      padding="l"
      style={styles.stack}
    >
      <AppText variant="header">Discover</AppText>
      <AppText variant="bodyMuted">
        Offer FlashList lands in the offer-components PR.
      </AppText>
    </Box>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 8,
  },
});
