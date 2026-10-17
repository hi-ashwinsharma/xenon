#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WEB_PKG = "@xenon-kit/web";
const SITE = "https://xenon.hi-ashwin.xyz";
const MARK_START = "<!-- xenon:start -->";
const MARK_END = "<!-- xenon:end -->";
const cwd = process.cwd();

const log = (msg) => console.log(`xenon  ${msg}`);
const fail = (msg) => {
  console.error(`xenon  ${msg}`);
  process.exit(1);
};

function detectPackageManager() {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  if (existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock")))
    return "bun";
  return "npm";
}

function install(pm, deps) {
  const verb = pm === "npm" ? "install" : "add";
  const cmd = `${pm} ${verb} ${deps.join(" ")}`;
  log(`installing: ${cmd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

// Replaces the Xenon block in a file, or appends it, so re-running init is safe.
function upsertBlock(file, body) {
  const path = join(cwd, file);
  const block = `${MARK_START}\n${body.trim()}\n${MARK_END}\n`;
  const current = existsSync(path) ? readFileSync(path, "utf-8") : "";
  const start = current.indexOf(MARK_START);
  const end = current.indexOf(MARK_END);
  const next =
    start !== -1 && end !== -1
      ? current.slice(0, start) +
        block +
        current.slice(end + MARK_END.length + 1)
      : current + (current && !current.endsWith("\n\n") ? "\n" : "") + block;
  writeFileSync(path, next);
  log(`${current ? "updated" : "created"} ${file}`);
}

function writeAgentRules() {
  const rulesPath = join(cwd, "node_modules", WEB_PKG, "AGENTS.md");
  if (!existsSync(rulesPath)) fail(`could not find ${rulesPath}`);
  upsertBlock("AGENTS.md", readFileSync(rulesPath, "utf-8"));
  upsertBlock(
    "CLAUDE.md",
    "This project uses the Xenon UI kit. Follow every rule in AGENTS.md.\n\n@AGENTS.md",
  );
}

const HTML_ATTRS = 'data-x-theme="dark" data-x-accent="lime" data-x-radius="5"';

// Pre-sets the theme on <html> so the first paint matches XenonProvider (no light flash).
function presetHtmlTheme(file) {
  const path = join(cwd, file);
  if (!existsSync(path)) return;
  const src = readFileSync(path, "utf-8");
  if (src.includes("data-x-theme")) return;
  const next = src.replace(/<html(\s[^>]*)?>/, (tag) =>
    tag.replace(/>$/, ` ${HTML_ATTRS}>`),
  );
  if (next !== src) {
    writeFileSync(path, next);
    log(`preset theme attributes on <html> in ${file}`);
  }
}

function wireVite() {
  const entry = ["src/main.tsx", "src/main.jsx"].find((f) =>
    existsSync(join(cwd, f)),
  );
  if (!entry) return false;
  presetHtmlTheme("index.html");
  const path = join(cwd, entry);
  let src = readFileSync(path, "utf-8");
  if (src.includes(WEB_PKG)) return log(`${entry} already wired`) || true;
  src = src.replace(/^import ["']\.\/index\.css["'];?\n/m, "");
  src =
    `import "${WEB_PKG}/styles.css";\nimport { XenonProvider } from "${WEB_PKG}";\n` +
    src;
  const wrapped = src.replace(
    /<App\s*\/>/,
    `<XenonProvider defaultTheme="dark" defaultAccent="lime">\n      <App />\n    </XenonProvider>`,
  );
  if (wrapped === src) return false;
  writeFileSync(path, wrapped);
  log(`wired styles.css and XenonProvider into ${entry}`);
  return true;
}

function wireNext() {
  const entry = ["app/layout.tsx", "src/app/layout.tsx"].find((f) =>
    existsSync(join(cwd, f)),
  );
  if (!entry) return false;
  presetHtmlTheme(entry);
  const path = join(cwd, entry);
  let src = readFileSync(path, "utf-8");
  if (src.includes(WEB_PKG)) return log(`${entry} already wired`) || true;
  src = src.replace(/^import ["']\.\/globals\.css["'];?\n/m, "");
  src =
    `import "${WEB_PKG}/styles.css";\nimport { XenonProvider } from "${WEB_PKG}";\n` +
    src;
  const wrapped = src.replace(
    /\{children\}/,
    `<XenonProvider defaultTheme="dark" defaultAccent="lime">{children}</XenonProvider>`,
  );
  if (wrapped === src) return false;
  writeFileSync(path, wrapped);
  log(`wired styles.css and XenonProvider into ${entry}`);
  return true;
}

function init() {
  if (!existsSync(join(cwd, "package.json"))) {
    fail(
      "no package.json here. Create a React app first, for example:\n" +
        "       npm create vite@latest my-app -- --template react-ts\n" +
        "       then run `npx @xenon-kit/cli init` inside it.",
    );
  }
  // XENON_WEB_SPEC lets maintainers test init against a local tarball before publishing.
  install(detectPackageManager(), [
    process.env.XENON_WEB_SPEC || WEB_PKG,
    "@phosphor-icons/react",
  ]);
  writeAgentRules();
  if (!wireVite() && !wireNext()) {
    log(
      "could not find a Vite or Next.js entry to wire. Add this to your app root:",
    );
    console.log(
      `\n  import "${WEB_PKG}/styles.css";\n  import { XenonProvider } from "${WEB_PKG}";\n  <XenonProvider defaultTheme="dark" defaultAccent="lime">{children}</XenonProvider>\n`,
    );
  }
  log("done. Agents: read AGENTS.md before writing UI.");
  docs();
}

function docs() {
  console.log(
    [
      "",
      `  Docs          ${SITE}/docs`,
      `  Agent index   ${SITE}/llms.txt`,
      `  Full docs     ${SITE}/llms-full.txt`,
      `  Registry      ${SITE}/r  (per component: ${SITE}/r/<name>.json)`,
      `  Local rules   node_modules/${WEB_PKG}/AGENTS.md and docs/`,
      "",
    ].join("\n"),
  );
}

const [command] = process.argv.slice(2);
if (command === "init") init();
else if (command === "docs") docs();
else {
  console.log("Usage: xenon <init|docs>");
  docs();
}
