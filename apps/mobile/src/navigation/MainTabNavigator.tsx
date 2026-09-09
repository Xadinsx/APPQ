import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home as HomeIcon,
  Compass,
  Activity,
  User,
  FlaskConical,
} from 'lucide-react-native';
import { useTheme } from '@shopify/restyle';
import { HomeScreen } from '../features/home/screens/HomeScreen';
import { ActivityScreen } from '../features/activity/screens/ActivityScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { GalleryScreen } from '../features/gallery/screens/GalleryScreen';
import type { Theme } from '../theme';
import { DiscoverStack } from './DiscoverStack';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

function tabIcon(
  routeName: keyof MainTabParamList,
  color: string,
  size: number,
) {
  if (routeName === 'Home') {
    return <HomeIcon color={color} size={size} />;
  }
  if (routeName === 'Discover') {
    return <Compass color={color} size={size} />;
  }
  if (routeName === 'Activity') {
    return <Activity color={color} size={size} />;
  }
  if (routeName === 'Profile') {
    return <User color={color} size={size} />;
  }
  return <FlaskConical color={color} size={size} />;
}

export function MainTabNavigator(): React.JSX.Element {
  const theme = useTheme<Theme>();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.textPrimary,
        tabBarIcon: ({ color, size }) => tabIcon(route.name, color, size),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Discover"
        component={DiscoverStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {__DEV__ ? <Tab.Screen name="Gallery" component={GalleryScreen} /> : null}
    </Tab.Navigator>
  );
}
