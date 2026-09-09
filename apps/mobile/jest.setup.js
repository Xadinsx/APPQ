jest.mock('react-native-mmkv', () => {
  const store = new Map();
  return {
    createMMKV: jest.fn().mockImplementation(() => ({
      getString: key => store.get(key),
      set: (key, value) => {
        store.set(key, String(value));
      },
    })),
  };
});

jest.mock('expo-font', () => ({
  useFonts: () => [true],
  loadAsync: jest.fn(),
}));

jest.mock('@expo-google-fonts/space-grotesk', () => ({
  SpaceGrotesk_400Regular: 'SpaceGrotesk_400Regular',
  SpaceGrotesk_500Medium: 'SpaceGrotesk_500Medium',
  SpaceGrotesk_600SemiBold: 'SpaceGrotesk_600SemiBold',
  SpaceGrotesk_700Bold: 'SpaceGrotesk_700Bold',
}));

jest.mock('@expo-google-fonts/ibm-plex-mono', () => ({
  IBMPlexMono_600SemiBold: 'IBMPlexMono_600SemiBold',
  IBMPlexMono_700Bold: 'IBMPlexMono_700Bold',
}));

jest.mock('lucide-react-native', () => {
  const React = require('react');
  const {View} = require('react-native');
  const Icon = () => React.createElement(View, {testID: 'icon'});
  return new Proxy(
    {},
    {
      get: () => Icon,
    },
  );
});

jest.mock('@shopify/flash-list', () => {
  const React = require('react');
  const {FlatList} = require('react-native');
  return {
    FlashList: React.forwardRef((props, ref) =>
      React.createElement(FlatList, {...props, ref}),
    ),
  };
});
