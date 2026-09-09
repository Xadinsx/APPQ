import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AppText, ErrorState, Loading } from '../../../components';
import { Box } from '../../../theme';
import { OfferList } from '../../offers';
import type { Offer } from '../../offers';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import { fetchOffers, getErrorMessage } from '../../../services/api';
import type { DiscoverStackParamList } from '../../../navigation/types';

export function DiscoverScreen(): React.JSX.Element {
  const breakpoint = useBreakpoint();
  const navigation =
    useNavigation<NativeStackNavigationProp<DiscoverStackParamList>>();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setOffers(await fetchOffers());
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to load offers'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load().catch(() => undefined);
  }, [load]);

  if (loading) {
    return (
      <Box flex={1} backgroundColor="background" justifyContent="center">
        <Loading label="Loading offers…" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex={1} backgroundColor="background" justifyContent="center">
        <ErrorState
          title="Discover unavailable"
          message={error}
          onRetry={load}
        />
      </Box>
    );
  }

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
