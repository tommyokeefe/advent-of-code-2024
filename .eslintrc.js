module.exports = {
  env: {
    es2022: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [],
  rules: {
    'no-fallthrough': 'off',
    'no-unused-vars': 'off',
    'prefer-const': 'warn',
  },
  //sourceType: 'module',
}
