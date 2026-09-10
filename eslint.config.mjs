import js from "@eslint/js";
import globals from "globals";
import cypress from "eslint-plugin-cypress";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["cypress/**/*.{js,mjs,cjs}"],
    extends: [cypress.configs.recommended],
  },
]);
