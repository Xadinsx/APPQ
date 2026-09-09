import React, { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { AppText } from '../../../components';
import { Box } from '../../../theme';
import { OfferCard, getFeaturedOffer } from '../../offers';

export function HomeScreen(): React.JSX.Element {
  const featured = useMemo(() => getFeaturedOffer(), []);

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Box backgroundColor="background" padding="l" style={styles.stack}>
        <AppText variant="header">Good morning</AppText>
        <AppText variant="pointsLarge">12,450 pts</AppText>
        <AppText variant="title">Featured offer</AppText>
        {featured ? <OfferCard offer={featured} /> : null}
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
