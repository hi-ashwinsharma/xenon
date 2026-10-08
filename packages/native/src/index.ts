import type { NativeRendererConfig } from "./native.types.js";

export type { NativeRendererConfig };

export const nativeRendererConfig: NativeRendererConfig = {
  platform: "native",
  ready: true,
} as const;
