module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:vue/vue3-strongly-recommended",
  ],
  rules: {
    "vue/html-indent": [
      "error",
      "tab",
      {
        attribute: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    "vue/require-explicit-emits": "off",
    "no-tabs": "off",
    indent: [
      "error",
      "tab",
      {
        SwitchCase: 1,
      },
    ],
    quotes: [
      "error",
      "single",
      {
        allowTemplateLiterals: true,
      },
    ],
  },
};
