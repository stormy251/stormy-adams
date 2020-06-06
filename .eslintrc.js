module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    semi: ['error', 'always'],
    indent: ['error', 2, {SwitchCase: 1}],
    'object-curly-spacing': 2,
    'space-before-function-paren': ['error', 'always'],
    quotes: [2, 'single', {avoidEscape: true}],
    'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/camelcase': 0
  }
};
