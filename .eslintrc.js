module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/no-floating-promises": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/naming-convention": "off",
    "prettier/prettier": [
      "error",
      { singleQuote: true }
    ],
    quotes: [2, "single"],
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
