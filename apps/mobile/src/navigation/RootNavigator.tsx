import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../features/home/screens/HomeScreen';
import { DiscoverScreen } from '../features/discover/screens/DiscoverScreen';
import { ActivityScreen } from '../features/activity/screens/ActivityScreen';

export type RootTabParamList = {
  Home: undefined;
  Discover: undefined;
  Activity: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Activity" component={ActivityScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
