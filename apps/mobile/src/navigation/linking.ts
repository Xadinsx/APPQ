import type { LinkingOptions } from '@react-navigation/native';
import type { MainTabParamList } from './types';

export const linking: LinkingOptions<MainTabParamList> = {
  prefixes: ['appquest://'],
  config: {
    screens: {
      Home: 'home',
      Discover: {
        screens: {
          DiscoverList: 'discover',
          OfferDetail: 'offer/:id',
        },
      },
      Activity: 'activity',
      Profile: 'profile',
      Gallery: 'gallery',
    },
  },
};
