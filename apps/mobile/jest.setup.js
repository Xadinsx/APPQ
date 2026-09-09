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

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    GestureHandlerRootView: ({children}) =>
      React.createElement(View, null, children),
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    PanGestureHandler: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    ScrollView: require('react-native').ScrollView,
    Switch: require('react-native').Switch,
    TextInput: require('react-native').TextInput,
    TouchableHighlight: require('react-native').TouchableHighlight,
    TouchableOpacity: require('react-native').TouchableOpacity,
    TouchableWithoutFeedback:
      require('react-native').TouchableWithoutFeedback,
  };
});

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
