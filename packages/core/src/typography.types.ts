import type { ReactNode } from "react";
import type { FontWeight, TextStyleKey } from "@xenon/tokens";

export type TextTone =
  "default" | "muted" | "accent" | "danger" | "warning" | "success" | "info";

export type TextElementTag = "p" | "span" | "div" | "label";

export interface TextProps {
  readonly styleKey?: TextStyleKey;
  readonly weight?: FontWeight;
  readonly tone?: TextTone;
  readonly tabular?: boolean;
  readonly align?: "left" | "center" | "right";
  readonly truncate?: boolean;
  readonly as?: TextElementTag;
  readonly children?: ReactNode;
  readonly className?: string;
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingStyleKey =
  "display" | "largeTitle" | "title1" | "title2" | "title3";

export interface HeadingProps {
  readonly level?: HeadingLevel;
  readonly styleKey?: HeadingStyleKey;
  readonly weight?: FontWeight;
  readonly tone?: TextTone;
  readonly align?: "left" | "center" | "right";
  readonly children?: ReactNode;
  readonly className?: string;
}
