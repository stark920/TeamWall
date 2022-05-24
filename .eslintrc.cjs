/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    'vue/setup-compiler-macros': true,
    node: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: true,
        endOfLine: 'auto',
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: 2,
      },
    ],
  },
};
