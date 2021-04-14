module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-unused-vars': 'error',
    'no-console': 'off',
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'no-var': 'error',
    'linebreak-style': 'off',
    'arrow-body-style': ['error', 'always'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'node/no-unsupported-features/es-syntax': [
      'error',
      { version: '>=12.0.0', ignores: ['restSpreadProperties'] },
    ],
    semi: 'error',
  },
};
