import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AppText, ErrorState, Loading } from '../../../components';
import { Box } from '../../../theme';
import { OfferCard } from '../../offers';
import type { Offer } from '../../offers';
import {
  fetchFeaturedOffer,
  fetchProfile,
  getErrorMessage,
} from '../../../services/api';
import type { MainTabParamList } from '../../../navigation/types';

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const [featured, setFeatured] = useState<Offer | undefined>();
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [offer, profile] = await Promise.all([
        fetchFeaturedOffer(),
        fetchProfile(),
      ]);
      setFeatured(offer);
      setPoints(profile.pointsBalance);
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to load home'));
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
        <Loading label="Loading home…" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex={1} backgroundColor="background" justifyContent="center">
        <ErrorState title="Home unavailable" message={error} onRetry={load} />
      </Box>
    );
  }

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Box backgroundColor="background" padding="l" style={styles.stack}>
        <AppText variant="header">Good morning</AppText>
        <AppText variant="pointsLarge">
          {(points ?? 0).toLocaleString('en-US')} pts
        </AppText>
        <AppText variant="title">Featured offer</AppText>
        {featured ? (
          <OfferCard
            offer={featured}
            onPress={offer =>
              navigation.navigate('Discover', {
                screen: 'OfferDetail',
                params: { id: offer.id },
              })
            }
          />
        ) : null}
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
});
