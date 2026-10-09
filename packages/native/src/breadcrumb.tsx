import { useMemo, type ReactElement } from "react";
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
import { useXenon } from "./provider";
import { Text } from "./text";
import type {
  NativeBreadcrumbItemProps,
  NativeBreadcrumbLinkProps,
  NativeBreadcrumbListProps,
  NativeBreadcrumbPageProps,
  NativeBreadcrumbProps,
  NativeBreadcrumbSeparatorProps,
} from "./native.types";

export function Breadcrumb({
  children,
  style,
  ...restProps
}: NativeBreadcrumbProps): ReactElement {
  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }, style]} {...restProps}>
      {children}
    </View>
  );
}

export function BreadcrumbList({
  children,
  style,
  ...restProps
}: NativeBreadcrumbListProps): ReactElement {
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
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: "row",
        alignItems: "center",
        gap: nativeTokens.space[2],
      }}
      style={style}
      {...restProps}
    >
      {children}
    </ScrollView>
  );
}

export function BreadcrumbItem({
  children,
  style,
  ...restProps
}: NativeBreadcrumbItemProps): ReactElement {
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
          gap: nativeTokens.space[2],
        },
        style,
      ]}
      {...restProps}
    >
      {children}
    </View>
  );
}

export function BreadcrumbLink({
  onPress,
  children,
  style,
  ...restProps
}: NativeBreadcrumbLinkProps): ReactElement {
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
    <Pressable accessibilityRole="link" onPress={onPress}>
      {({ pressed }) => (
        <Text
          style={[
            {
              fontSize: 13,
              color: pressed ? nativeTokens.colors.text : nativeTokens.colors.textMuted,
              fontWeight: "300",
            },
            style,
          ]}
          {...restProps}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}

export function BreadcrumbPage({
  children,
  style,
  ...restProps
}: NativeBreadcrumbPageProps): ReactElement {
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
    <Text
      style={[
        {
          fontSize: 13,
          color: nativeTokens.colors.text,
          fontWeight: "400",
        },
        style,
      ]}
      {...restProps}
    >
      {children}
    </Text>
  );
}

export function BreadcrumbSeparator({
  children,
  style,
  ...restProps
}: NativeBreadcrumbSeparatorProps): ReactElement {
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
          alignItems: "center",
          justifyContent: "center",
          width: 12,
          height: 12,
        },
        style,
      ]}
      {...restProps}
    >
      {children ?? (
        <View
          style={{
            width: 5,
            height: 5,
            borderRightWidth: 1,
            borderTopWidth: 1,
            borderColor: nativeTokens.colors.textMuted,
            opacity: 0.6,
            transform: [{ rotate: "45deg" }],
          }}
        />
      )}
    </View>
  );
}
