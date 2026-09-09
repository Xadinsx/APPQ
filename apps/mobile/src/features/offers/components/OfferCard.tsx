import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { AppText, Button, Card } from '../../../components';
import { Box } from '../../../theme';
import type { Offer } from '../types';
import { OfferBadge } from './OfferBadge';
import { RewardAmount } from './RewardAmount';

export type OfferCardProps = {
  offer: Offer;
  onPress?: (offer: Offer) => void;
  compact?: boolean;
};

export function OfferCard({
  offer,
  onPress,
  compact = false,
}: OfferCardProps): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View offer ${offer.title}`}
      onPress={() => onPress?.(offer)}
    >
      <Card>
        <Box style={styles.stack}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            style={styles.row}
          >
            <AppText variant="caption">{offer.category}</AppText>
            {offer.badge ? <OfferBadge label={offer.badge} /> : null}
          </Box>
          <AppText variant="title">{offer.title}</AppText>
          {!compact ? (
            <AppText variant="bodyMuted">{offer.subtitle}</AppText>
          ) : null}
          <RewardAmount points={offer.maxPoints} />
          <Button
            label="View offer"
            onPress={() => onPress?.(offer)}
            fullWidth
          />
        </Box>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 12,
  },
  row: {
    gap: 8,
  },
});
