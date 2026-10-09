import { useEffect } from "react";

export interface UseClickOutsideOptions {
  enabled: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
  triggerRef?: React.RefObject<HTMLElement | null>;
  onClickOutside: () => void;
}

/**
 * Detects pointer and click interactions outside the specified container ref and trigger ref.
 */
export function useClickOutside({
  enabled,
  containerRef,
  triggerRef,
  onClickOutside,
}: UseClickOutsideOptions): void {
  useEffect(() => {
    if (!enabled) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      const container = containerRef.current;
      const trigger = triggerRef?.current;

      if (container && container.contains(target)) return;
      if (trigger && trigger.contains(target)) return;

      onClickOutside();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [enabled, containerRef, triggerRef, onClickOutside]);
}
