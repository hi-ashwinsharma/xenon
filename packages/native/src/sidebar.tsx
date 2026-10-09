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
import type { SidebarCollapsibleMode } from "@xenon/core";
import { useXenon } from "./provider";
import { Text } from "./text";
import type {
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
}

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  collapsible: "rail",
});

export function useSidebarContext(): SidebarContextValue {
  return useContext(SidebarContext);
}

export function Sidebar({
  hasBackground = false,
  separator = false,
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

  const sidebarStyle: ViewStyle = useMemo(
    () => ({
      display: isHidden ? "none" : "flex",
      flexDirection: "column",
      width: currentWidth,
      height: "100%",
      backgroundColor: hasBackground ? nativeTokens.colors.surface : "transparent",
      borderRightWidth: separator ? StyleSheet.hairlineWidth : 0,
      borderRightColor: nativeTokens.colors.border,
      overflow: "hidden",
    }),
    [isHidden, currentWidth, hasBackground, separator, nativeTokens],
  );

  const contextValue: SidebarContextValue = useMemo(
    () => ({ collapsed, collapsible }),
    [collapsed, collapsible],
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
          height: 56,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          paddingHorizontal: collapsed ? 0 : nativeTokens.space[4],
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: nativeTokens.colors.border,
        },
        style,
      ]}
      {...restProps}
    >
      {children}
    </View>
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
        paddingVertical: nativeTokens.space[3],
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
          marginBottom: nativeTokens.space[3],
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
          paddingVertical: collapsed ? nativeTokens.space[2] : nativeTokens.space[3],
          paddingHorizontal: collapsed ? 0 : nativeTokens.space[4],
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: nativeTokens.colors.border,
        },
        style,
      ]}
      {...restProps}
    >
      {children}
    </View>
  );
}
