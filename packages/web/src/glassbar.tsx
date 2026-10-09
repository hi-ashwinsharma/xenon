import type { CSSProperties, ReactElement } from "react";
import type { WebGlassBarProps } from "./web.types";

export function GlassBar({
  glassType = "regular",
  brand,
  nav,
  actions,
  children,
  sticky = true,
  bordered = true,
  maxWidth = 1280,
  className,
  style,
  ...restProps
}: WebGlassBarProps): ReactElement {
  const isClear = glassType === "clear";
  const maxW = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;

  const headerStyle: CSSProperties = {
    position: sticky ? "sticky" : "relative",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: isClear
      ? "var(--x-glass-clear-bg)"
      : "var(--x-glass-regular-bg)",
    backdropFilter: isClear
      ? "blur(var(--x-glass-clear-blur))"
      : "blur(var(--x-glass-regular-blur))",
    WebkitBackdropFilter: isClear
      ? "blur(var(--x-glass-clear-blur))"
      : "blur(var(--x-glass-regular-blur))",
    borderBottom: bordered ? "1px solid var(--x-border)" : "none",
    ...style,
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: maxW,
    height: "56px",
    margin: "0 auto",
    paddingLeft: "var(--x-space-5, 24px)",
    paddingRight: "var(--x-space-5, 24px)",
    boxSizing: "border-box",
  };

  return (
    <header
      className={className}
      data-x-glassbar={glassType}
      style={headerStyle}
      {...restProps}
    >
      <div style={containerStyle}>
        {children ?? (
          <>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--x-space-3, 12px)",
                flexShrink: 0,
              }}
            >
              {brand}
            </div>

            {nav && (
              <nav
                aria-label="Navigation"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--x-space-4, 16px)",
                  margin: "0 auto",
                }}
              >
                {nav}
              </nav>
            )}

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--x-space-3, 12px)",
                flexShrink: 0,
              }}
            >
              {actions}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
