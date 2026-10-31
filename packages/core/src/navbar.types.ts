import type { ReactNode } from "react";
import type { LiquidGlassVariant } from "@xenon/tokens";

export interface NavbarProps {
  /** Left slot: Logo, product title, or brand mark */
  readonly brand?: ReactNode;
  /** Center slot: Navigation links, tabs, or search trigger */
  readonly nav?: ReactNode;
  /** Right slot: Action buttons, theme toggle, avatar, etc. */
  readonly actions?: ReactNode;
  /** Inner content override when slots are not used directly */
  readonly children?: ReactNode;
  /** Sticky positioning at viewport top (default: true) */
  readonly sticky?: boolean;
  /** Scroll distance in pixels to trigger adaptive glass transition (default: 10) */
  readonly threshold?: number;
  /** Hairline border at the bottom when scrolled/active (default: true) */
  readonly bordered?: boolean;
  /** Maximum inner container width in pixels or CSS value (default: 1280) */
  readonly maxWidth?: number | string;
  /** Where the nav slot sits: beside the brand or centered in the bar (default: 'center') */
  readonly navAlign?: "start" | "center";
  /** When the glass material engages: past `threshold`, or permanently (default: 'scroll') */
  readonly glass?: "scroll" | "always";
  /** Folds nav and actions behind a menu button on narrow viewports (default: false) */
  readonly collapsible?: boolean;
  readonly className?: string;
}

export interface GlassBarProps {
  /** Variant of Liquid Glass: 'regular' (default) or 'clear' */
  readonly glassType?: LiquidGlassVariant;
  /** Left slot */
  readonly brand?: ReactNode;
  /** Center slot */
  readonly nav?: ReactNode;
  /** Right slot */
  readonly actions?: ReactNode;
  /** Inner content override */
  readonly children?: ReactNode;
  /** Sticky positioning at top (default: true) */
  readonly sticky?: boolean;
  /** Continuous bottom hairline border (default: true) */
  readonly bordered?: boolean;
  /** Maximum inner container width in pixels or CSS value (default: 1280) */
  readonly maxWidth?: number | string;
  readonly className?: string;
}
