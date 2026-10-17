// Rewrites workspace package.json files for publishing to public npm under @xenon-kit.
// @xenon/web inlines @xenon/core and @xenon/tokens at build time, so only web and cli ship.
// Run after `pnpm build`, publish, then `git checkout -- packages/web/package.json packages/cli/package.json`.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const scope = "@xenon-kit";

for (const pkgPath of ["packages/web", "packages/cli"]) {
  const file = resolve(rootDir, pkgPath, "package.json");
  const pkg = JSON.parse(readFileSync(file, "utf-8"));
  const originalName = pkg.name;
  pkg.name = originalName.replace(/^@xenon\//, `${scope}/`);

  if (pkg.publishConfig?.exports) {
    pkg.main = pkg.publishConfig.main;
    pkg.module = pkg.publishConfig.module;
    pkg.types = pkg.publishConfig.types;
    pkg.exports = pkg.publishConfig.exports;
  }
  pkg.publishConfig = { access: "public" };
  pkg.sideEffects = pkgPath === "packages/web" ? ["*.css"] : pkg.sideEffects;

  for (const key of Object.keys(pkg.dependencies ?? {})) {
    if (key.startsWith("@xenon/")) delete pkg.dependencies[key];
  }
  delete pkg.devDependencies;
  delete pkg.scripts;

  pkg.homepage = "https://xenon.hi-ashwin.xyz";
  pkg.license = "UNLICENSED";
  writeFileSync(file, JSON.stringify(pkg, null, 2) + "\n");
  console.log(`${originalName} -> ${pkg.name}`);
}
