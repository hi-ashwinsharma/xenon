import type { AppRoutesMap } from "./core.types";

export const AppRoutes: AppRoutesMap = {
  home: "/",
  launch: "/launch",
  docs: "/docs",
  components: "/docs/components",
  guidelines: "/docs/guidelines",
  blog: "/blog",
  llms: "/llms.txt",
  llmsFull: "/llms-full.txt",
  registry: "/r",
} as const;
