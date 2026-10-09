import {
  createContext,
  useContext,
  useMemo,
  type ReactElement,
} from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import type { SidebarCollapsibleMode, SidebarVariant } from "@xenon/core";
import { useXenon } from "./provider";
import { Text } from "./text";
import type {
  NativeSidebarDividerProps,
  NativeSidebarFooterProps,
  NativeSidebarGroupProps,
  NativeSidebarHeaderProps,
  NativeSidebarItemProps,
  NativeSidebarNavProps,
  NativeSidebarProps,
} from "./native.types";

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
  style,
  ...restProps
}: NativeSidebarProps): ReactElement {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Fallback
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  const isHidden = collapsed && collapsible === "offcanvas";
  const currentWidth = collapsed ? collapsedWidth : width;
  const isFloating = variant === "floating";

  const bg = glass
    ? resolvedTheme === "dark"
      ? nativeTokens.glass.regular.darkTint
      : nativeTokens.glass.regular.lightTint
    : hasBackground
      ? nativeTokens.colors.surface
      : "transparent";

  const sidebarStyle: ViewStyle = useMemo(
    () => ({
      display: isHidden ? "none" : "flex",
      flexDirection: "column",
      width: currentWidth,
      borderWidth: bordered ? StyleSheet.hairlineWidth : 0,
      borderColor: nativeTokens.colors.border,
      borderRightWidth: separator ? StyleSheet.hairlineWidth : bordered ? StyleSheet.hairlineWidth : 0,
      borderRightColor: nativeTokens.colors.border,
      overflow: "hidden",
      ...(isFloating
        ? {
            margin: 12,
            borderRadius: 14,
            backgroundColor: bg,
          }
        : {
            height: "100%",
            backgroundColor: bg,
            borderRadius: 0,
          }),
    }),
    [isHidden, currentWidth, bordered, separator, isFloating, bg, nativeTokens],
  );

  const contextValue: SidebarContextValue = useMemo(
    () => ({ collapsed, collapsible, variant }),
    [collapsed, collapsible, variant],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <View style={[sidebarStyle, style]} {...restProps}>
        {children}
      </View>
    </SidebarContext.Provider>
  );
}

export function SidebarHeader({
  children,
  style,
  ...restProps
}: NativeSidebarHeaderProps): ReactElement {
  const { collapsed } = useSidebarContext();
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Fallback
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  return (
    <View
      style={[
        {
          height: 52,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          paddingHorizontal: collapsed ? 0 : nativeTokens.space[4],
        },
        style,
      ]}
      {...restProps}
    >
      {children}
    </View>
  );
}

export function SidebarDivider({
  inset = 12,
  style,
  ...restProps
}: NativeSidebarDividerProps): ReactElement {
  const { collapsed } = useSidebarContext();
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Fallback
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={[
        {
          height: StyleSheet.hairlineWidth,
          backgroundColor: nativeTokens.colors.border,
          opacity: 0.5,
          marginVertical: 6,
          ...(collapsed
            ? { width: 28, alignSelf: "center" }
            : { marginHorizontal: inset }),
        },
        style,
      ]}
      {...restProps}
    />
  );
}

export function SidebarNav({
  children,
  style,
  ...restProps
}: NativeSidebarNavProps): ReactElement {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Fallback
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: nativeTokens.space[2],
        paddingHorizontal: nativeTokens.space[2],
        gap: nativeTokens.space[1],
      }}
      style={[{ flex: 1 }, style]}
      {...restProps}
    >
      {children}
    </ScrollView>
  );
}

export function SidebarGroup({
  label,
  children,
  style,
  ...restProps
}: NativeSidebarGroupProps): ReactElement {
  const { collapsed } = useSidebarContext();
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Fallback
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  return (
    <View
      style={[
        {
          marginBottom: nativeTokens.space[2],
          gap: nativeTokens.space[1],
        },
        style,
      ]}
      {...restProps}
    >
      {label && !collapsed && (
        <View
          style={{
            paddingHorizontal: nativeTokens.space[2],
            paddingTop: nativeTokens.space[2],
            paddingBottom: nativeTokens.space[1],
          }}
        >
          <Text style={{ fontSize: 11, letterSpacing: 0.6, color: nativeTokens.colors.textMuted }}>
            {label}
          </Text>
        </View>
      )}
      {children}
    </View>
  );
}

export function SidebarItem({
  icon,
  label,
  badge,
  active = false,
  disabled = false,
  shortcut,
  onPress,
  children,
  style,
  ...restProps
}: NativeSidebarItemProps): ReactElement {
  const { collapsed } = useSidebarContext();
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Fallback
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          height: 36,
          paddingHorizontal: collapsed ? 0 : nativeTokens.space[3],
          borderRadius: 6,
          backgroundColor: active ? nativeTokens.colors.surface2 : "transparent",
          opacity: disabled ? 0.38 : 1,
          transform: [{ scale: pressed && !disabled ? 0.98 : 1 }],
        },
        style,
      ]}
      {...restProps}
    >
      {icon && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: collapsed ? 0 : nativeTokens.space[2],
          }}
        >
          {icon}
        </View>
      )}

      {!collapsed && (
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 14,
              color: active ? nativeTokens.colors.text : nativeTokens.colors.textMuted,
              fontWeight: active ? "400" : "300",
            }}
          >
            {label ?? children}
          </Text>
        </View>
      )}

      {!collapsed && badge && (
        <View style={{ marginLeft: nativeTokens.space[2] }}>
          {badge}
        </View>
      )}

      {!collapsed && shortcut && (
        <View
          style={{
            paddingHorizontal: 4,
            paddingVertical: 1,
            borderRadius: 4,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: nativeTokens.colors.border,
            backgroundColor: nativeTokens.colors.surface,
            marginLeft: nativeTokens.space[2],
          }}
        >
          <Text style={{ fontSize: 10, color: nativeTokens.colors.textMuted }}>
            {shortcut}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export function SidebarFooter({
  children,
  style,
  ...restProps
}: NativeSidebarFooterProps): ReactElement {
  const { collapsed } = useSidebarContext();
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Fallback
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          paddingVertical: collapsed ? nativeTokens.space[2] : nativeTokens.space[2],
          paddingHorizontal: collapsed ? 0 : nativeTokens.space[4],
        },
        style,
      ]}
      {...restProps}
    >
      {children}
    </View>
  );
}
