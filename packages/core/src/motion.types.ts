import type { ReactNode } from "react";

/** One glyph of a formatted number: a rolling digit column or a static character. */
export type OdometerGlyph =
  | { readonly kind: "digit"; readonly digit: number }
  | { readonly kind: "char"; readonly char: string };

export interface OdometerProps {
  /** The number the digit columns roll to */
  readonly value: number;
  /** Static text before the number, such as a currency sign */
  readonly prefix?: string;
  /** BCP 47 locale used to group digits. Default: 'en-US' */
  readonly locale?: string;
  /** Position in a staggered sequence: each step waits one `--x-dur-instant`. Default: 0 */
  readonly order?: number;
  readonly className?: string;
}

export interface TextRollProps {
  /** The current word. A new value rolls the old word up and out and the new one in from below */
  readonly value: string;
  readonly className?: string;
}

export interface FlipCardProps {
  /** Face shown at rest */
  readonly front: ReactNode;
  /** Face shown once flipped */
  readonly back: ReactNode;
  /** Accessible name of the card, announced with its flipped state */
  readonly label: string;
  /** Controlled flipped state */
  readonly flipped?: boolean;
  /** Uncontrolled initial state. Default: false */
  readonly defaultFlipped?: boolean;
  readonly onFlippedChange?: (flipped: boolean) => void;
  readonly className?: string;
}

export interface CurtainProps {
  /** Starting a run wipes the curtain up over the screen, then away */
  readonly active: boolean;
  /** Large title shown while the screen is covered, usually the destination name */
  readonly title?: ReactNode;
  /** Runs once the screen is fully covered: swap the route or content here */
  readonly onCovered?: () => void;
  /** Runs when the curtain has fully left the screen */
  readonly onFinished?: () => void;
  readonly className?: string;
}

export interface SegmentedProgressProps {
  /** Number of segments. Default: 6 */
  readonly segments?: number;
  /** Overall progress from 0 to 1; segments fill one after another */
  readonly value: number;
  /** Accessible name. Default: 'Progress' */
  readonly label?: string;
  readonly className?: string;
}

export interface LiquidTextProps {
  /** The word that fills up. Keep it short: a wordmark or a single number */
  readonly children: string;
  /**
   * Fill level from 0 to 1. Leave it out on web to fill with the reader's scroll
   * as the word travels up the viewport.
   */
  readonly progress?: number;
  readonly className?: string;
}

export interface MagneticProps {
  /** Share of the pointer's distance from centre the child follows, 0 to 1. Default: 0.22 */
  readonly strength?: number;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface TiltProps {
  /** Largest tilt on each axis, in degrees. Default: 3 */
  readonly maxTilt?: number;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface WordRevealProps {
  /** Text split into words that rise into place one after another */
  readonly text: string;
  /** Position in a staggered sequence: each step waits one `--x-dur-instant`. Default: 0 */
  readonly order?: number;
  readonly className?: string;
}

export interface ScrollTrackProps {
  /** Cards laid out in one horizontal row */
  readonly children?: ReactNode;
  /** Accessible name of the row. Default: 'Scrolling row' */
  readonly label?: string;
  readonly className?: string;
}

export interface ScrollConvergeProps {
  /** Smallest width an item may shrink to before wrapping, in px. Default: 240 */
  readonly minItemWidth?: number;
  /** Space between items, in px. Default: 16 */
  readonly gap?: number;
  /** How far apart items start, as a share of their distance from the grid's centre. Default: 0.55 */
  readonly spread?: number;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface ScrollMarqueeProps {
  /** Items in the moving line; the line repeats them to fill the width */
  readonly items: readonly ReactNode[];
  /** Pixels the line travels per pixel scrolled. Default: 0.6 */
  readonly speed?: number;
  /** Accessible name. Default: 'Highlights' */
  readonly label?: string;
  readonly className?: string;
}

export interface ScrollStoryStep {
  /** Stable key for the step */
  readonly id: string;
  readonly title: ReactNode;
  readonly body?: ReactNode;
  /** What the pinned stage shows while this step is centred */
  readonly visual: ReactNode;
}

export interface ScrollStoryProps {
  readonly steps: readonly ScrollStoryStep[];
  /** Accessible name. Default: 'Story' */
  readonly label?: string;
  readonly className?: string;
}

export interface NavLensItem {
  /** Id of the page section this link points at */
  readonly sectionId: string;
  readonly label: string;
  readonly href: string;
}

export interface NavLensProps {
  readonly items: readonly NavLensItem[];
  /** Accessible name. Default: 'Sections' */
  readonly label?: string;
  readonly className?: string;
}

export interface CircleRevealOrigin {
  readonly x: number;
  readonly y: number;
}

/** Runs `update` (a theme, accent or content change) behind a circular wipe from `origin`. */
export type CircleRevealRun = (
  update: () => void,
  origin?: CircleRevealOrigin,
) => void;

export interface MagneticOffset {
  readonly x: number;
  readonly y: number;
}

export interface TiltAngles {
  readonly rotateX: number;
  readonly rotateY: number;
}
