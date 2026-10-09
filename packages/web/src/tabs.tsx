import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import type { TabsContextValue, TabsVariant } from "@xenon/core";
import type {
  WebTabsContentProps,
  WebTabsListProps,
  WebTabsProps,
  WebTabsTriggerProps,
} from "./web.types";

const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabs(): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs subcomponents must be used within a Tabs provider.");
  }
  return context;
}

export function Tabs({
  variant = "pill",
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  children,
  className,
  style,
  ...restProps
}: WebTabsProps): ReactElement {
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(defaultValue);

  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange],
  );

  const contextValue: TabsContextValue = useMemo(
    () => ({
      value: activeValue,
      onChange: handleChange,
      variant,
    }),
    [activeValue, handleChange, variant],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={className}
        data-x-tabs=""
        data-x-variant={variant}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          ...style,
        }}
        {...restProps}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  ariaLabel = "Tabs",
  children,
  className,
  style,
  ...restProps
}: WebTabsListProps): ReactElement {
  const { variant } = useTabs();

  const isPill = variant === "pill";

  const listStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    position: "relative",
    boxSizing: "border-box",
    userSelect: "none",
    maxWidth: "100%",
    overflowX: "auto",
    scrollbarWidth: "none",
    ...(isPill
      ? {
          backgroundColor: "var(--x-surface-2)",
          borderRadius: "9999px",
          border: "1px solid var(--x-border)",
          padding: "3px",
          gap: "2px",
          alignSelf: "flex-start",
        }
      : {
          backgroundColor: "transparent",
          borderBottom: "1px solid var(--x-border)",
          gap: "var(--x-space-6, 32px)",
          alignSelf: "stretch",
        }),
    ...style,
  };

  return (
    <div
      aria-label={ariaLabel}
      className={className}
      data-x-tabs-list=""
      role="tablist"
      style={listStyle}
      {...restProps}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  disabled = false,
  icon,
  children,
  className,
  style,
  ...restProps
}: WebTabsTriggerProps): ReactElement {
  const { value: activeValue, onChange, variant } = useTabs();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const isActive = activeValue === value;
  const isPill = variant === "pill";

  const triggerStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--x-space-2, 8px)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.38 : 1,
    outline: "none",
    textDecoration: "none",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    transition:
      "all var(--x-dur-fast) var(--x-ease-standard), transform var(--x-dur-instant) ease",
    transform: isPressed && !disabled ? "scale(0.98)" : "scale(1)",
    ...(isPill
      ? {
          height: "32px",
          paddingLeft: "var(--x-space-4, 16px)",
          paddingRight: "var(--x-space-4, 16px)",
          borderRadius: "9999px",
          border: "1px solid",
          borderColor: isActive ? "var(--x-border)" : "transparent",
          backgroundColor: isActive
            ? "var(--x-surface)"
            : isHovered && !disabled
              ? "rgba(255, 255, 255, 0.04)"
              : "transparent",
          color: isActive
            ? "var(--x-text)"
            : isHovered && !disabled
              ? "var(--x-text)"
              : "var(--x-text-muted)",
          fontSize: "0.8125rem", // 13px
          fontWeight: isActive ? 400 : 300,
        }
      : {
          paddingTop: "var(--x-space-2, 8px)",
          paddingBottom: "var(--x-space-3, 12px)",
          border: "none",
          borderBottom: "2px solid",
          borderBottomColor: isActive ? "var(--x-accent)" : "transparent",
          backgroundColor: "transparent",
          color: isActive
            ? "var(--x-text)"
            : isHovered && !disabled
              ? "var(--x-text)"
              : "var(--x-text-muted)",
          fontSize: "0.875rem", // 14px
          fontWeight: isActive ? 400 : 300,
          marginBottom: "-1px",
        }),
    ...style,
  };

  return (
    <button
      aria-selected={isActive}
      className={className}
      data-x-active={isActive ? "true" : "false"}
      data-x-tabs-trigger=""
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          onChange(value);
        }
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseUp={() => setIsPressed(false)}
      role="tab"
      style={triggerStyle}
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
          }}
        >
          {icon}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
  style,
  ...restProps
}: WebTabsContentProps): ReactElement | null {
  const { value: activeValue } = useTabs();

  if (activeValue !== value) {
    return null;
  }

  return (
    <div
      className={className}
      data-x-tabs-content=""
      role="tabpanel"
      style={{
        width: "100%",
        paddingTop: "var(--x-space-4, 16px)",
        boxSizing: "border-box",
        outline: "none",
        ...style,
      }}
      tabIndex={0}
      {...restProps}
    >
      {children}
    </div>
  );
}
