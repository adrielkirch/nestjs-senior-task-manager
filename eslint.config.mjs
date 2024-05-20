import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    languageOptions: {
      globals: globals.es2021,
    },
  },
  ...tseslint.configs.recommended,
  {
   
    ignores: [
      'node_modules/**',
      'dist/**',
      'src/**/*.spec.ts',
      'src/middlewares/default.middleware.ts'
    ]
  }
];
