import {
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import type {
  WebTabBarItemProps,
  WebTabBarProps,
} from "./web.types";

export function TabBar({
  variant = "floating",
  ariaLabel = "Bottom Navigation",
  children,
  className,
  style,
  ...restProps
}: WebTabBarProps): ReactElement {
  const isFloating = variant === "floating";

  const barStyle: CSSProperties = {
    position: "fixed",
    zIndex: 90,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: isFloating ? "center" : "space-around",
    boxSizing: "border-box",
    ...(isFloating
      ? {
          bottom: "calc(var(--x-space-5, 24px) + env(safe-area-inset-bottom, 0px))",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "9999px",
          border: "1px solid var(--x-border)",
          backgroundColor: "var(--x-glass-regular-bg)",
          backdropFilter: "blur(var(--x-glass-regular-blur))",
          WebkitBackdropFilter: "blur(var(--x-glass-regular-blur))",
          padding: "6px 16px",
          gap: "var(--x-space-4, 16px)",
          maxWidth: "calc(100vw - 32px)",
        }
      : {
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          borderTop: "1px solid var(--x-border)",
          backgroundColor: "var(--x-glass-regular-bg)",
          backdropFilter: "blur(var(--x-glass-regular-blur))",
          WebkitBackdropFilter: "blur(var(--x-glass-regular-blur))",
          paddingTop: "var(--x-space-2, 8px)",
          paddingBottom: "calc(var(--x-space-2, 8px) + env(safe-area-inset-bottom, 0px))",
          paddingLeft: "var(--x-space-4, 16px)",
          paddingRight: "var(--x-space-4, 16px)",
        }),
    ...style,
  };

  return (
    <nav
      aria-label={ariaLabel}
      className={className}
      data-x-tab-bar=""
      data-x-variant={variant}
      style={barStyle}
      {...restProps}
    >
      {children}
    </nav>
  );
}

export function TabBarItem({
  icon,
  label,
  active = false,
  badge,
  disabled = false,
  children,
  className,
  style,
  ...restProps
}: WebTabBarItemProps): ReactElement {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const itemStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2px",
    background: "transparent",
    border: "none",
    outline: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.38 : 1,
    padding: "4px 8px",
    color: active ? "var(--x-text)" : "var(--x-text-muted)",
    transform: isPressed && !disabled ? "scale(0.92)" : "scale(1)",
    transition:
      "color var(--x-dur-instant) ease, transform var(--x-dur-instant) ease",
    userSelect: "none",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <button
      aria-current={active ? "page" : undefined}
      className={className}
      data-x-active={active ? "true" : "false"}
      data-x-tab-bar-item=""
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseLeave={() => setIsPressed(false)}
      onMouseUp={() => setIsPressed(false)}
      style={itemStyle}
      type="button"
      {...restProps}
    >
      <div style={{ position: "relative", display: "inline-flex" }}>
        {icon}
        {badge && (
          <span
            style={{
              position: "absolute",
              top: "-2px",
              right: "-6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "6px",
              height: "6px",
              borderRadius: "9999px",
              backgroundColor: "var(--x-accent)",
            }}
          />
        )}
      </div>

      {(label || children) && (
        <span
          style={{
            fontSize: "0.6875rem", // 11px footnote
            fontWeight: active ? 400 : 300,
            lineHeight: 1.1,
            letterSpacing: "0.01em",
          }}
        >
          {label ?? children}
        </span>
      )}
    </button>
  );
}
