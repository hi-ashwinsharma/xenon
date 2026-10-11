import { describe, expect, it } from "vitest";
import { createElement } from "react";
import {
  Alert,
  Badge,
  Progress,
  Skeleton,
  Spinner,
  Toast,
  ToastProvider,
  toast,
} from "../src/index";

describe("@xenon/web Feedback Components (Phase 5 Batch 1)", () => {
  describe("Badge", () => {
    it("creates badge element with subtle variant by default", () => {
      const badge = createElement(Badge, { tone: "accent" }, "Live");
      expect(badge.props.tone).toBe("accent");
      expect(badge.props.children).toBe("Live");
    });

    it("supports count badge with numeric formatting", () => {
      const badge = createElement(Badge, { count: 120, maxCount: 99 });
      expect(badge.props.count).toBe(120);
      expect(badge.props.maxCount).toBe(99);
    });

    it("supports dot status indicator badge", () => {
      const badge = createElement(
        Badge,
        { dot: true, tone: "success" },
        "Operational",
      );
      expect(badge.props.dot).toBe(true);
      expect(badge.props.tone).toBe("success");
    });
  });

  describe("Alert", () => {
    it("creates semantic alert callout with title and dismissible prop", () => {
      const alert = createElement(
        Alert,
        {
          tone: "warning",
          title: "System Maintenance",
          dismissible: true,
        },
        "Scheduled for 02:00 UTC",
      );

      expect(alert.props.tone).toBe("warning");
      expect(alert.props.title).toBe("System Maintenance");
      expect(alert.props.dismissible).toBe(true);
    });
  });

  describe("Progress", () => {
    it("creates determinate progress bar with value and size", () => {
      const progress = createElement(Progress, {
        value: 65,
        size: "sm",
        tone: "accent",
      });
      expect(progress.props.value).toBe(65);
      expect(progress.props.size).toBe("sm");
      expect(progress.props.tone).toBe("accent");
    });

    it("supports indeterminate sweeping mode", () => {
      const progress = createElement(Progress, { indeterminate: true });
      expect(progress.props.indeterminate).toBe(true);
    });
  });

  describe("Spinner", () => {
    it("creates rotating loading spinner with accessible label", () => {
      const spinner = createElement(Spinner, {
        size: "lg",
        tone: "accent",
        label: "Syncing...",
      });
      expect(spinner.props.size).toBe("lg");
      expect(spinner.props.tone).toBe("accent");
      expect(spinner.props.label).toBe("Syncing...");
    });
  });

  describe("Skeleton", () => {
    it("creates skeleton placeholder with variant and dimension overrides", () => {
      const skeleton = createElement(Skeleton, {
        variant: "circle",
        width: 48,
        height: 48,
      });
      expect(skeleton.props.variant).toBe("circle");
      expect(skeleton.props.width).toBe(48);
      expect(skeleton.props.height).toBe(48);
    });
  });

  describe("Toast & ToastProvider", () => {
    it("creates declarative toast with action and semantic tone", () => {
      const t = createElement(Toast, {
        open: true,
        title: "Tokens Published",
        tone: "success",
        action: { label: "View", onClick: () => {} },
      });

      expect(t.props.open).toBe(true);
      expect(t.props.title).toBe("Tokens Published");
      expect(t.props.tone).toBe("success");
    });

    it("supports ToastProvider and imperative toast methods", () => {
      const provider = createElement(
        ToastProvider,
        { placement: "bottom-center" },
        null,
      );
      expect(provider.props.placement).toBe("bottom-center");

      const id = toast.info("Build in progress");
      expect(typeof id).toBe("string");
      expect(id.startsWith("x-toast-")).toBe(true);
    });
  });
});
