import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from "react-native";
import {
  DEFAULT_RADIUS_STOP,
  compileNativeTokens,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
} from "@xenon/tokens";
import type { AccordionType, AccordionVariant } from "@xenon/core";
import { useXenon } from "./provider";
import { Text } from "./text";
import type {
  NativeAccordionContentProps,
  NativeAccordionItemProps,
  NativeAccordionProps,
  NativeAccordionTriggerProps,
} from "./native.types";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionContextValue {
  readonly type: AccordionType;
  readonly collapsible: boolean;
  readonly variant: AccordionVariant;
  readonly expandedValues: ReadonlySet<string>;
  readonly toggleValue: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

interface AccordionItemContextValue {
  readonly value: string;
  readonly disabled: boolean;
  readonly isExpanded: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null,
);

function CaretDownIcon({
  color,
  isExpanded,
}: {
  readonly color: string;
  readonly isExpanded: boolean;
}) {
  const spinAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(spinAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Animated.View
      style={[
        styles.caret,
        {
          transform: [{ rotate: spin }],
        },
      ]}
    >
      <View
        style={[
          styles.caretArrow,
          {
            borderTopColor: color,
          },
        ]}
      />
    </Animated.View>
  );
}

function useAccordionTokens() {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";
  let radius: RadiusStop = DEFAULT_RADIUS_STOP;
  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
    radius = xenon.radius;
  } catch {}

  const tokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  return { tokens, radius };
}

export function Accordion({
  type = "single",
  collapsible = true,
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = "default",
  children,
  style,
}: NativeAccordionProps) {
  const { tokens, radius } = useAccordionTokens();
  const isControlled = controlledValue !== undefined;

  const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(() => {
    if (defaultValue !== undefined) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const currentValues = useMemo<ReadonlySet<string>>(() => {
    if (isControlled) {
      if (Array.isArray(controlledValue)) {
        return new Set(controlledValue);
      }
      return controlledValue ? new Set([controlledValue]) : new Set();
    }
    return new Set(uncontrolledValue);
  }, [isControlled, controlledValue, uncontrolledValue]);

  const toggleValue = useCallback(
    (itemValue: string) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      let nextValues: string[];

      if (type === "single") {
        const isCurrentlyOpen = currentValues.has(itemValue);
        if (isCurrentlyOpen) {
          nextValues = collapsible ? [] : [itemValue];
        } else {
          nextValues = [itemValue];
        }
      } else {
        const set = new Set(currentValues);
        if (set.has(itemValue)) {
          set.delete(itemValue);
        } else {
          set.add(itemValue);
        }
        nextValues = Array.from(set);
      }

      if (!isControlled) {
        setUncontrolledValue(nextValues);
      }

      if (onValueChange) {
        onValueChange(type === "single" ? (nextValues[0] ?? "") : nextValues);
      }
    },
    [type, collapsible, currentValues, isControlled, onValueChange],
  );

  const contextValue = useMemo<AccordionContextValue>(
    () => ({
      type,
      collapsible,
      variant,
      expandedValues: currentValues,
      toggleValue,
    }),
    [type, collapsible, variant, currentValues, toggleValue],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <View
        style={[
          styles.container,
          variant === "separated" && { gap: 8 },
          variant === "bordered" && {
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: tokens.colors.border,
            borderRadius: tokens.radius[radius].control,
            overflow: "hidden",
          },
          style,
        ]}
      >
        {children}
      </View>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  disabled = false,
  children,
  style,
}: NativeAccordionItemProps) {
  const { tokens, radius } = useAccordionTokens();
  const rootContext = useContext(AccordionContext);
  const isExpanded = rootContext
    ? rootContext.expandedValues.has(value)
    : false;

  const itemContext = useMemo<AccordionItemContextValue>(
    () => ({
      value,
      disabled,
      isExpanded,
    }),
    [value, disabled, isExpanded],
  );

  const variant = rootContext?.variant ?? "default";

  return (
    <AccordionItemContext.Provider value={itemContext}>
      <View
        style={[
          styles.item,
          (variant === "default" || variant === "bordered") && {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: tokens.colors.border,
          },
          variant === "separated" && {
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: tokens.colors.border,
            borderRadius: tokens.radius[radius].control,
            backgroundColor: tokens.colors.surface,
            overflow: "hidden",
          },
          style,
        ]}
      >
        {children}
      </View>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  disabled: itemDisabledOverride,
  showCaret = true,
  children,
  style,
  textStyle,
}: NativeAccordionTriggerProps) {
  const { tokens } = useAccordionTokens();
  const rootContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!rootContext || !itemContext) {
    throw new Error(
      "AccordionTrigger must be used within an Accordion and AccordionItem",
    );
  }

  const isDisabled = itemDisabledOverride ?? itemContext.disabled;
  const isExpanded = itemContext.isExpanded;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={() => {
        if (!isDisabled) {
          rootContext.toggleValue(itemContext.value);
        }
      }}
      style={({ pressed }) => [
        styles.trigger,
        pressed && { opacity: 0.7 },
        isDisabled && { opacity: 0.4 },
        style,
      ]}
    >
      <View style={styles.triggerContent}>
        {typeof children === "string" ? (
          <Text
            styleKey="subhead"
            weight={400}
            style={[{ color: tokens.colors.text }, textStyle]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </View>

      {showCaret && (
        <CaretDownIcon
          color={tokens.colors.textMuted}
          isExpanded={isExpanded}
        />
      )}
    </Pressable>
  );
}

export function AccordionContent({
  children,
  style,
}: NativeAccordionContentProps) {
  const { tokens } = useAccordionTokens();
  const itemContext = useContext(AccordionItemContext);

  if (!itemContext) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }

  if (!itemContext.isExpanded) {
    return null;
  }

  return (
    <View style={[styles.content, style]}>
      {typeof children === "string" ? (
        <Text
          styleKey="footnote"
          weight={300}
          style={{ color: tokens.colors.textMuted, lineHeight: 20 }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  item: {
    width: "100%",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  triggerContent: {
    flex: 1,
    paddingRight: 12,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  caret: {
    width: 14,
    height: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  caretArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 5,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
});
