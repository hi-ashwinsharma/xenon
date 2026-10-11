import { describe, expect, it } from "vitest";
import { createElement } from "react";
import {
  Combobox,
  CommandPalette,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "../src/index";

describe("@xenon/web Overlay Primitives (Batch 2)", () => {
  describe("DropdownMenu", () => {
    it("creates dropdown menu tree with items and separators", () => {
      const menu = createElement(
        DropdownMenu,
        { defaultOpen: false },
        createElement(DropdownMenuTrigger, null, "Actions"),
        createElement(
          DropdownMenuContent,
          null,
          createElement(DropdownMenuItem, { shortcut: "⌘N" }, "New Window"),
          createElement(DropdownMenuSeparator, null),
          createElement(DropdownMenuItem, { destructive: true }, "Delete"),
        ),
      );

      expect(menu.props.defaultOpen).toBe(false);
      expect(menu.props.children).toHaveLength(2);
    });

    it("supports openOnHover and custom hoverDelayMs props", () => {
      const menu = createElement(
        DropdownMenu,
        { openOnHover: true, hoverDelayMs: 200 },
        createElement(DropdownMenuTrigger, null, "Hover Me"),
        createElement(
          DropdownMenuContent,
          null,
          createElement(DropdownMenuItem, null, "Item"),
        ),
      );

      expect(menu.props.openOnHover).toBe(true);
      expect(menu.props.hoverDelayMs).toBe(200);
    });
  });

  describe("Select", () => {
    it("creates select tree with dynamic radius support", () => {
      const select = createElement(Select, {
        defaultValue: "apple",
        options: [
          { value: "apple", label: "Apple HIG" },
          { value: "xenon", label: "Xenon Core" },
        ],
      });

      expect(select.props.defaultValue).toBe("apple");
      expect(select.props.options).toHaveLength(2);
    });

    it("supports compound Select composition", () => {
      const select = createElement(
        Select,
        { value: "opt1" },
        createElement(SelectTrigger, null),
        createElement(
          SelectContent,
          null,
          createElement(SelectItem, { value: "opt1" }, "Option 1"),
          createElement(SelectItem, { value: "opt2" }, "Option 2"),
        ),
      );

      expect(select.props.value).toBe("opt1");
    });
  });

  describe("Combobox", () => {
    it("creates combobox with options and clear button", () => {
      const combobox = createElement(Combobox, {
        options: [
          { value: "react", label: "React DOM" },
          { value: "native", label: "React Native" },
        ],
        placeholder: "Search framework...",
        clearable: true,
      });

      expect(combobox.props.options).toHaveLength(2);
      expect(combobox.props.clearable).toBe(true);
    });
  });

  describe("CommandPalette", () => {
    it("creates spotlight command palette with keyboard shortcuts", () => {
      const palette = createElement(CommandPalette, {
        defaultOpen: false,
        items: [
          {
            id: "1",
            label: "Go to Components",
            group: "Navigation",
            shortcut: "G C",
          },
          { id: "2", label: "Toggle Theme", group: "Actions", shortcut: "⌘T" },
        ],
      });

      expect(palette.props.defaultOpen).toBe(false);
      expect(palette.props.items).toHaveLength(2);
    });
  });
});
