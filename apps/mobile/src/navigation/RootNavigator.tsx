import React from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home as HomeIcon,
  Compass,
  Activity,
  FlaskConical,
} from 'lucide-react-native';
import { useTheme } from '@shopify/restyle';
import { HomeScreen } from '../features/home/screens/HomeScreen';
import { DiscoverScreen } from '../features/discover/screens/DiscoverScreen';
import { ActivityScreen } from '../features/activity/screens/ActivityScreen';
import { GalleryScreen } from '../features/gallery/screens/GalleryScreen';
import type { Theme } from '../theme';
import { useThemeMode } from '../theme';

export type RootTabParamList = {
  Home: undefined;
  Discover: undefined;
  Activity: undefined;
  Gallery: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function tabIcon(
  routeName: keyof RootTabParamList,
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
  return <FlaskConical color={color} size={size} />;
}

export function RootNavigator(): React.JSX.Element {
  const theme = useTheme<Theme>();
  const { mode } = useThemeMode();

  const navigationTheme = {
    ...(mode === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(mode === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.textPrimary,
      border: theme.colors.border,
      primary: theme.colors.accent,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
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
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Activity" component={ActivityScreen} />
        {__DEV__ ? (
          <Tab.Screen name="Gallery" component={GalleryScreen} />
        ) : null}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
