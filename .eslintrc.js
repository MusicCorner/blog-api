module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-empty-function": "off",
    '@typescript-eslint/no-unused-vars': [
      'error',
      { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "no-unused-vars": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "no-console": "error",
    quotes: [2, "single"],
    "prettier/prettier": [
      "error",
      { singleQuote: true }
    ],
    "import/order": [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', ['sibling', 'parent', 'index']],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: "@nestjs/**",
            group: "external",
          },
        ]
      }
    ],
  },
  settings: {
    "import/internal-regex": "^@.*"
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parserOptions: {
    project: './tsconfig.json'
  }
};
