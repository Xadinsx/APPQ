import React, { useCallback } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { EmptyState } from '../../../components';
import { useResponsiveColumns } from '../../../hooks/useBreakpoint';
import type { Offer } from '../types';
import { OfferCard } from './OfferCard';

export type OfferListProps = {
  offers: Offer[];
  onOfferPress?: (offer: Offer) => void;
  ListHeaderComponent?: React.ReactElement | null;
};

export function OfferList({
  offers,
  onOfferPress,
  ListHeaderComponent,
}: OfferListProps): React.JSX.Element {
  const columns = useResponsiveColumns();
  const { width } = useWindowDimensions();
  const horizontalPadding = 24;
  const gap = 12;
  const itemWidth =
    columns === 1
      ? width - horizontalPadding * 2
      : (width - horizontalPadding * 2 - gap) / 2;

  const renderItem = useCallback(
    ({ item }: { item: Offer }) => (
      <View style={[styles.item, { width: itemWidth, marginBottom: gap }]}>
        <OfferCard offer={item} onPress={onOfferPress} compact={columns > 1} />
      </View>
    ),
    [columns, itemWidth, onOfferPress],
  );

  if (offers.length === 0) {
    return (
      <EmptyState
        title="No offers"
        description="There are no offers to show right now."
      />
    );
  }

  return (
    <FlashList
      data={offers}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      numColumns={columns}
      contentContainerStyle={styles.content}
      ListHeaderComponent={ListHeaderComponent}
      key={columns}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  item: {},
});
