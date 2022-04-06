module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
  },
};
