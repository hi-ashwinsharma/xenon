import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { Button, Field, Input, InputGroup } from "../src/index.js";

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
});
