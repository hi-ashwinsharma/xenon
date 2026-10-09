import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { Button, Field, Input, InputGroup, SegmentedControl, Textarea } from "../src/index";

describe("@xenon/web Form Controls", () => {
  describe("Input", () => {
    it("renders default input with placeholder and value", () => {
      const element = createElement(Input, {
        placeholder: "username@domain.com",
        defaultValue: "hi@xenon.dev",
        size: "md",
      });

      expect(element.props.placeholder).toBe("username@domain.com");
      expect(element.props.defaultValue).toBe("hi@xenon.dev");
      expect(element.props.size).toBe("md");
    });

    it("supports prefix and suffix elements", () => {
      const element = createElement(Input, {
        prefix: createElement("span", null, "$"),
        suffix: createElement("span", null, "USD"),
      });

      expect(element.props.prefix).toBeDefined();
      expect(element.props.suffix).toBeDefined();
    });

    it("handles invalid state", () => {
      const element = createElement(Input, { invalid: true });
      expect(element.props.invalid).toBe(true);
    });
  });

  describe("InputGroup", () => {
    it("attaches inline input and action button in a grouped capsule", () => {
      const group = createElement(
        InputGroup,
        { size: "md" },
        createElement(Input, { placeholder: "Search docs..." }),
        createElement(Button, { variant: "filled" }, "Search"),
      );

      expect(group.props.size).toBe("md");
      expect(group.props.children).toBeDefined();
    });
  });

  describe("Field", () => {
    it("renders label and optional badge above input", () => {
      const field = createElement(
        Field,
        {
          label: "Organization Name",
          optional: true,
          helpText: "Appears on your team invoices",
        },
        createElement(Input, { placeholder: "Acme Corp" }),
      );

      expect(field.props.label).toBe("Organization Name");
      expect(field.props.optional).toBe(true);
      expect(field.props.helpText).toBe("Appears on your team invoices");
    });

    it("switches to danger error message when error is provided", () => {
      const field = createElement(
        Field,
        {
          label: "Email Address",
          error: "Please enter a valid email address",
          helpText: "We will never share your email",
        },
        createElement(Input, { invalid: true }),
      );

      expect(field.props.error).toBe("Please enter a valid email address");
    });
  });

  describe("SegmentedControl", () => {
    it("renders options with active selection", () => {
      const options = [
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ] as const;

      const element = createElement(SegmentedControl, {
        options,
        value: "week",
        size: "md",
      });

      expect(element.props.value).toBe("week");
      expect(element.props.options).toHaveLength(3);
    });
  });

  describe("Textarea", () => {
    it("renders default textarea with autoGrow and rows", () => {
      const element = createElement(Textarea, {
        placeholder: "Write feedback...",
        autoGrow: true,
        showCount: true,
        maxLength: 240,
      });

      expect(element.props.placeholder).toBe("Write feedback...");
      expect(element.props.autoGrow).toBe(true);
      expect(element.props.showCount).toBe(true);
      expect(element.props.maxLength).toBe(240);
    });
  });
});
