module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension":"off",
    "linebreak-style":"off",
    "jsx-a11y/label-has-associated-control":"off",
    "import/prefer-default-export":"off",
    "no-restricted-syntax":"off",
    "react/prop-types":"off"
  },
};
