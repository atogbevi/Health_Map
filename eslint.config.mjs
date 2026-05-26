// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['**/*.{js,mjs,ts,vue}'],
    rules: {
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always'],

      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      'vue/no-v-html': 'warn',
      'vue/no-multiple-template-root': 'off',
      // Props alimentées par l'API / Supabase (noms snake_case, sans défaut local).
      'vue/require-default-prop': 'off',
      'vue/prop-name-casing': 'off',
    },
  },
  {
    files: ['**/*.{ts,vue}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
    },
  },
  {
    files: ['**/*.{js,mjs}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },
)
