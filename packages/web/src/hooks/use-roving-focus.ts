import { useEffect, useState } from "react";

export interface UseRovingFocusOptions {
  enabled: boolean;
  itemCount: number;
  initialIndex?: number;
  disabledIndices?: number[];
  loop?: boolean;
  onSelect?: (index: number) => void;
  onEscape?: () => void;
}

export interface UseRovingFocusReturn {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

export function useRovingFocus({
  enabled,
  itemCount,
  initialIndex = 0,
  disabledIndices = [],
  loop = true,
  onSelect,
  onEscape,
}: UseRovingFocusOptions): UseRovingFocusReturn {
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);

  useEffect(() => {
    if (enabled) {
      // Find first non-disabled item
      let firstValid = initialIndex;
      while (
        disabledIndices.includes(firstValid) &&
        firstValid < itemCount - 1
      ) {
        firstValid++;
      }
      setActiveIndex(firstValid);
    }
  }, [enabled, itemCount, initialIndex]);

  const getNextIndex = (current: number, direction: 1 | -1): number => {
    if (itemCount === 0) return -1;
    let next = current + direction;

    while (next >= 0 && next < itemCount) {
      if (!disabledIndices.includes(next)) {
        return next;
      }
      next += direction;
    }

    if (loop) {
      if (direction === 1) {
        next = 0;
        while (next < itemCount) {
          if (!disabledIndices.includes(next)) return next;
          next++;
        }
      } else {
        next = itemCount - 1;
        while (next >= 0) {
          if (!disabledIndices.includes(next)) return next;
          next--;
        }
      }
    }

    return current;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!enabled) return;

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        setActiveIndex((prev) => getNextIndex(prev, 1));
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        setActiveIndex((prev) => getNextIndex(prev, -1));
        break;
      }
      case "Home": {
        event.preventDefault();
        let idx = 0;
        while (disabledIndices.includes(idx) && idx < itemCount - 1) idx++;
        setActiveIndex(idx);
        break;
      }
      case "End": {
        event.preventDefault();
        let idx = itemCount - 1;
        while (disabledIndices.includes(idx) && idx > 0) idx--;
        setActiveIndex(idx);
        break;
      }
      case "Enter":
      case " ": {
        event.preventDefault();
        if (activeIndex >= 0 && !disabledIndices.includes(activeIndex)) {
          onSelect?.(activeIndex);
        }
        break;
      }
      case "Escape": {
        event.preventDefault();
        onEscape?.();
        break;
      }
    }
  };

  return { activeIndex, setActiveIndex, handleKeyDown };
}
