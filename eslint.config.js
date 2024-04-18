// See https://eslint.org/docs/latest/use/configure/

import frosasConfig, { config, globals } from "@frosas/eslint-config"

export default config(
  ...frosasConfig,
  {
    languageOptions: {
      parserOptions: {
        // For an ECMAScript version appropriate to a given Node version, check
        // https://node.green
        ecmaVersion: 2020,
      },
      globals: { ...globals.es2020 },
    },
  },
  {
    files: ["js/**/*"],
    languageOptions: {
      parserOptions: { sourceType: "module" },
      globals: { ...globals.browser },
    },
  },
  { ignores: ["dist/"] },
)
