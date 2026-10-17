import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgDir = resolve(__dirname, "..");
const distDir = resolve(pkgDir, "dist");
const repoDocs = resolve(pkgDir, "../../docs");
const tokenCssSource = resolve(pkgDir, "../tokens/dist/tokens.css");

mkdirSync(distDir, { recursive: true });

if (!existsSync(tokenCssSource)) {
  throw new Error("tokens.css missing: build @xenon/tokens before @xenon/web");
}
const baseCss = readFileSync(resolve(__dirname, "base.css"), "utf-8");
writeFileSync(
  resolve(distDir, "styles.css"),
  readFileSync(tokenCssSource, "utf-8") + baseCss,
);
console.log("Wrote dist/styles.css (tokens + base layer)");

// Ship the design rules with the package so agents can read them offline,
// version-locked to the installed components.
const docsOut = resolve(pkgDir, "docs");
rmSync(docsOut, { recursive: true, force: true });
mkdirSync(docsOut, { recursive: true });
for (const file of ["DESIGN.md", "TOKENS.md", "PLATFORMS.md"]) {
  copyFileSync(resolve(repoDocs, file), resolve(docsOut, file));
}
cpSync(resolve(repoDocs, "guidelines"), resolve(docsOut, "guidelines"), {
  recursive: true,
});
console.log("Copied design docs and guidelines into docs/");
