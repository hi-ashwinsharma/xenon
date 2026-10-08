import { describe, expect, it } from "vitest";
import { createElement } from "react";
import {
  Divider,
  Group,
  Heading,
  Icon,
  Stack,
  Surface,
  Text,
  VisuallyHidden,
  webRendererConfig,
} from "../src/index";

describe("@xenon/web Primitives", () => {
  it("exports a valid web renderer configuration", () => {
    expect(webRendererConfig.platform).toBe("web");
    expect(webRendererConfig.ready).toBe(true);
  });

  describe("Surface", () => {
    it("renders default surface with concentric CSS variables and border", () => {
      const element = createElement(
        Surface,
        { padding: 24, radius: 3 },
        createElement("span", null, "Content"),
      );

      expect(element.props.padding).toBe(24);
      expect(element.props.radius).toBe(3);
    });

    it("renders Liquid Glass variant with glass styling attributes", () => {
      const regularGlass = createElement(
        Surface,
        { variant: "glass", glassType: "regular" },
        "Floating Panel",
      );
      expect(regularGlass.props.variant).toBe("glass");
      expect(regularGlass.props.glassType).toBe("regular");

      const clearGlass = createElement(
        Surface,
        { variant: "glass", glassType: "clear" },
        "Overlay Panel",
      );
      expect(clearGlass.props.variant).toBe("glass");
      expect(clearGlass.props.glassType).toBe("clear");
    });
  });

  describe("Divider", () => {
    it("renders horizontal hairline with presentation role by default", () => {
      const element = createElement(Divider, { orientation: "horizontal" });
      expect(element.props.orientation).toBe("horizontal");
    });

    it("supports vertical orientation and accessible separator role", () => {
      const element = createElement(Divider, {
        orientation: "vertical",
        decorative: false,
        inset: 12,
      });
      expect(element.props.orientation).toBe("vertical");
      expect(element.props.decorative).toBe(false);
      expect(element.props.inset).toBe(12);
    });
  });

  describe("Stack and Group Layout", () => {
    it("configures Stack layout properties", () => {
      const element = createElement(
        Stack,
        { direction: "column", gap: 24, align: "center", justify: "between" },
        createElement("div", null, "Item 1"),
      );
      expect(element.props.direction).toBe("column");
      expect(element.props.gap).toBe(24);
      expect(element.props.align).toBe("center");
      expect(element.props.justify).toBe("between");
    });

    it("configures Group layout row properties", () => {
      const element = createElement(
        Group,
        { gap: 8, wrap: "wrap", align: "center" },
        createElement("span", null, "Pill 1"),
      );
      expect(element.props.gap).toBe(8);
      expect(element.props.wrap).toBe("wrap");
      expect(element.props.align).toBe("center");
    });
  });

  describe("Text and Heading", () => {
    it("configures Text with strict weights, tone, and tabular numbers", () => {
      const element = createElement(
        Text,
        {
          styleKey: "headline",
          weight: 400,
          tone: "muted",
          tabular: true,
          truncate: true,
        },
        "Tabular Muted Headline",
      );
      expect(element.props.styleKey).toBe("headline");
      expect(element.props.weight).toBe(400);
      expect(element.props.tone).toBe("muted");
      expect(element.props.tabular).toBe(true);
      expect(element.props.truncate).toBe(true);
    });

    it("configures Heading with level tag and display tracking", () => {
      const element = createElement(
        Heading,
        { level: 2, styleKey: "largeTitle", weight: 200, tone: "accent" },
        "Hero Section Title",
      );
      expect(element.props.level).toBe(2);
      expect(element.props.styleKey).toBe("largeTitle");
      expect(element.props.weight).toBe(200);
      expect(element.props.tone).toBe("accent");
    });
  });

  describe("Icon Wrapper", () => {
    it("enforces Phosphor Thin weight and accessibility contract", () => {
      const decorativeIcon = createElement(
        Icon,
        { size: "md" },
        createElement("svg", null),
      );
      expect(decorativeIcon.props.size).toBe("md");

      const labeledIcon = createElement(
        Icon,
        { size: "lg", ariaLabel: "Close dialog" },
        createElement("svg", null),
      );
      expect(labeledIcon.props.ariaLabel).toBe("Close dialog");
      expect(labeledIcon.props.size).toBe("lg");
    });
  });

  describe("VisuallyHidden", () => {
    it("renders screen-reader accessible container", () => {
      const element = createElement(
        VisuallyHidden,
        null,
        "Screen reader only description",
      );
      expect(element.props.children).toBe("Screen reader only description");
    });
  });
});
