import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([
    "**/node_modules/**",
    "**/.next/**",
    "**/dist/**",
    "**/out/**",
    "**/build/**",
    "coverage/**",
    "**/*.tsbuildinfo",
    "**/next-env.d.ts",
  ]),
]);

export default eslintConfig;
