import { describe, expect, it } from "vitest";
import {
  ACCENT_COLORS,
  DEFAULT_RADIUS_STOP,
  NEUTRAL_COLORS,
  RADIUS_STOPS,
  SPACE_SCALE,
  compileCssVariables,
  compileNativeTokens,
} from "../src/index";

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Token Compiler", () => {
  it("compiles web CSS variables accurately per TOKENS.md specification", () => {
    const css = compileCssVariables();
    try {
      writeFileSync(
        resolve(__dirname, "../../../apps/docs/app/tokens.css"),
        css,
        "utf-8",
      );
    } catch {
      // Ignored if docs directory not present in isolated environment
    }

    expect(css).toContain("--x-space-1: 4px;");
    expect(css).toContain("--x-space-10: 128px;");
    expect(css).toContain("--x-control-sm: 32px;");
    expect(css).toContain("--x-control-md: 40px;");
    expect(css).toContain("--x-control-lg: 48px;");
    expect(css).toContain("--x-hit-min: 44px;");
    expect(css).toContain("--x-border-width: 1px;");

    expect(css).toContain("--x-dur-instant: 100ms;");
    expect(css).toContain("--x-dur-slow: 400ms;");
    expect(css).toContain("--x-ease-standard: cubic-bezier(0.2, 0, 0, 1);");
    expect(css).toContain("--x-scale-press: 0.98;");

    expect(css).toContain(':root[data-x-theme="dark"]');
    expect(css).toContain(`--x-bg: ${NEUTRAL_COLORS.dark.bg};`);
    expect(css).toContain(':root[data-x-theme="light"]');
    expect(css).toContain(`--x-bg: ${NEUTRAL_COLORS.light.bg};`);

    for (const accent of ["lime", "pink", "blue", "purple", "green"] as const) {
      expect(css).toContain(
        `:root[data-x-accent="${accent}"][data-x-theme="dark"]`,
      );
      expect(css).toContain(`--x-accent: ${ACCENT_COLORS[accent].dark};`);
    }

    for (let stop = 0; stop <= 6; stop += 1) {
      expect(css).toContain(`:root[data-x-radius="${stop}"]`);
    }
  });

  it("compiles native tokens into strongly typed platform objects", () => {
    const darkTokens = compileNativeTokens("dark", "lime");
    expect(darkTokens.theme).toBe("dark");
    expect(darkTokens.accent).toBe("lime");
    expect(darkTokens.colors.bg).toBe(NEUTRAL_COLORS.dark.bg);
    expect(darkTokens.colors.accent).toBe(ACCENT_COLORS.lime.dark);
    expect(darkTokens.space[1]).toBe(SPACE_SCALE[1]);
    expect(darkTokens.radius[4].surface).toBe(RADIUS_STOPS[4].surface);
    expect(darkTokens.motion.springSoft.stiffness).toBe(300);
    expect(darkTokens.glass.regular.nativeBlurIntensity).toBe(50);
    expect(darkTokens.glass.clear.nativeBlurIntensity).toBe(25);

    const lightTokens = compileNativeTokens("light", "pink");
    expect(lightTokens.theme).toBe("light");
    expect(lightTokens.accent).toBe("pink");
    expect(lightTokens.colors.bg).toBe(NEUTRAL_COLORS.light.bg);
    expect(lightTokens.colors.accent).toBe(ACCENT_COLORS.pink.light);
  });

  it("exports sensible default switches", () => {
    expect(DEFAULT_RADIUS_STOP).toBe(4);
  });
});
