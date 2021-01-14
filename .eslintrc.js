const [OFF, WARN, ERR] = [0, 1, 2]

module.exports = {
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
    plugins: ['@typescript-eslint', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.eslint.json',
      tsconfigRootDir: __dirname,
      ecmaVersion: 2020,
    },
    env: {
        es6: true,
        node: true,
        'jest/globals': true
    },
    globals: {},
    rules: {
        // Possible errors & best practices
        complexity: [WARN, 7],
        // "consistent-return": ERR,
        'dot-notation': WARN,
        eqeqeq: [ERR, 'allow-null'],
        'linebreak-style': [ERR, 'unix'],
        'no-empty': WARN,
        'no-else-return': OFF,
        'no-extra-bind': ERR,
        // "no-magic-numbers": [ERR, { "ignore": [0, 1, 2, -1] }],
        'no-param-reassign': WARN,
        'no-prototype-builtins': OFF,
        'no-throw-literal': WARN,
        'no-warning-comments': WARN,
        'no-unexpected-multiline': ERR,
        radix: [WARN, 'as-needed'],
        'wrap-iife': [WARN, 'outside'],
        yoda: ERR,

        // Variables
        'init-declarations': [WARN, 'always'],
        'no-redeclare': WARN,
        'no-shadow': WARN,
        'no-undef-init': ERR,
        'no-use-before-define': WARN,

        // Node/commonjs
        'callback-return': WARN,
        'handle-callback-err': ERR,

        // Style
        camelcase: [ERR, { properties: 'never' }],
        'comma-dangle': OFF,
        'max-depth': [ERR, 4],
        'max-nested-callbacks': [WARN, 4],
        'new-cap': OFF,
        'no-bitwise': OFF, // Could enable later, but we do use bitwise ops in a few places
        'no-case-declarations': OFF,
        'no-console': WARN,
        'no-lonely-if': WARN,
        'no-new-object': ERR,
        'no-restricted-syntax': [ERR, 'WithStatement'],
        'no-unneeded-ternary': ERR,
        'no-unused-vars': [WARN, { vars: 'all', args: 'none' }], // Should be err, but can trigger on commented-out code
        'object-curly-spacing': [OFF, 'always'],
        'one-var': [WARN, 'never'],
        'spaced-comment': [ERR, 'always'],

        // ES6
        // Any rules here set to OFF are things to turn on eventually
        'no-confusing-arrow': ERR,
        'no-const-assign': ERR,
        'no-dupe-class-members': ERR,
        'no-var': ERR,
        'object-shorthand': OFF,
        'prefer-arrow-callback': OFF,
        'prefer-const': WARN,
        'prefer-spread': OFF,
        'prefer-template': OFF,

        // JSDoc
        // "require-jsdoc": OFF,
        // "valid-jsdoc": WARN
        'prettier/prettier': [
            WARN,
            { singleQuote: true, semi: true, printWidth: 120, tabWidth: 2 },
        ],
    },
    overrides: [
      // Typescript files
      {
        files: ["*.ts", "*.tsx"],
        rules: {
          "@typescript-eslint/explicit-function-return-type": ERR,
          "@typescript-eslint/no-explicit-any": ERR,
          "@typescript-eslint/camelcase": OFF,
        },
      },
      // Unit test files
      {
        files: ["*.test.js", "*.test.ts", "*.test.tsx"],
        globals: {
          jsdom: "readonly",
        },
        plugins: ["jest"],
        extends: ["plugin:jest/recommended"],
        rules: {
          "jest/require-top-level-describe": ERR,
          "jest/no-try-expect": OFF,
        },
      },
      // e2e test files
      {
        files: ["./test/**/*.ts"],
        globals: {
          browser: "readonly",
          $: "readonly",
        },
        plugins: ["chai-friendly"],
        rules: {
          "@typescript-eslint/no-var-requires": OFF,
          "func-names": OFF,
          "no-unused-expressions": OFF,
          "chai-friendly/no-unused-expressions": ERR,
        },
      },
    ],
}