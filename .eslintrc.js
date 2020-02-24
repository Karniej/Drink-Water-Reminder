module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['typescript-sort-keys'],
  rules: {
    'object-shorthand': ['error', 'always'],
    'sort-keys': [
      'error',
      'asc',
      { caseSensitive: true, natural: false, minKeys: 2 },
    ],
    'typescript-sort-keys/interface': 2,
    'typescript-sort-keys/string-enum': 2,
  },
  env: {
    jest: true,
  },
};
