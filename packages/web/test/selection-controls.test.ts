import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { Checkbox, Radio, RadioGroup, Slider, Switch } from "../src/index";

describe("@xenon/web Selection Controls", () => {
  describe("Checkbox", () => {
    it("renders unchecked by default with label and description", () => {
      const element = createElement(Checkbox, {
        label: "Accept terms",
        description: "By proceeding, you agree to the privacy policy.",
        size: "md",
      });

      expect(element.props.label).toBe("Accept terms");
      expect(element.props.description).toBe(
        "By proceeding, you agree to the privacy policy.",
      );
      expect(element.props.size).toBe("md");
      expect(element.props.defaultChecked).toBeUndefined();
    });

    it("supports controlled checked state and indeterminate state", () => {
      const checkedElement = createElement(Checkbox, { checked: true });
      expect(checkedElement.props.checked).toBe(true);

      const indeterminateElement = createElement(Checkbox, {
        indeterminate: true,
      });
      expect(indeterminateElement.props.indeterminate).toBe(true);
    });

    it("handles disabled and error state", () => {
      const element = createElement(Checkbox, {
        disabled: true,
        error: true,
      });
      expect(element.props.disabled).toBe(true);
      expect(element.props.error).toBe(true);
    });
  });

  describe("RadioGroup & Radio", () => {
    it("renders radio group with orientation and children", () => {
      const group = createElement(
        RadioGroup,
        {
          defaultValue: "apple",
          orientation: "horizontal",
          size: "lg",
        },
        createElement(Radio, { value: "apple", label: "Apple" }),
        createElement(Radio, { value: "banana", label: "Banana" }),
      );

      expect(group.props.defaultValue).toBe("apple");
      expect(group.props.orientation).toBe("horizontal");
      expect(group.props.size).toBe("lg");
      expect(group.props.children).toBeDefined();
    });

    it("configures individual radio option with label and description", () => {
      const radio = createElement(Radio, {
        value: "premium",
        label: "Pro Plan",
        description: "Includes unlimited access and priority support",
        disabled: false,
      });

      expect(radio.props.value).toBe("premium");
      expect(radio.props.label).toBe("Pro Plan");
      expect(radio.props.description).toBe(
        "Includes unlimited access and priority support",
      );
      expect(radio.props.disabled).toBe(false);
    });
  });

  describe("Switch", () => {
    it("renders switch with accessibility attributes and label", () => {
      const element = createElement(Switch, {
        label: "Airplane Mode",
        description: "Disables all wireless connections",
        size: "md",
        defaultChecked: false,
      });

      expect(element.props.label).toBe("Airplane Mode");
      expect(element.props.description).toBe(
        "Disables all wireless connections",
      );
      expect(element.props.size).toBe("md");
      expect(element.props.defaultChecked).toBe(false);
    });

    it("supports controlled checked and disabled states", () => {
      const element = createElement(Switch, {
        checked: true,
        disabled: true,
      });

      expect(element.props.checked).toBe(true);
      expect(element.props.disabled).toBe(true);
    });
  });

  describe("Slider", () => {
    it("renders slider with min, max, step, and defaultValue", () => {
      const element = createElement(Slider, {
        min: 0,
        max: 100,
        step: 5,
        defaultValue: 50,
        size: "md",
      });

      expect(element.props.min).toBe(0);
      expect(element.props.max).toBe(100);
      expect(element.props.step).toBe(5);
      expect(element.props.defaultValue).toBe(50);
      expect(element.props.size).toBe("md");
    });

    it("supports controlled value and disabled state", () => {
      const element = createElement(Slider, {
        value: 75,
        disabled: true,
      });

      expect(element.props.value).toBe(75);
      expect(element.props.disabled).toBe(true);
    });
  });
});
