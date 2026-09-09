module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@shopify/restyle|react-native-mmkv|expo-font|@expo-google-fonts|lucide-react-native|react-native-svg)/)',
  ],
};
