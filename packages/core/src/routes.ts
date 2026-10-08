import type { AppRoutesMap } from "./core.types.js";

export const AppRoutes: AppRoutesMap = {
  home: "/",
  docs: "/docs",
  components: "/docs/components",
  guidelines: "/docs/guidelines",
  blog: "/blog",
} as const;
