import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { compileCssVariables } from "../dist/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");
mkdirSync(distDir, { recursive: true });
writeFileSync(resolve(distDir, "tokens.css"), compileCssVariables(), "utf-8");
console.log("Compiled tokens.css to dist/tokens.css");
