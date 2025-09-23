import antfu from '@antfu/eslint-config'

const ignores = ['dist/*', 'node_modules/*', '.pnpm-store/*', 'generated/*', 'logs/*', 'tsconfig.json']

export default await antfu(
  {
    typescript: true,
    vue: false,
    rules: {
      'antfu/if-newline': 'off',
      'curly': ['error', 'multi-line'],
      'eqeqeq': 'error',
      'func-style': ['error', 'declaration'],
      'newline-before-return': 'error',
      'no-console': 'off',
      'no-duplicate-imports': 'off',
      'no-else-return': 'error',
      'no-lonely-if': 'error',
      'no-negated-condition': 'error',
      'node/prefer-global/process': 'off',
      'object-shorthand': 'error',
      'unused-imports/no-unused-vars': 'warn',
      'no-useless-catch': 'error',
    },
    yaml: false,
    markdown: false,
  },
  { ignores },
)
