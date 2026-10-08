import { describe, expect, it } from "vitest";
import { AppRoutes } from "../src/routes";

describe("AppRoutes", () => {
  it("defines standard application routes starting with a slash", () => {
    expect(AppRoutes.home.startsWith("/")).toBe(true);
    expect(AppRoutes.docs.startsWith("/")).toBe(true);
    expect(AppRoutes.components.startsWith("/")).toBe(true);
    expect(AppRoutes.guidelines.startsWith("/")).toBe(true);
    expect(AppRoutes.blog.startsWith("/")).toBe(true);
  });
});
