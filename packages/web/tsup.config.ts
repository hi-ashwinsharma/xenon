import { defineConfig } from "tsup";

// @xenon/core and @xenon/tokens are workspace-only. They are inlined into the
// published bundle (JS and .d.ts) so consumers install a single package.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: { resolve: ["@xenon/core", "@xenon/tokens"] },
  clean: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "@phosphor-icons/react",
  ],
  noExternal: ["@xenon/core", "@xenon/tokens"],
  banner: { js: '"use client";' },
});
