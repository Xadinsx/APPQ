import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppText, EmptyState, ErrorState, Loading } from '../../../components';
import { Box } from '../../../theme';
import { OfferBadge } from '../components/OfferBadge';
import { RewardAmount } from '../components/RewardAmount';
import type { Offer } from '../types';
import { fetchOfferById, getErrorMessage } from '../../../services/api';
import type { DiscoverStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<DiscoverStackParamList, 'OfferDetail'>;

export function OfferDetailScreen({ route }: Props): React.JSX.Element {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const load = useCallback(async () => {
    if (!route.params.id) {
      setError('No offer id was provided.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setNotFound(false);
    try {
      setOffer(await fetchOfferById(route.params.id));
    } catch (err) {
      const message = getErrorMessage(err, 'Unable to load offer');
      if (message.toLowerCase().includes('not found')) {
        setNotFound(true);
      } else {
        setError(message);
      }
      setOffer(null);
    } finally {
      setLoading(false);
    }
  }, [route.params.id]);

  useEffect(() => {
    load().catch(() => undefined);
  }, [load]);

  if (loading) {
    return (
      <Box flex={1} backgroundColor="background" justifyContent="center">
        <Loading label="Loading offer…" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex={1} backgroundColor="background" justifyContent="center">
        <ErrorState
          title={route.params.id ? 'Offer unavailable' : 'Missing offer'}
          message={error}
          onRetry={route.params.id ? load : undefined}
        />
      </Box>
    );
  }

  if (notFound || !offer) {
    return (
      <Box flex={1} backgroundColor="background" justifyContent="center">
        <EmptyState
          title="Offer not found"
          description={`No offer matches “${route.params.id}”.`}
        />
      </Box>
    );
  }

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Box backgroundColor="background" padding="l" style={styles.stack}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          style={styles.row}
        >
          <AppText variant="caption">{offer.category}</AppText>
          {offer.badge ? <OfferBadge label={offer.badge} /> : null}
        </Box>
        <AppText variant="header">{offer.title}</AppText>
        <AppText variant="bodyMuted">{offer.subtitle}</AppText>
        <RewardAmount points={offer.maxPoints} />
        <AppText variant="body">
          Complete the quest steps for this offer to earn points. Deep links
          open this screen via appquest://offer/{offer.id}.
        </AppText>
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  stack: {
    gap: 16,
  },
  row: {
    gap: 8,
  },
});
