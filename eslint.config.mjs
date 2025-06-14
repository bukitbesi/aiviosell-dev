import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import { parse } from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: parse,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: { '@typescript-eslint': eslintPluginTs },
    rules: {
      'no-unused-vars': 'warn',
    },
  },
];
