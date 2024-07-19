module.exports = {
  root: true,
  extends: [
    "@react-native-community",
    "prettier",
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "prettier", "react-native"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-shadow": "off",
        "no-shadow": "off",
      },
    },
  ],
  env: {
    "react-native/react-native": true,
  },
  rules: {
    "react/sort-comp": "error",
    "react/hook-use-state": "error",
    "react/jsx-sort-props": "error",
    "react/prefer-stateless-function": "error",
    // "react/require-optimization"                 : "error",
    "prettier/prettier": 0,
    "key-spacing": ["error", { align: "colon" }],
    "object-curly-spacing": ["error", "always"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    camelcase: ["error", { properties: "always" }],
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "react-native/no-raw-text": 0,
    "react-native/no-single-element-style-arrays": 2,
    "react/jsx-indent": [
      2,
      2,
      { checkAttributes: true, indentLogicalExpressions: true },
    ],
    "react-hooks/exhaustive-deps": "error",
    "no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "sort-imports": ["error", { ignoreDeclarationSort: true }],
    "react/prop-types": "off",
  },
};
