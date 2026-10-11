import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");
const tokenCssSource = resolve(__dirname, "../../tokens/dist/tokens.css");
const fallbackCssSource = resolve(
  __dirname,
  "../../../apps/docs/app/tokens.css",
);

mkdirSync(distDir, { recursive: true });

if (existsSync(tokenCssSource)) {
  copyFileSync(tokenCssSource, resolve(distDir, "styles.css"));
  console.log("Copied tokens.css to dist/styles.css from @xenon/tokens dist");
} else if (existsSync(fallbackCssSource)) {
  copyFileSync(fallbackCssSource, resolve(distDir, "styles.css"));
  console.log("Copied tokens.css to dist/styles.css from apps/docs");
} else {
  console.warn(
    "Warning: Could not find tokens.css source to bundle into @xenon/web",
  );
}
