module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "eslint-config-prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "@typescript-eslint", "jest"],
  ignorePatterns: ["**/*.css", "**/*.svg"],
  rules: {
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-param-reassign": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        controlComponents: ["Field", "FastField"],
        assert: "either",
        depth: 3,
      },
    ],
    "react/jsx-props-no-spreading": ["off"],
    camelcase: "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-nested-ternary": "off",
    "no-underscore-dangle": ["error", { allow: ["__typename"] }],
    "react/react-in-jsx-scope": "off",
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "react-**",
            group: "builtin",
            position: "after",
          },
          {
            pattern: "@**",
            group: "external",
            position: "after",
          },
          {
            pattern: "__generated__/**",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
  overrides: [
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-anonymous-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        "react/jsx-props-no-spreading": "off",
      },
    },
    {
      files: ["**/*.test.*", "setupTests.ts"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
