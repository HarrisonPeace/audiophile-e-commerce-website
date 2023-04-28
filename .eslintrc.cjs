module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
  plugins: [],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/require-name-property": ["error"],
    "vue/no-v-html": 0,
    "jest/expect-expect": 0,
    "vue/component-definition-name-casing": 0,
    "vue/multi-word-component-names": 0,
    "no-undef": 0,
  },
};
