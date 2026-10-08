import { describe, expect, it } from "vitest";
import {
  clampControlRadius,
  computeNestedRadius,
  getGroupJointRadiusForStop,
  groupJointRadius,
} from "../src/index.js";

describe("computeNestedRadius", () => {
  it("computes concentric nested radius within floor and ceiling bounds", () => {
    // Standard concentric case from docs/guidelines/shape.md
    expect(computeNestedRadius(24, 8)).toBe(16);

    // Padding matches parent radius: collapses to floor (24 * 0.4 = 9.6)
    expect(computeNestedRadius(24, 24)).toBeCloseTo(9.6, 5);

    // Padding exceeds parent radius: collapses to floor
    expect(computeNestedRadius(24, 30)).toBeCloseTo(9.6, 5);

    // Zero padding: returns parent radius (ceiling bound)
    expect(computeNestedRadius(20, 0)).toBe(20);

    // Negative padding: clamped safely to parent radius
    expect(computeNestedRadius(20, -5)).toBe(20);

    // Non-positive parent radius: returns 0
    expect(computeNestedRadius(0, 8)).toBe(0);
    expect(computeNestedRadius(-10, 4)).toBe(0);
  });
});

describe("clampControlRadius", () => {
  it("clamps control radius to half height across predefined stops and custom values", () => {
    // Pill stop (stop 6, raw 9999px) clamped to height / 2
    expect(clampControlRadius(40, 6)).toBe(20);
    expect(clampControlRadius(32, 6)).toBe(16);
    expect(clampControlRadius(48, 6)).toBe(24);

    // Discrete stop 4 (16px) on height 40 (cap 20px) -> fits at 16px
    expect(clampControlRadius(40, 4)).toBe(16);

    // Discrete stop 4 (16px) on height 24 (cap 12px) -> clamped to 12px
    expect(clampControlRadius(24, 4)).toBe(12);

    // Discrete stop 0 (sharp, 0px)
    expect(clampControlRadius(40, 0)).toBe(0);

    // Arbitrary numeric radius
    expect(clampControlRadius(40, 8)).toBe(8);
    expect(clampControlRadius(40, 30)).toBe(20);

    // Zero or negative height / radius
    expect(clampControlRadius(0, 4)).toBe(0);
    expect(clampControlRadius(-10, 4)).toBe(0);
    expect(clampControlRadius(40, -5)).toBe(0);
  });
});

describe("groupJointRadius", () => {
  it("retrieves exact joint radius for predefined stops", () => {
    expect(getGroupJointRadiusForStop(0)).toBe(0);
    expect(getGroupJointRadiusForStop(1)).toBe(2);
    expect(getGroupJointRadiusForStop(2)).toBe(2);
    expect(getGroupJointRadiusForStop(3)).toBe(3);
    expect(getGroupJointRadiusForStop(4)).toBe(4);
    expect(getGroupJointRadiusForStop(5)).toBe(5);
    expect(getGroupJointRadiusForStop(6)).toBe(6);
  });

  it("computes group joint radius for both stop indices and continuous numbers", () => {
    expect(groupJointRadius(0)).toBe(0);
    expect(groupJointRadius(1)).toBe(2);
    expect(groupJointRadius(2)).toBe(2);
    expect(groupJointRadius(3)).toBe(3);
    expect(groupJointRadius(4)).toBe(4);
    expect(groupJointRadius(5)).toBe(5);
    expect(groupJointRadius(6)).toBe(6);

    // Non-stop numbers
    expect(groupJointRadius(0)).toBe(0);
    expect(groupJointRadius(-5)).toBe(0);
    expect(groupJointRadius(2)).toBe(2);
    expect(groupJointRadius(8)).toBe(2);
    expect(groupJointRadius(12)).toBe(3);
    expect(groupJointRadius(16)).toBe(4);
    expect(groupJointRadius(20)).toBe(5);
    expect(groupJointRadius(24)).toBe(6);
  });
});
