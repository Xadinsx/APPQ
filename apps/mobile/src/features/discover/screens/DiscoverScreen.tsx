import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '../../../components';
import { Box } from '../../../theme';
import { OfferList, getOffers } from '../../offers';
import type { Offer } from '../../offers';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import type { DiscoverStackParamList } from '../../../navigation/types';

export function DiscoverScreen(): React.JSX.Element {
  const offers = useMemo(() => getOffers(), []);
  const breakpoint = useBreakpoint();
  const navigation =
    useNavigation<NativeStackNavigationProp<DiscoverStackParamList>>();

  return (
    <Box flex={1} backgroundColor="background">
      <OfferList
        offers={offers}
        onOfferPress={(offer: Offer) =>
          navigation.navigate('OfferDetail', { id: offer.id })
        }
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
