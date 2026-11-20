import { describe, expect, it } from "vitest";
import {
  activeSegment,
  circleRevealRadius,
  convergeOffset,
  damp,
  liquidSurface,
  magneticOffset,
  odometerGlyphs,
  odometerTravel,
  segmentFills,
  tiltAngles,
  viewportProgress,
  wrapOffset,
} from "../src/motion";

describe("odometerGlyphs", () => {
  it("splits grouped numbers into digits and separators", () => {
    expect(odometerGlyphs(12480, "en-US")).toEqual([
      { kind: "digit", digit: 1 },
      { kind: "digit", digit: 2 },
      { kind: "char", char: "," },
      { kind: "digit", digit: 4 },
      { kind: "digit", digit: 8 },
      { kind: "digit", digit: 0 },
    ]);
  });

  it("groups by locale", () => {
    const glyphs = odometerGlyphs(1248000, "en-IN");
    const text = glyphs
      .map((glyph) => (glyph.kind === "digit" ? String(glyph.digit) : glyph.char))
      .join("");
    expect(text).toBe("12,48,000");
  });

  it("falls back to zero for non-finite values", () => {
    expect(odometerGlyphs(Number.NaN)).toEqual([{ kind: "digit", digit: 0 }]);
  });
});

describe("odometerTravel", () => {
  it("spins one full lap before landing", () => {
    expect(odometerTravel(0)).toBe(10);
    expect(odometerTravel(7)).toBe(17);
    expect(odometerTravel(42)).toBe(19);
  });
});

describe("magneticOffset", () => {
  it("is zero at the centre", () => {
    expect(magneticOffset(50, 20, 100, 40, 0.22)).toEqual({ x: 0, y: 0 });
  });

  it("pulls toward the pointer, a little more vertically", () => {
    const offset = magneticOffset(100, 40, 100, 40, 0.2);
    expect(offset.x).toBeCloseTo(10);
    expect(offset.y).toBeCloseTo(5.8);
  });
});

describe("tiltAngles", () => {
  it("is level at the centre and peaks at the edges", () => {
    expect(tiltAngles(0.5, 0.5, 3)).toEqual({ rotateX: 0, rotateY: 0 });
    expect(tiltAngles(1, 0, 3)).toEqual({ rotateX: 3, rotateY: 3 });
    expect(tiltAngles(0, 1, 3)).toEqual({ rotateX: -3, rotateY: -3 });
  });
});

describe("segmentFills", () => {
  it("fills segments in order", () => {
    expect(segmentFills(0.5, 4)).toEqual([1, 1, 0, 0]);
    expect(segmentFills(0.625, 4)).toEqual([1, 1, 0.5, 0]);
    expect(segmentFills(2, 3)).toEqual([1, 1, 1]);
  });

  it("names the segment that is filling", () => {
    expect(activeSegment(0, 6)).toBe(0);
    expect(activeSegment(0.5, 6)).toBe(3);
    expect(activeSegment(1, 6)).toBe(5);
  });
});

describe("convergeOffset", () => {
  it("starts spread out and lands home", () => {
    expect(convergeOffset(300, 100, 0.5, 0)).toBe(100);
    expect(convergeOffset(300, 100, 0.5, 1)).toBe(0);
  });
});

describe("liquidSurface", () => {
  it("sits below the word when empty and above it when full", () => {
    expect(liquidSurface(0)).toBeGreaterThan(0.9);
    expect(liquidSurface(1)).toBeLessThan(0);
  });
});

describe("damp", () => {
  it("approaches the target without overshooting", () => {
    const next = damp(0, 1, 10, 1 / 60);
    expect(next).toBeGreaterThan(0);
    expect(next).toBeLessThan(1);
  });
});

describe("wrapOffset", () => {
  it("wraps positive and negative offsets", () => {
    expect(wrapOffset(250, 100)).toBe(50);
    expect(wrapOffset(-30, 100)).toBe(70);
    expect(wrapOffset(10, 0)).toBe(0);
  });
});

describe("circleRevealRadius", () => {
  it("reaches the farthest corner", () => {
    expect(circleRevealRadius({ x: 0, y: 0 }, 300, 400)).toBe(500);
  });
});

describe("viewportProgress", () => {
  it("maps an element's travel between two viewport lines", () => {
    expect(viewportProgress(1000, 1000, 1, 0.5)).toBe(0);
    expect(viewportProgress(750, 1000, 1, 0.5)).toBe(0.5);
    expect(viewportProgress(100, 1000, 1, 0.5)).toBe(1);
  });
});
