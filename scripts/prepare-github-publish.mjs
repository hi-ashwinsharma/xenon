import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

const packages = ["packages/tokens", "packages/core", "packages/web"];

const owner = process.env.GITHUB_REPOSITORY_OWNER || "hi-ashwinsharma";
const scope = `@${owner.toLowerCase()}`;

console.log(
  `Preparing packages for GitHub Packages publication under scope: ${scope}`,
);

for (const pkgPath of packages) {
  const pkgJsonPath = resolve(rootDir, pkgPath, "package.json");
  const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));

  const originalName = pkg.name;
  const shortName = originalName.replace(/^@xenon\//, "");
  const targetName = `${scope}/${shortName}`;

  pkg.name = targetName;
  pkg.main = "./dist/index.cjs";
  pkg.module = "./dist/index.js";
  pkg.types = "./dist/index.d.ts";
  if (pkg.publishConfig?.exports) {
    pkg.exports = pkg.publishConfig.exports;
  }

  pkg.publishConfig = {
    ...pkg.publishConfig,
    registry: "https://npm.pkg.github.com",
    access: "public",
  };

  if (pkg.dependencies) {
    for (const depKey of Object.keys(pkg.dependencies)) {
      if (depKey.startsWith("@xenon/")) {
        const depShort = depKey.replace(/^@xenon\//, "");
        const targetDep = `${scope}/${depShort}`;
        const version = pkg.version || "0.1.0";
        delete pkg.dependencies[depKey];
        pkg.dependencies[targetDep] = `^${version}`;
      }
    }
  }

  writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
  console.log(
    `Transformed ${originalName} -> ${targetName} for GitHub Packages`,
  );
}
