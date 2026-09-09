import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { AppText } from '../../../components';
import { Box } from '../../../theme';
import { OfferList, getOffers } from '../../offers';
import { useBreakpoint } from '../../../hooks/useBreakpoint';

export function DiscoverScreen(): React.JSX.Element {
  const offers = useMemo(() => getOffers(), []);
  const breakpoint = useBreakpoint();

  return (
    <Box flex={1} backgroundColor="background">
      <OfferList
        offers={offers}
        ListHeaderComponent={
          <Box style={styles.header}>
            <AppText variant="header">Discover</AppText>
            <AppText variant="bodyMuted">
              Recommended for you · {breakpoint}
            </AppText>
          </Box>
        }
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    marginBottom: 16,
  },
});
