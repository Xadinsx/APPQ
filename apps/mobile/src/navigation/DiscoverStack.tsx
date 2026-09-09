import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import { DiscoverScreen } from '../features/discover/screens/DiscoverScreen';
import { OfferDetailScreen } from '../features/offers/screens/OfferDetailScreen';
import type { Theme } from '../theme';
import type { DiscoverStackParamList } from './types';

const Stack = createNativeStackNavigator<DiscoverStackParamList>();

export function DiscoverStack(): React.JSX.Element {
  const theme = useTheme<Theme>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.textPrimary,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen
        name="DiscoverList"
        component={DiscoverScreen}
        options={{ title: 'Discover', headerShown: false }}
      />
      <Stack.Screen
        name="OfferDetail"
        component={OfferDetailScreen}
        options={{ title: 'Offer' }}
      />
    </Stack.Navigator>
  );
}
