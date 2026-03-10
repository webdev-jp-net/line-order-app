import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist', '_document', 'src/store/_apiClient.ts', '**/*.test.ts', '**/*.test.tsx', 'storybook-static'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-unused-vars': 1,
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'object',
            'type',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'react-redux',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'store|store/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'react-router-dom',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'api/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'layout/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'pages/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'routes/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'utils/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'constants/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'style/**/*.scss',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './**/*.*',
              group: 'sibling',
              position: 'before',
            },
            {
              pattern: 'types/**/*',
              group: 'type',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: [],
        },
      ],
    },
  },
  prettier
)
