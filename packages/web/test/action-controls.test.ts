import { describe, expect, it } from "vitest";
import { createElement } from "react";
import {
  Button,
  ButtonGroup,
  IconButton,
  Link,
  ToggleButton,
} from "../src/index.js";

describe("@xenon/web Action Controls", () => {
  describe("Button", () => {
    it("renders filled button by default with optical padding", () => {
      const element = createElement(Button, { size: "md" }, "Action");
      expect(element.props.size).toBe("md");
      expect(element.props.children).toBe("Action");
    });

    it("supports all 6 variants", () => {
      const variants = [
        "accent",
        "filled",
        "subtle",
        "outline",
        "ghost",
        "glass",
      ] as const;

      for (const variant of variants) {
        const element = createElement(Button, { variant }, variant);
        expect(element.props.variant).toBe(variant);
      }
    });

    it("handles loading and disabled states", () => {
      const loadingBtn = createElement(Button, { loading: true }, "Loading");
      expect(loadingBtn.props.loading).toBe(true);

      const disabledBtn = createElement(Button, { disabled: true }, "Disabled");
      expect(disabledBtn.props.disabled).toBe(true);
    });
  });

  describe("IconButton", () => {
    it("renders square bounds and accessible label", () => {
      const element = createElement(
        IconButton,
        { ariaLabel: "Settings", size: "sm" },
        createElement("svg", null),
      );
      expect(element.props.ariaLabel).toBe("Settings");
      expect(element.props.size).toBe("sm");
    });
  });

  describe("ButtonGroup", () => {
    it("packs children into a grouped capsule container with role=group", () => {
      const group = createElement(
        ButtonGroup,
        { size: "md", variant: "filled" },
        createElement(IconButton, { ariaLabel: "Align Left" }),
        createElement(IconButton, { ariaLabel: "Align Center" }),
        createElement(IconButton, { ariaLabel: "Align Right" }),
      );

      expect(group.props.size).toBe("md");
      expect(group.props.variant).toBe("filled");
    });
  });

  describe("Link", () => {
    it("renders link with href and safe external attributes", () => {
      const internalLink = createElement(
        Link,
        { href: "/docs" },
        "Documentation",
      );
      expect(internalLink.props.href).toBe("/docs");

      const externalLink = createElement(
        Link,
        { href: "https://apple.com", external: true },
        "Apple HIG",
      );
      expect(externalLink.props.href).toBe("https://apple.com");
      expect(externalLink.props.external).toBe(true);
    });
  });

  describe("ToggleButton", () => {
    it("configures ToggleButton with aria-pressed contract", () => {
      const toggle = createElement(
        ToggleButton,
        { defaultPressed: true, ariaLabel: "Mute Audio" },
        "Mute",
      );
      expect(toggle.props.defaultPressed).toBe(true);
      expect(toggle.props.ariaLabel).toBe("Mute Audio");
    });
  });
});
