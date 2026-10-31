import {
  createContext,
  useContext,
  useMemo,
  type CSSProperties,
  type ReactElement,
} from "react";
import {
  DEFAULT_RADIUS_STOP,
  RADIUS_STOPS,
  SPACE_SCALE,
  SURFACE_RADIUS_CAP,
  type RadiusStop,
} from "@xenon/tokens";
import { computeNestedRadius } from "@xenon/core";
import { useXenon } from "./provider";
import type { WebSurfaceContextValue, WebSurfaceProps } from "./web.types";

const INTERACTIVE_CSS = `
.x-surface-interactive:active {
  transform: scale(0.99);
}
a:focus-visible > .x-surface-interactive {
  border-color: var(--x-accent);
}
@media (hover: hover) {
  .x-surface-interactive:hover {
    border-color: var(--x-border-active);
    background-color: var(--x-surface-2);
  }
}
`;

const SurfaceContext = createContext<WebSurfaceContextValue | null>(null);

export function useSurface(): WebSurfaceContextValue | null {
  return useContext(SurfaceContext);
}

export function Surface({
  variant = "default",
  glassType = "regular",
  radius: explicitRadius,
  padding: explicitPadding,
  interactive = false,
  children,
  className,
  style,
  ...restProps
}: WebSurfaceProps): ReactElement {
  let xenonRadiusStop: RadiusStop = DEFAULT_RADIUS_STOP;
  try {
    const xenon = useXenon();
    xenonRadiusStop = xenon.radius;
  } catch {
    // Falls back to DEFAULT_RADIUS_STOP if rendered outside XenonProvider
  }

  const parentSurface = useSurface();

  const padding =
    typeof explicitPadding === "number" ? explicitPadding : SPACE_SCALE[4]; // 24px default

  let surfaceRadius: number;
  if (typeof explicitRadius === "number") {
    surfaceRadius = Math.min(explicitRadius, SURFACE_RADIUS_CAP);
  } else {
    const stop = explicitRadius ?? xenonRadiusStop;
    surfaceRadius = RADIUS_STOPS[stop].surface;
  }

  const effectiveRadius =
    parentSurface && explicitRadius === undefined
      ? computeNestedRadius(parentSurface.parentRadius, parentSurface.padding)
      : surfaceRadius;

  const surfaceStyle: CSSProperties = useMemo(() => {
    const base: CSSProperties = {
      position: "relative",
      boxSizing: "border-box",
      padding: `${padding}px`,
      borderRadius: `${effectiveRadius}px`,
      border: "1px solid var(--x-border)",
      transition:
        "border-radius var(--x-dur-base) var(--x-ease-standard), background-color var(--x-dur-base) var(--x-ease-standard), border-color var(--x-dur-base) var(--x-ease-standard), transform var(--x-dur-base) var(--x-ease-spring)",
      // Publish CSS variables for concentric child nesting
      ["--x-r-parent" as string]: `${effectiveRadius}px`,
      ["--x-pad" as string]: `${padding}px`,
      ...style,
    };

    if (variant === "glass") {
      const isClear = glassType === "clear";
      return {
        ...base,
        backgroundColor: isClear
          ? "var(--x-glass-clear-bg)"
          : "var(--x-glass-regular-bg)",
        backdropFilter: isClear
          ? "blur(var(--x-glass-clear-blur))"
          : "blur(var(--x-glass-regular-blur))",
        WebkitBackdropFilter: isClear
          ? "blur(var(--x-glass-clear-blur))"
          : "blur(var(--x-glass-regular-blur))",
      };
    }

    if (variant === "accent") {
      // Rescopes the text tokens so kit children stay legible on the flat fill
      return {
        ...base,
        backgroundColor: "var(--x-accent)",
        borderColor: "var(--x-accent)",
        color: "var(--x-on-accent)",
        ["--x-text" as string]: "var(--x-on-accent)",
        ["--x-text-muted" as string]:
          "color-mix(in srgb, var(--x-on-accent) 72%, transparent)",
        ["--x-surface-2" as string]:
          "color-mix(in srgb, var(--x-on-accent) 8%, transparent)",
        ["--x-border" as string]:
          "color-mix(in srgb, var(--x-on-accent) 24%, transparent)",
      };
    }

    if (variant === "subtle") {
      return {
        ...base,
        backgroundColor: "var(--x-surface-2)",
      };
    }

    return {
      ...base,
      backgroundColor: "var(--x-surface)",
    };
  }, [effectiveRadius, padding, variant, glassType, style]);

  const contextValue: WebSurfaceContextValue = useMemo(
    () => ({
      parentRadius: effectiveRadius,
      padding,
    }),
    [effectiveRadius, padding],
  );

  return (
    <SurfaceContext.Provider value={contextValue}>
      {interactive && (
        <style href="x-surface-interactive" precedence="default">
          {INTERACTIVE_CSS}
        </style>
      )}
      <div
        className={
          interactive
            ? `x-surface-interactive ${className ?? ""}`.trim()
            : className
        }
        data-x-surface={variant}
        style={surfaceStyle}
        {...restProps}
      >
        {children}
      </div>
    </SurfaceContext.Provider>
  );
}
