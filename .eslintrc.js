module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  rules: {
    "react/prop-types": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "react/jsx-uses-vars": 2,
    "react/destructuring-assignment": [ 2, 'always' ],
    "react/prefer-stateless-function": [ 2, { "ignorePureComponents": false } ],
    "react/jsx-max-props-per-line": [
      "error",
      {
        "maximum": 2,
        "when": "multiline"
      }
    ],
    "max-len": [
      "error",
      {
        "code": 140,
        "ignoreUrls": true
      }
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};