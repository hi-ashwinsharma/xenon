export type FloatingPlacement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FloatingOptions {
  triggerRect: Rect;
  floatingWidth: number;
  floatingHeight: number;
  placement?: FloatingPlacement;
  offset?: number;
  viewportWidth: number;
  viewportHeight: number;
  boundaryPadding?: number;
}

export interface FloatingResult {
  x: number;
  y: number;
  actualPlacement: FloatingPlacement;
  transformOrigin: string;
}

/**
 * Computes exact collision-aware coordinates and hero transform origin for floating overlays.
 * Aligns with Apple HIG popovers and Android hero container transforms.
 */
export function computeFloatingPlacement({
  triggerRect,
  floatingWidth,
  floatingHeight,
  placement = "bottom",
  offset = 8,
  viewportWidth,
  viewportHeight,
  boundaryPadding = 8,
}: FloatingOptions): FloatingResult {
  let primaryPlacement = placement;
  let x = 0;
  let y = 0;

  // 1. Initial coordinates based on requested placement
  switch (placement) {
    case "bottom": {
      x = triggerRect.x + triggerRect.width / 2 - floatingWidth / 2;
      y = triggerRect.y + triggerRect.height + offset;
      if (y + floatingHeight > viewportHeight - boundaryPadding) {
        // Flip to top
        const flippedY = triggerRect.y - floatingHeight - offset;
        if (
          flippedY >= boundaryPadding ||
          triggerRect.y > viewportHeight - (triggerRect.y + triggerRect.height)
        ) {
          y = flippedY;
          primaryPlacement = "top";
        }
      }
      break;
    }
    case "bottom-start": {
      x = triggerRect.x;
      y = triggerRect.y + triggerRect.height + offset;
      if (y + floatingHeight > viewportHeight - boundaryPadding) {
        const flippedY = triggerRect.y - floatingHeight - offset;
        if (flippedY >= boundaryPadding) {
          y = flippedY;
          primaryPlacement = "top-start";
        }
      }
      break;
    }
    case "bottom-end": {
      x = triggerRect.x + triggerRect.width - floatingWidth;
      y = triggerRect.y + triggerRect.height + offset;
      if (y + floatingHeight > viewportHeight - boundaryPadding) {
        const flippedY = triggerRect.y - floatingHeight - offset;
        if (flippedY >= boundaryPadding) {
          y = flippedY;
          primaryPlacement = "top-end";
        }
      }
      break;
    }
    case "top": {
      x = triggerRect.x + triggerRect.width / 2 - floatingWidth / 2;
      y = triggerRect.y - floatingHeight - offset;
      if (y < boundaryPadding) {
        const flippedY = triggerRect.y + triggerRect.height + offset;
        if (flippedY + floatingHeight <= viewportHeight - boundaryPadding) {
          y = flippedY;
          primaryPlacement = "bottom";
        }
      }
      break;
    }
    case "top-start": {
      x = triggerRect.x;
      y = triggerRect.y - floatingHeight - offset;
      if (y < boundaryPadding) {
        const flippedY = triggerRect.y + triggerRect.height + offset;
        if (flippedY + floatingHeight <= viewportHeight - boundaryPadding) {
          y = flippedY;
          primaryPlacement = "bottom-start";
        }
      }
      break;
    }
    case "top-end": {
      x = triggerRect.x + triggerRect.width - floatingWidth;
      y = triggerRect.y - floatingHeight - offset;
      if (y < boundaryPadding) {
        const flippedY = triggerRect.y + triggerRect.height + offset;
        if (flippedY + floatingHeight <= viewportHeight - boundaryPadding) {
          y = flippedY;
          primaryPlacement = "bottom-end";
        }
      }
      break;
    }
    case "left": {
      x = triggerRect.x - floatingWidth - offset;
      y = triggerRect.y + triggerRect.height / 2 - floatingHeight / 2;
      if (x < boundaryPadding) {
        const flippedX = triggerRect.x + triggerRect.width + offset;
        if (flippedX + floatingWidth <= viewportWidth - boundaryPadding) {
          x = flippedX;
          primaryPlacement = "right";
        }
      }
      break;
    }
    case "right": {
      x = triggerRect.x + triggerRect.width + offset;
      y = triggerRect.y + triggerRect.height / 2 - floatingHeight / 2;
      if (x + floatingWidth > viewportWidth - boundaryPadding) {
        const flippedX = triggerRect.x - floatingWidth - offset;
        if (flippedX >= boundaryPadding) {
          x = flippedX;
          primaryPlacement = "left";
        }
      }
      break;
    }
  }

  // 2. Clamp x and y to viewport bounds
  const clampedX = Math.max(
    boundaryPadding,
    Math.min(x, viewportWidth - floatingWidth - boundaryPadding),
  );
  const clampedY = Math.max(
    boundaryPadding,
    Math.min(y, viewportHeight - floatingHeight - boundaryPadding),
  );

  // 3. Compute Hero transform origin relative to trigger center
  const triggerCenterX = triggerRect.x + triggerRect.width / 2;
  const triggerCenterY = triggerRect.y + triggerRect.height / 2;
  const originX = Math.max(
    0,
    Math.min(floatingWidth, Math.round(triggerCenterX - clampedX)),
  );
  const originY = Math.max(
    0,
    Math.min(floatingHeight, Math.round(triggerCenterY - clampedY)),
  );

  let transformOrigin = `${originX}px ${originY}px`;
  if (primaryPlacement.startsWith("bottom")) {
    transformOrigin = `${originX}px 0px`;
  } else if (primaryPlacement.startsWith("top")) {
    transformOrigin = `${originX}px ${floatingHeight}px`;
  } else if (primaryPlacement === "right") {
    transformOrigin = `0px ${originY}px`;
  } else if (primaryPlacement === "left") {
    transformOrigin = `${floatingWidth}px ${originY}px`;
  }

  return {
    x: Math.round(clampedX),
    y: Math.round(clampedY),
    actualPlacement: primaryPlacement,
    transformOrigin,
  };
}
