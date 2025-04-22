import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    env: {
      browser: true,
      es2021: true,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        module: true,
        require: true,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    ignores: ['node_modules/', 'dist/'],
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'only-multiline'],
      'arrow-parens': ['error', 'as-needed'],
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off', // 이거랑 바로 아래를 적용안하면 "xx" is defined but never used 이렇게 에러가 자꾸나서 넣음
      'react/jsx-uses-vars': 'warn', //
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], ['internal']],
          'newlines-between': 'always',
        },
      ],
    },
  },
]
