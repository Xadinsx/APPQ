import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
};

export type DiscoverStackParamList = {
  DiscoverList: undefined;
  OfferDetail: { id: string };
};

export type MainTabParamList = {
  Home: undefined;
  Discover: NavigatorScreenParams<DiscoverStackParamList>;
  Activity: undefined;
  Profile: undefined;
  Gallery: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
