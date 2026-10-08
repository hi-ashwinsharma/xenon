import type { WebRendererConfig } from "./web.types.js";

export type { WebRendererConfig };

export const webRendererConfig: WebRendererConfig = {
  platform: "web",
  ready: true,
} as const;
