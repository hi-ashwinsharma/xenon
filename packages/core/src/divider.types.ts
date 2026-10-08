export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  readonly orientation?: DividerOrientation;
  readonly inset?: boolean | number;
  readonly decorative?: boolean;
  readonly className?: string;
}
