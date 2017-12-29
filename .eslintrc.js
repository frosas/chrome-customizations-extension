/* eslint-env node */

module.exports = {
  extends: ["@frosas/eslint-config"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 8,
    ecmaFeatures: { experimentalObjectRestSpread: true }
  },
  env: { es6: true }
};
