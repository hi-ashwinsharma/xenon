import type { ReactNode } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "rounded";
export type AvatarStatus = "online" | "offline" | "busy" | "away";
export type AvatarStatusPlacement = "bottom-right" | "top-right";

export interface AvatarProps {
  readonly src?: string;
  readonly alt?: string;
  readonly name?: string;
  readonly fallback?: ReactNode;
  readonly size?: AvatarSize;
  readonly shape?: AvatarShape;
  readonly status?: AvatarStatus;
  readonly statusPlacement?: AvatarStatusPlacement;
  readonly onError?: () => void;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface AvatarGroupProps {
  readonly max?: number;
  readonly size?: AvatarSize;
  readonly spacing?: "tight" | "normal" | "loose";
  readonly children: ReactNode;
  readonly className?: string;
}
