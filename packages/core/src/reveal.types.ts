import type { ReactNode } from "react";

export interface RevealProps {
  /** Position in a staggered sequence: each step waits one `--x-dur-instant`. Default: 0 */
  readonly order?: number;
  readonly children?: ReactNode;
  readonly className?: string;
}
