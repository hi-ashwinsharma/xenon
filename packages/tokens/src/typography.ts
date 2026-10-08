import type { TextStyleKey, TypographyTokenDefinition } from "./tokens.types";

export const FONT_FAMILY =
  "Geist Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" as const;

export const FONT_FAMILY_MONO = "Geist Mono, monospace" as const;

export const TYPOGRAPHY_SCALE: Readonly<
  Record<TextStyleKey, TypographyTokenDefinition>
> = {
  display: {
    name: "display",
    weight: 200,
    native: { fontSize: 56, lineHeight: 60, letterSpacing: 0.006 },
    web: {
      fontSize: 64,
      lineHeight: 68,
      letterSpacing: 0.004,
      remSize: "4rem",
      remLineHeight: "4.25rem",
    },
  },
  largeTitle: {
    name: "largeTitle",
    weight: 200,
    native: { fontSize: 34, lineHeight: 41, letterSpacing: 0.012 },
    web: {
      fontSize: 40,
      lineHeight: 48,
      letterSpacing: 0.01,
      remSize: "2.5rem",
      remLineHeight: "3rem",
    },
  },
  title1: {
    name: "title1",
    weight: 200,
    native: { fontSize: 28, lineHeight: 34, letterSpacing: 0.014 },
    web: {
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: 0.013,
      remSize: "2rem",
      remLineHeight: "2.5rem",
    },
  },
  title2: {
    name: "title2",
    weight: 300,
    native: { fontSize: 22, lineHeight: 28, letterSpacing: -0.012 },
    web: {
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0.003,
      remSize: "1.5rem",
      remLineHeight: "2rem",
    },
  },
  title3: {
    name: "title3",
    weight: 300,
    native: { fontSize: 20, lineHeight: 25, letterSpacing: -0.023 },
    web: {
      fontSize: 20,
      lineHeight: 28,
      letterSpacing: -0.023,
      remSize: "1.25rem",
      remLineHeight: "1.75rem",
    },
  },
  headline: {
    name: "headline",
    weight: 400,
    native: { fontSize: 17, lineHeight: 22, letterSpacing: -0.026 },
    web: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: -0.02,
      remSize: "1rem",
      remLineHeight: "1.5rem",
    },
  },
  body: {
    name: "body",
    weight: 300,
    native: { fontSize: 17, lineHeight: 22, letterSpacing: -0.026 },
    web: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: -0.02,
      remSize: "1rem",
      remLineHeight: "1.5rem",
    },
  },
  callout: {
    name: "callout",
    weight: 300,
    native: { fontSize: 16, lineHeight: 21, letterSpacing: -0.02 },
    web: {
      fontSize: 15,
      lineHeight: 22,
      letterSpacing: -0.016,
      remSize: "0.9375rem",
      remLineHeight: "1.375rem",
    },
  },
  subhead: {
    name: "subhead",
    weight: 300,
    native: { fontSize: 15, lineHeight: 20, letterSpacing: -0.016 },
    web: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: -0.011,
      remSize: "0.875rem",
      remLineHeight: "1.25rem",
    },
  },
  footnote: {
    name: "footnote",
    weight: 300,
    native: { fontSize: 13, lineHeight: 18, letterSpacing: -0.006 },
    web: {
      fontSize: 13,
      lineHeight: 18,
      letterSpacing: -0.006,
      remSize: "0.8125rem",
      remLineHeight: "1.125rem",
    },
  },
  caption1: {
    name: "caption1",
    weight: 400,
    native: { fontSize: 12, lineHeight: 16, letterSpacing: 0 },
    web: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
      remSize: "0.75rem",
      remLineHeight: "1rem",
    },
  },
  caption2: {
    name: "caption2",
    weight: 400,
    native: { fontSize: 11, lineHeight: 13, letterSpacing: 0.006 },
    web: {
      fontSize: 11,
      lineHeight: 14,
      letterSpacing: 0.006,
      remSize: "0.6875rem",
      remLineHeight: "0.875rem",
    },
  },
} as const;
