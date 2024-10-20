module.exports = {
  // env: {
  //   node: true,
  //   es6: true,
  // },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Enable JSX
    },
    ecmaVersion: 12, // Use the latest ECMAScript features
    sourceType: 'module', // Allow the use of imports
  },
  plugins: ['react', 'jsx-a11y', 'prettier'],

  extends: [
    "eslint:recommended",
    "google",
    'plugin:react/recommended', // Use the recommended rules from the React plugin
    'plugin:jsx-a11y/recommended', // Accessibility plugin for React
    'plugin:prettier/recommended',
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
    "react/prop-types": "off" ,
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
