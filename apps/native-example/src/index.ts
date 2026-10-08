import type { ExampleAppConfig } from "./native-example.types.js";

export type { ExampleAppConfig };

export const exampleConfig: ExampleAppConfig = {
  appName: "Xenon Native Example",
} as const;
