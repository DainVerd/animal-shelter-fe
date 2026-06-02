/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
  ],
  rules: {
    "vue/multi-word-component-names": "off",

    "quotes": ["error", "double", { "allowTemplateLiterals": true, "avoidEscape": true }],
    "vue/html-quotes": ["error", "double"],

    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 1
      },
      "multiline": {
        "max": 1
      }
    }],

    "semi": "off", 
    "@typescript-eslint/semi": ["error", "always"] 
  },
};