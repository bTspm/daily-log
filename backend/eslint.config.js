import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import * as tseslint from 'typescript-eslint';

// Create a compatibility instance
const compat = new FlatCompat();

export default [
  {
    ignores: [
      // Dependencies
      '**/node_modules/**',

      // Build directories
      '**/dist/**',
      '**/build/**',
      '**/cdk.out/**',
      '**/.aws-sam/**',

      // Coverage reports
      '**/coverage/**',

      // Cache directories
      '**/.npm/**',
      '**/.eslintcache',

      // Miscellaneous files
      '**/.DS_Store',
      '**/*.log',
      '**/*.txt',
      '**/*.md',

      // Environment variables
      '**/.env*',
      '!**/.env.example',

      // Generated files
      '**/package-lock.json',
      '**/yarn.lock',
      '**/tsconfig.tsbuildinfo',

      // Serverless/CDK generated
      '**/.serverless/**',
      '**/.cdk.staging/**',
    ],
  },

  // Global settings
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // JS recommended rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // TypeScript specific configurations
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // Use compat to include import plugin from eslintrc format
  ...compat.config({
    plugins: ['import'],
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object', 'type'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  }),

  // Use compat to include prettier config
  ...compat.config({
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
  }),
];
