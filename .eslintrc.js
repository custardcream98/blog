/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "next", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["node_modules/"],
  overrides: [
    {
      extends: ["plugin:storybook/recommended"],
      files: ["*.stories.tsx", "*.stories.mdx"],
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    createDefaultProgram: true,
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "sort-keys-fix", "simple-import-sort", "import"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "array-callback-return": [
      "error",
      {
        allowImplicit: true,
      },
    ],
    "comma-spacing": ["error"],
    eqeqeq: ["error"],
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "linebreak-style": ["error", "unix"],
    "no-await-in-loop": ["error"],
    "no-constant-binary-expression": ["error"],
    "no-duplicate-imports": ["error"],
    "no-self-compare": ["error"],
    "no-unmodified-loop-condition": ["error"],
    quotes: ["error", "double", { avoidEscape: true }],
    radix: ["error"],
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/boolean-prop-naming": ["error"],
    "react/button-has-type": ["error"],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "function-declaration",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/hook-use-state": ["error"],
    "react/jsx-boolean-value": ["error", "never"],
    "react/jsx-child-element-spacing": ["error"],
    "react/jsx-closing-bracket-location": ["error"],
    "react/jsx-curly-newline": ["error"],
    "react/jsx-curly-spacing": ["error", { children: true, when: "never" }],
    "react/jsx-equals-spacing": ["error"],
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react/jsx-handler-names": ["error"],
    "react/jsx-no-constructed-context-values": ["error"],
    "react/jsx-no-useless-fragment": [
      "error",
      {
        allowExpressions: true,
      },
    ],
    "react/jsx-pascal-case": ["error"],
    "react/jsx-props-no-multi-spaces": ["error"],
    "react/jsx-tag-spacing": [
      "error",
      {
        beforeClosing: "never",
      },
    ],
    "react/jsx-wrap-multilines": ["error"],
    "react/no-unstable-nested-components": ["error"],
    "react/no-unused-state": ["error"],
    "react/react-in-jsx-scope": "off",
    "react/self-closing-comp": [
      "error",
      {
        html: false,
      },
    ],
    "react/sort-default-props": ["error"],
    "require-await": ["error"],
    semi: "off",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^\\u0000"],
          ["^src(/.*|$)"],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ["^.+\\.?(css)$"],
        ],
      },
    ],
    "sort-keys-fix/sort-keys-fix": "warn",
    "space-before-blocks": ["error"],
  },
}
