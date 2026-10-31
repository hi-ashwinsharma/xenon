import { describe, expect, it } from "vitest";
import { mix, scrollRange } from "../src/scroll";

describe("scrollRange", () => {
  it("clamps outside the window", () => {
    expect(scrollRange(0.1, 0.2, 0.8)).toBe(0);
    expect(scrollRange(0.9, 0.2, 0.8)).toBe(1);
  });

  it("is halfway at the middle of the window", () => {
    expect(scrollRange(0.5, 0.2, 0.8)).toBeCloseTo(0.5);
  });
});

describe("mix", () => {
  it("interpolates between both ends", () => {
    expect(mix(10, 20, 0)).toBe(10);
    expect(mix(10, 20, 1)).toBe(20);
    expect(mix(10, 20, 0.5)).toBe(15);
  });
});
