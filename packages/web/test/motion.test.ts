import { describe, expect, it } from "vitest";
import { createElement } from "react";
import {
  Curtain,
  FlipCard,
  LiquidText,
  Magnetic,
  NavLens,
  Odometer,
  ScrollConverge,
  ScrollMarquee,
  ScrollStory,
  ScrollTrack,
  SegmentedProgress,
  TextRoll,
  Tilt,
  WordReveal,
  useCircleReveal,
} from "../src/index";

describe("@xenon/web Motion", () => {
  it("exports every motion component", () => {
    for (const component of [
      Curtain,
      FlipCard,
      LiquidText,
      Magnetic,
      NavLens,
      Odometer,
      ScrollConverge,
      ScrollMarquee,
      ScrollStory,
      ScrollTrack,
      SegmentedProgress,
      TextRoll,
      Tilt,
      WordReveal,
      useCircleReveal,
    ]) {
      expect(typeof component).toBe("function");
    }
  });

  it("accepts odometer value, prefix and locale", () => {
    const element = createElement(Odometer, {
      value: 12480,
      prefix: "$",
      locale: "en-IN",
    });
    expect(element.props.value).toBe(12480);
    expect(element.props.locale).toBe("en-IN");
  });

  it("accepts a controlled flip card", () => {
    const element = createElement(FlipCard, {
      label: "Refund",
      front: "Front",
      back: "Back",
      flipped: true,
    });
    expect(element.props.flipped).toBe(true);
    expect(element.props.label).toBe("Refund");
  });

  it("accepts segmented progress and story steps", () => {
    const progress = createElement(SegmentedProgress, {
      segments: 4,
      value: 0.5,
    });
    expect(progress.props.segments).toBe(4);
    const story = createElement(ScrollStory, {
      steps: [{ id: "a", title: "Bought", visual: "Phone" }],
    });
    expect(story.props.steps).toHaveLength(1);
  });

  it("accepts text-driven components", () => {
    expect(createElement(TextRoll, { value: "refunds" }).props.value).toBe(
      "refunds",
    );
    expect(
      createElement(WordReveal, { text: "You buy", order: 2 }).props.order,
    ).toBe(2);
    expect(
      createElement(LiquidText, { progress: 0.4, children: "Xenon" }).props
        .progress,
    ).toBe(0.4);
  });

  it("accepts scroll-driven layouts", () => {
    expect(
      createElement(ScrollMarquee, { items: ["One", "Two"], speed: 0.4 }).props
        .speed,
    ).toBe(0.4);
    expect(createElement(ScrollConverge, { spread: 0.3 }).props.spread).toBe(
      0.3,
    );
    expect(createElement(ScrollTrack, { label: "Row" }).props.label).toBe(
      "Row",
    );
    expect(
      createElement(NavLens, {
        items: [{ sectionId: "a", label: "A", href: "#a" }],
      }).props.items,
    ).toHaveLength(1);
  });

  it("accepts pointer effects and the curtain", () => {
    expect(createElement(Magnetic, { strength: 0.3 }).props.strength).toBe(0.3);
    expect(createElement(Tilt, { maxTilt: 5 }).props.maxTilt).toBe(5);
    expect(
      createElement(Curtain, { active: true, title: "Pricing" }).props.active,
    ).toBe(true);
  });
});
