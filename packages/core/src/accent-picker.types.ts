import type { Accent } from "@xenon/tokens";

export interface AccentPickerProps {
  readonly value: Accent;
  readonly onValueChange: (accent: Accent) => void;
  /** Accessible name of the group. Default: 'Accent' */
  readonly label?: string;
  readonly className?: string;
}
