import { describe, expect, it } from "vitest";
import { computeFloatingPlacement } from "../src/floating";

describe("computeFloatingPlacement", () => {
  const triggerRect = { x: 100, y: 100, width: 80, height: 40 };

  it("calculates centered bottom placement accurately", () => {
    const result = computeFloatingPlacement({
      triggerRect,
      floatingWidth: 160,
      floatingHeight: 100,
      placement: "bottom",
      offset: 8,
      viewportWidth: 1000,
      viewportHeight: 800,
    });

    // Trigger center X: 100 + 40 = 140. Floating X: 140 - 80 = 60.
    // Floating Y: 100 + 40 + 8 = 148.
    expect(result.x).toBe(60);
    expect(result.y).toBe(148);
    expect(result.actualPlacement).toBe("bottom");
    // Origin should point to trigger center relative to floating element: (140 - 60) = 80px
    expect(result.transformOrigin).toBe("80px 0px");
  });

  it("flips from bottom to top when overflowing bottom viewport", () => {
    const bottomTrigger = { x: 100, y: 750, width: 80, height: 40 };
    const result = computeFloatingPlacement({
      triggerRect: bottomTrigger,
      floatingWidth: 160,
      floatingHeight: 100,
      placement: "bottom",
      offset: 8,
      viewportWidth: 1000,
      viewportHeight: 800,
    });

    // Flipping to top: 750 - 100 - 8 = 642.
    expect(result.actualPlacement).toBe("top");
    expect(result.y).toBe(642);
    expect(result.transformOrigin).toBe("80px 100px");
  });

  it("flips from top to bottom when overflowing top viewport", () => {
    const topTrigger = { x: 100, y: 20, width: 80, height: 40 };
    const result = computeFloatingPlacement({
      triggerRect: topTrigger,
      floatingWidth: 160,
      floatingHeight: 100,
      placement: "top",
      offset: 8,
      viewportWidth: 1000,
      viewportHeight: 800,
    });

    expect(result.actualPlacement).toBe("bottom");
    expect(result.y).toBe(68);
  });

  it("clamps within viewport boundary padding", () => {
    const edgeTrigger = { x: 2, y: 100, width: 20, height: 40 };
    const result = computeFloatingPlacement({
      triggerRect: edgeTrigger,
      floatingWidth: 100,
      floatingHeight: 60,
      placement: "bottom-start",
      offset: 8,
      viewportWidth: 1000,
      viewportHeight: 800,
      boundaryPadding: 12,
    });

    expect(result.x).toBeGreaterThanOrEqual(12);
  });
});
