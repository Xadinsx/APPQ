const path = require('path');

module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: ['jest.setup.js'],
  parserOptions: {
    babelOptions: {
      configFile: path.join(__dirname, 'babel.config.js'),
    },
  },
};
