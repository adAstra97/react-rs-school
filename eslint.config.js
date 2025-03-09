import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginReactCompiler from 'eslint-plugin-react-compiler';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

/** @type {import('eslint').Linter.Config[]} */
const config = [
  { ignores: ['.next/**', 'dist/**', 'next.config.js', 'postcss.config.js'] },
  { files: ['**/*.{ts,tsx}'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  pluginReact.configs.flat.recommended,
  eslintPluginPrettier,
  ...compat.config({
    extends: ['next', 'next/core-web-vitals'],
    settings: {
      react: {
        version: 'detect',
      },
      next: {
        rootDir: __dirname,
      },
    },
  }),
  {
    plugins: {
      '@next/next': nextPlugin,
      'react-hooks': pluginReactHooks,
      react: pluginReact,
      'react-refresh': pluginReactRefresh,
      'react-compiler': pluginReactCompiler,
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'off',
      'react/jsx-key': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-compiler/react-compiler': 'error',
    },
  },
];
export default config;
