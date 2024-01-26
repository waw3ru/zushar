module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort'],
    extends: ['plugin:@typescript-eslint/recommended'],
    root: true,
    ignorePatterns: ['.eslintrc.js', 'node_modules/', 'dist/', 'coverage/'],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': ['error'],
      'no-console': ['error', { allow: ['error', 'warn'] }],
      'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-return-assign': ['error', 'always'],
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: false,
          },
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      semi: 0,
      '@typescript-eslint/semi': ['error'],
    },
};