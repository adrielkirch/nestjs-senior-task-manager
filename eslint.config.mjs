import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: {
      globals: globals.es2021,
    },
  },
  ...tseslint.configs.recommended,
];
