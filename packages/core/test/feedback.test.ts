import { beforeEach, describe, expect, it } from "vitest";
import { clampProgress, formatBadgeCount } from "../src/feedback.utils";
import { toast } from "../src/toast-store";

describe("Feedback Core Utilities", () => {
  describe("formatBadgeCount", () => {
    it("formats standard counts below maxCount", () => {
      expect(formatBadgeCount(5)).toBe("5");
      expect(formatBadgeCount(42)).toBe("42");
    });

    it("clamps counts above maxCount with plus sign", () => {
      expect(formatBadgeCount(100, 99)).toBe("99+");
      expect(formatBadgeCount(1000, 99)).toBe("99+");
      expect(formatBadgeCount(15, 9)).toBe("9+");
    });

    it("returns 0 for zero and negative counts", () => {
      expect(formatBadgeCount(0)).toBe("0");
      expect(formatBadgeCount(-5)).toBe("0");
    });
  });

  describe("clampProgress", () => {
    it("clamps values between 0 and 100", () => {
      expect(clampProgress(45)).toBe(45);
      expect(clampProgress(-10)).toBe(0);
      expect(clampProgress(120)).toBe(100);
      expect(clampProgress(NaN)).toBe(0);
    });
  });

  describe("ToastStore", () => {
    beforeEach(() => {
      toast.clear();
    });

    it("adds and dismisses toasts", () => {
      let currentToasts = toast.getToasts();
      const unsub = toast.subscribe((toasts) => {
        currentToasts = toasts;
      });

      const id = toast.show("Deployment started");
      expect(currentToasts).toHaveLength(1);
      expect(currentToasts[0].title).toBe("Deployment started");
      expect(currentToasts[0].id).toBe(id);

      toast.dismiss(id);
      expect(currentToasts).toHaveLength(0);

      unsub();
    });

    it("supports semantic helpers success, error, info, warning", () => {
      toast.success("Saved");
      toast.error("Network Failed");
      toast.info("Update Available");
      toast.warning("Low Storage");

      const list = toast.getToasts();
      expect(list).toHaveLength(4);
      expect(list[0].tone).toBe("success");
      expect(list[1].tone).toBe("danger");
      expect(list[2].tone).toBe("info");
      expect(list[3].tone).toBe("warning");
    });
  });
});
