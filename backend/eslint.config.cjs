// Flat config for ESLint v9+
const tsParser = require('@typescript-eslint/parser')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const importPlugin = require('eslint-plugin-import')

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**', 'docs/**', 'scripts/**/*.js'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
    },
    rules: {
      'import/order': ['warn', { 'newlines-between': 'always' }],
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]

