import React, { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AppText } from '../../../components';
import { Box } from '../../../theme';
import { OfferCard, getFeaturedOffer } from '../../offers';
import type { MainTabParamList } from '../../../navigation/types';

export function HomeScreen(): React.JSX.Element {
  const featured = useMemo(() => getFeaturedOffer(), []);
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Box backgroundColor="background" padding="l" style={styles.stack}>
        <AppText variant="header">Good morning</AppText>
        <AppText variant="pointsLarge">12,450 pts</AppText>
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
