import type { NativeAmbientProps } from "./native.types";

/**
 * Native has no gradient primitive without an extra dependency, and the ambient layer is
 * a web showcase treatment, so native renders nothing.
 */
export function Ambient(_props: NativeAmbientProps): null {
  return null;
}
