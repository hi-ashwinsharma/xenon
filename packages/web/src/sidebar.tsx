import {
  createContext,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import type { SidebarCollapsibleMode, SidebarVariant } from "@xenon/core";
import type {
  WebSidebarDividerProps,
  WebSidebarFooterProps,
  WebSidebarGroupProps,
  WebSidebarHeaderProps,
  WebSidebarItemProps,
  WebSidebarNavProps,
  WebSidebarProps,
} from "./web.types";

interface SidebarContextValue {
  readonly collapsed: boolean;
  readonly collapsible: SidebarCollapsibleMode;
  readonly variant: SidebarVariant;
}

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  collapsible: "rail",
  variant: "floating",
});

export function useSidebarContext(): SidebarContextValue {
  return useContext(SidebarContext);
}

export function Sidebar({
  variant = "floating",
  bordered = false,
  hasBackground = false,
  separator = false,
  glass = false,
  collapsed = false,
  collapsible = "rail",
  width = 240,
  collapsedWidth = 56,
  children,
  className,
  style,
  ...restProps
}: WebSidebarProps): ReactElement {
  const isHidden = collapsed && collapsible === "offcanvas";
  const currentWidth = collapsed ? collapsedWidth : width;
  const isFloating = variant === "floating";

  const sidebarStyle: CSSProperties = {
    position: "relative",
    display: isHidden ? "none" : "flex",
    flexDirection: "column",
    width: `${currentWidth}px`,
    minWidth: `${currentWidth}px`,
    boxSizing: "border-box",
    transition:
      "width var(--x-dur-base) var(--x-ease-standard), min-width var(--x-dur-base) var(--x-ease-standard)",
    overflow: "hidden",
    userSelect: "none",
    border: bordered ? "1px solid var(--x-border)" : "none",
    borderRight: separator
      ? "1px solid var(--x-border)"
      : bordered
        ? undefined
        : "none",
    ...(isFloating
      ? {
          height: "calc(100% - 24px)",
          margin: "12px",
          borderRadius: "var(--x-radius-surface, 14px)",
          backgroundColor: glass
            ? "var(--x-glass-regular-bg)"
            : hasBackground
              ? "var(--x-surface)"
              : "transparent",
          backdropFilter: glass ? "blur(var(--x-glass-regular-blur))" : "none",
          WebkitBackdropFilter: glass
            ? "blur(var(--x-glass-regular-blur))"
            : "none",
        }
      : {
          height: "100%",
          minHeight: "100vh",
          borderRadius: 0,
          backgroundColor: hasBackground ? "var(--x-surface)" : "transparent",
        }),
    ...style,
  };

  const contextValue: SidebarContextValue = useMemo(
    () => ({ collapsed, collapsible, variant }),
    [collapsed, collapsible, variant],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <aside
        className={className}
        data-x-collapsed={collapsed ? "true" : "false"}
        data-x-sidebar=""
        data-x-variant={variant}
        style={sidebarStyle}
        {...restProps}
      >
        {children}
      </aside>
    </SidebarContext.Provider>
  );
}

export function SidebarHeader({
  children,
  className,
  style,
  ...restProps
}: WebSidebarHeaderProps): ReactElement {
  const { collapsed } = useSidebarContext();

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: collapsed ? "center" : "flex-start",
    height: "52px",
    paddingLeft: collapsed ? 0 : "var(--x-space-4, 16px)",
    paddingRight: collapsed ? 0 : "var(--x-space-4, 16px)",
    boxSizing: "border-box",
    flexShrink: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
    ...style,
  };

  return (
    <div className={className} style={headerStyle} {...restProps}>
      {children}
    </div>
  );
}

export function SidebarDivider({
  inset = 12,
  className,
  style,
  ...restProps
}: WebSidebarDividerProps): ReactElement {
  const { collapsed } = useSidebarContext();

  const dividerStyle: CSSProperties = {
    height: "1px",
    width: collapsed ? "28px" : `calc(100% - ${inset * 2}px)`,
    margin: "6px auto",
    backgroundColor: "var(--x-border)",
    opacity: 0.6,
    borderRadius: "1px",
    flexShrink: 0,
    ...style,
  };

  return (
    <div
      aria-hidden="true"
      className={className}
      style={dividerStyle}
      {...restProps}
    />
  );
}

export function SidebarNav({
  children,
  className,
  style,
  ...restProps
}: WebSidebarNavProps): ReactElement {
  const navStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingTop: "var(--x-space-2, 8px)",
    paddingBottom: "var(--x-space-2, 8px)",
    paddingLeft: "var(--x-space-2, 8px)",
    paddingRight: "var(--x-space-2, 8px)",
    gap: "var(--x-space-1, 4px)",
    overflowY: "auto",
    overflowX: "hidden",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <nav className={className} style={navStyle} {...restProps}>
      {children}
    </nav>
  );
}

export function SidebarGroup({
  label,
  children,
  className,
  style,
  ...restProps
}: WebSidebarGroupProps): ReactElement {
  const { collapsed } = useSidebarContext();

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--x-space-1, 4px)",
        marginBottom: "var(--x-space-2, 8px)",
        ...style,
      }}
      {...restProps}
    >
      {label && !collapsed && (
        <div
          style={{
            fontSize: "0.6875rem", // 11px footnote
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--x-text-muted)",
            fontWeight: 400,
            paddingLeft: "var(--x-space-2, 8px)",
            paddingRight: "var(--x-space-2, 8px)",
            paddingTop: "var(--x-space-2, 8px)",
            paddingBottom: "var(--x-space-1, 4px)",
            userSelect: "none",
          }}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

export function SidebarItem({
  icon,
  label,
  badge,
  active = false,
  disabled = false,
  shortcut,
  children,
  className,
  style,
  ...restProps
}: WebSidebarItemProps): ReactElement {
  const { collapsed } = useSidebarContext();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const itemStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: collapsed ? "center" : "flex-start",
    width: "100%",
    height: "36px",
    paddingLeft: collapsed ? 0 : "var(--x-space-3, 12px)",
    paddingRight: collapsed ? 0 : "var(--x-space-3, 12px)",
    borderRadius: "6px",
    border: "1px solid transparent",
    backgroundColor: active
      ? "var(--x-surface-2)"
      : isHovered && !disabled
        ? "var(--x-surface-2)"
        : "transparent",
    color: active
      ? "var(--x-text)"
      : isHovered && !disabled
        ? "var(--x-text)"
        : "var(--x-text-muted)",
    transform: isPressed && !disabled ? "scale(0.98)" : "scale(1)",
    transition:
      "background-color var(--x-dur-instant) ease, color var(--x-dur-instant) ease, transform var(--x-dur-instant) ease",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    outline: "none",
    fontSize: "0.875rem", // 14px
    fontWeight: active ? 400 : 300,
    textDecoration: "none",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <button
      className={className}
      data-x-active={active ? "true" : "false"}
      data-x-sidebar-item=""
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseUp={() => setIsPressed(false)}
      style={itemStyle}
      title={collapsed && typeof label === "string" ? label : undefined}
      type="button"
      {...restProps}
    >
      {icon && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginRight: collapsed ? 0 : "var(--x-space-2, 8px)",
          }}
        >
          {icon}
        </span>
      )}

      {!collapsed && (
        <span
          style={{
            flex: 1,
            textAlign: "left",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {label ?? children}
        </span>
      )}

      {!collapsed && badge && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginLeft: "var(--x-space-2, 8px)",
            flexShrink: 0,
          }}
        >
          {badge}
        </span>
      )}

      {!collapsed && shortcut && (
        <kbd
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontFamily: "var(--x-font-family-mono, monospace)",
            padding: "1px 4px",
            borderRadius: "4px",
            backgroundColor: "var(--x-surface)",
            border: "1px solid var(--x-border)",
            color: "var(--x-text-muted)",
            lineHeight: 1,
            marginLeft: "var(--x-space-2, 8px)",
            userSelect: "none",
            pointerEvents: "none",
            flexShrink: 0,
          }}
        >
          {shortcut}
        </kbd>
      )}
    </button>
  );
}

export function SidebarFooter({
  children,
  className,
  style,
  ...restProps
}: WebSidebarFooterProps): ReactElement {
  const { collapsed } = useSidebarContext();

  const footerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: collapsed ? "center" : "flex-start",
    padding: collapsed
      ? "var(--x-space-2, 8px) 0"
      : "var(--x-space-2, 8px) var(--x-space-4, 16px)",
    boxSizing: "border-box",
    flexShrink: 0,
    ...style,
  };

  return (
    <div className={className} style={footerStyle} {...restProps}>
      {children}
    </div>
  );
}
