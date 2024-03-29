module.exports = {
  "presets": [[
    "@babel/preset-env", {
      "useBuiltIns": "entry"
    }],
    "@babel/preset-react"],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
    ["@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}