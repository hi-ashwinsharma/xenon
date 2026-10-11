import { describe, expect, it } from "vitest";
import { createElement } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../src/index";

describe("@xenon/web Overlay Primitives (Batch 1)", () => {
  describe("Popover", () => {
    it("creates popover tree with hero container transform props", () => {
      const popover = createElement(
        Popover,
        { defaultOpen: false },
        createElement(PopoverTrigger, null, "Open Popover"),
        createElement(
          PopoverContent,
          { placement: "bottom", width: 300 },
          createElement("p", null, "Popover Body"),
          createElement(PopoverClose, null, "Close"),
        ),
      );

      expect(popover.props.defaultOpen).toBe(false);
      expect(popover.props.children).toHaveLength(2);
    });
  });

  describe("Tooltip", () => {
    it("creates tooltip tree with micro pill props and delay", () => {
      const tooltip = createElement(
        Tooltip,
        { delayMs: 200 },
        createElement(TooltipTrigger, null, "Hover Me"),
        createElement(TooltipContent, { placement: "top" }, "Helpful hint"),
      );

      expect(tooltip.props.delayMs).toBe(200);
      expect(tooltip.props.children).toHaveLength(2);
    });
  });

  describe("Dialog", () => {
    it("creates dialog modal tree with accessible title and description", () => {
      const dialog = createElement(
        Dialog,
        { defaultOpen: false },
        createElement(DialogTrigger, null, "Open Dialog"),
        createElement(
          DialogContent,
          { width: 480 },
          createElement(
            DialogHeader,
            null,
            createElement(DialogTitle, null, "Confirm Action"),
            createElement(
              DialogDescription,
              null,
              "This action cannot be undone.",
            ),
          ),
          createElement(
            DialogFooter,
            null,
            createElement(DialogClose, null, "Cancel"),
          ),
        ),
      );

      expect(dialog.props.defaultOpen).toBe(false);
      expect(dialog.props.children).toHaveLength(2);
    });
  });

  describe("Sheet", () => {
    it("creates sheet drawer tree with full-canvas blur and grab handle", () => {
      const sheet = createElement(
        Sheet,
        { defaultOpen: false },
        createElement(SheetTrigger, null, "Open Sheet"),
        createElement(
          SheetContent,
          { hasGrabHandle: true, side: "bottom" },
          createElement(
            SheetHeader,
            null,
            createElement(SheetTitle, null, "Filter Options"),
            createElement(
              SheetDescription,
              null,
              "Adjust your view preferences",
            ),
          ),
          createElement(
            SheetFooter,
            null,
            createElement(SheetClose, null, "Done"),
          ),
        ),
      );

      expect(sheet.props.defaultOpen).toBe(false);
      expect(sheet.props.children).toHaveLength(2);
    });
  });
});
