import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
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
import type { TabsContextValue, TabsVariant } from "@xenon/core";
import { useXenon } from "./provider";
import { Text } from "./text";
import type {
  NativeTabsContentProps,
  NativeTabsListProps,
  NativeTabsProps,
  NativeTabsTriggerProps,
} from "./native.types";

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
  style,
  ...restProps
}: NativeTabsProps): ReactElement {
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
      <View style={[{ width: "100%" }, style]} {...restProps}>
        {children}
      </View>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  style,
  ...restProps
}: NativeTabsListProps): ReactElement {
  const { variant } = useTabs();
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

  const isPill = variant === "pill";

  const listStyle: ViewStyle = isPill
    ? {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: nativeTokens.colors.surface2,
        borderRadius: 9999,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: nativeTokens.colors.border,
        padding: 3,
        alignSelf: "flex-start",
      }
    : {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: nativeTokens.colors.border,
        alignSelf: "stretch",
        gap: nativeTokens.space[6],
      };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={listStyle}
      style={style}
      {...restProps}
    >
      {children}
    </ScrollView>
  );
}

export function TabsTrigger({
  value,
  disabled = false,
  icon,
  children,
  onPress,
  style,
  ...restProps
}: NativeTabsTriggerProps): ReactElement {
  const { value: activeValue, onChange, variant } = useTabs();
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

  const isActive = activeValue === value;
  const isPill = variant === "pill";

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled }}
      disabled={disabled}
      onPress={() => {
        if (!disabled) {
          onChange(value);
          onPress?.();
        }
      }}
      style={({ pressed }) => [
        isPill
          ? {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: 32,
              paddingHorizontal: nativeTokens.space[4],
              borderRadius: 9999,
              borderWidth: isActive ? StyleSheet.hairlineWidth : 0,
              borderColor: isActive ? nativeTokens.colors.border : "transparent",
              backgroundColor: isActive ? nativeTokens.colors.surface : "transparent",
              opacity: disabled ? 0.38 : 1,
              transform: [{ scale: pressed && !disabled ? 0.98 : 1 }],
            }
          : {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: nativeTokens.space[3],
              borderBottomWidth: isActive ? 2 : 0,
              borderBottomColor: isActive ? nativeTokens.colors.accent : "transparent",
              marginBottom: -StyleSheet.hairlineWidth,
              opacity: disabled ? 0.38 : 1,
              transform: [{ scale: pressed && !disabled ? 0.98 : 1 }],
            },
        style,
      ]}
      {...restProps}
    >
      {icon && (
        <View style={{ marginRight: nativeTokens.space[2] }}>
          {icon}
        </View>
      )}
      <Text
        style={{
          fontSize: isPill ? 13 : 14,
          color: isActive ? nativeTokens.colors.text : nativeTokens.colors.textMuted,
          fontWeight: isActive ? "400" : "300",
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export function TabsContent({
  value,
  children,
  style,
  ...restProps
}: NativeTabsContentProps): ReactElement | null {
  const { value: activeValue } = useTabs();

  if (activeValue !== value) {
    return null;
  }

  return (
    <View style={[{ width: "100%", paddingTop: 16 }, style]} {...restProps}>
      {children}
    </View>
  );
}
