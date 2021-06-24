module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {},
  extends: ["./node_modules/@ml/lint/.stylelintrc.js"],
  rules: {
    "value-keyword-case": null,
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["function", "if", "else", "each", "for", "include", "mixin"]
    }],
    "property-no-unknown": [
      true,
      {
        "ignoreProperties": [
          "composes"
        ]
      }
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": [
          "global"
        ]
      }
    ]

  }
}
