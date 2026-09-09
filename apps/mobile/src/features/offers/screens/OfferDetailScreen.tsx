import React, { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppText, EmptyState, ErrorState } from '../../../components';
import { Box } from '../../../theme';
import { getOfferById } from '../offersData';
import { OfferBadge } from '../components/OfferBadge';
import { RewardAmount } from '../components/RewardAmount';
import type { DiscoverStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<DiscoverStackParamList, 'OfferDetail'>;

export function OfferDetailScreen({ route }: Props): React.JSX.Element {
  const offer = useMemo(() => getOfferById(route.params.id), [route.params.id]);

  if (!route.params.id) {
    return (
      <Box flex={1} backgroundColor="background" justifyContent="center">
        <ErrorState title="Missing offer" message="No offer id was provided." />
      </Box>
    );
  }

  if (!offer) {
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
