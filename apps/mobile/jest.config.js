module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@shopify/restyle|react-native-mmkv|react-native-gesture-handler|lucide-react-native|react-native-svg)/)',
  ],
};
