import type { ReactElement } from "react";
import type { NativeScrollProgressProps } from "./native.types";

/** Native screens own their scroll views and progress, so this renders nothing. */
export function ScrollProgress(
  _props: NativeScrollProgressProps,
): ReactElement | null {
  return null;
}
