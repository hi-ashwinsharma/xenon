import React, { createContext, useContext, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  DEFAULT_RADIUS_STOP,
  compileNativeTokens,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import { Text } from "./text";
import type {
  NativeSelectContentProps,
  NativeSelectItemProps,
  NativeSelectProps,
  NativeSelectTriggerProps,
} from "./native.types";

interface SelectOptionItem {
  value: string;
  label: string;
  disabled: boolean;
}

interface NativeSelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value?: string;
  onSelect: (value: string) => void;
  selectedLabel?: string;
  items: SelectOptionItem[];
  registerItem: (value: string, label: string, disabled: boolean) => void;
}

const SelectContext = createContext<NativeSelectContextValue | null>(null);

export function useSelect(): NativeSelectContextValue {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelect must be used within a Select");
  }
  return context;
}

export function Select({
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = "Select an option...",
  options,
  disabled = false,
  fullWidth = false,
  children,
  style,
}: NativeSelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<SelectOptionItem[]>([]);

  const registerItem = (val: string, label: string, dis: boolean) => {
    setItems((prev) => {
      if (prev.some((item) => item.value === val)) return prev;
      return [...prev, { value: val, label, disabled: dis }];
    });
  };

  const handleSelect = (nextVal: string) => {
    if (!isControlled) {
      setUncontrolledValue(nextVal);
    }
    onValueChange?.(nextVal);
    setOpen(false);
  };

  let selectedLabel: string | undefined;
  if (options) {
    selectedLabel = options.find((opt) => opt.value === value)?.label;
  } else {
    selectedLabel = items.find((item) => item.value === value)?.label;
  }

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        onSelect: handleSelect,
        selectedLabel,
        items,
        registerItem,
      }}
    >
      <View style={[{ width: fullWidth ? "100%" : undefined }, style]}>
        {options ? (
          <>
            <SelectTrigger placeholder={placeholder} />
            <SelectContent>
              {options.map((opt) => (
                <SelectItem
                  disabled={opt.disabled}
                  key={opt.value}
                  value={opt.value}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </>
        ) : (
          children
        )}
      </View>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  placeholder = "Select...",
  children,
  style,
}: NativeSelectTriggerProps) {
  const { open, setOpen, selectedLabel } = useSelect();

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

  return (
    <Pressable
      onPress={() => setOpen(!open)}
      style={[
        styles.trigger,
        {
          backgroundColor: tokens.colors.surface,
          borderColor: open ? tokens.colors.accent : tokens.colors.border,
          borderRadius: tokens.radius[radius].control,
        },
        style,
      ]}
    >
      <Text
        styleKey="callout"
        tone={selectedLabel ? "default" : "muted"}
        weight={400}
      >
        {children ?? (selectedLabel || placeholder)}
      </Text>

      <View
        style={[
          styles.chevron,
          {
            borderColor: tokens.colors.textMuted,
            transform: [{ rotate: open ? "225deg" : "45deg" }],
          },
        ]}
      />
    </Pressable>
  );
}

export function SelectContent({
  children,
  style,
}: NativeSelectContentProps) {
  const { open, setOpen } = useSelect();

  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";
  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {}

  const tokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  return (
    <Modal
      animationType="slide"
      onRequestClose={() => setOpen(false)}
      transparent
      visible={open}
    >
      <Pressable onPress={() => setOpen(false)} style={styles.scrim}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={[
            styles.bottomSheet,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
            },
            style,
          ]}
        >
          {/* Apple HIG Tactile Grab Handle */}
          <View style={styles.grabHandleContainer}>
            <View
              style={[
                styles.grabHandle,
                { backgroundColor: tokens.colors.border },
              ]}
            />
          </View>

          <ScrollView style={styles.listContainer}>{children}</ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function SelectItem({
  value,
  disabled = false,
  children,
  style,
}: NativeSelectItemProps) {
  const { value: selectedValue, onSelect, registerItem } = useSelect();
  const isSelected = selectedValue === value;

  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";
  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {}

  const tokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  React.useEffect(() => {
    const label = typeof children === "string" ? children : value;
    registerItem(value, label, disabled);
  }, [value, children, disabled]);

  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        if (!disabled) onSelect(value);
      }}
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed,
        isSelected && styles.itemSelected,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text styleKey="body" weight={isSelected ? 400 : 300}>
        {children}
      </Text>

      {isSelected && (
        <View
          style={[
            styles.check,
            {
              borderColor: tokens.colors.accent,
            },
          ]}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  trigger: {
    height: 40,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: StyleSheet.hairlineWidth,
    minWidth: 180,
  },
  scrim: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheet: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 8,
    maxHeight: "70%",
  },
  grabHandleContainer: {
    alignItems: "center",
    paddingVertical: 8,
  },
  grabHandle: {
    width: 36,
    height: 4,
    borderRadius: 9999,
  },
  listContainer: {
    paddingVertical: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  itemPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  itemSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
  },
  disabled: {
    opacity: 0.45,
  },
  chevron: {
    width: 7,
    height: 7,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    marginBottom: 2,
  },
  check: {
    width: 6,
    height: 11,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    transform: [{ rotate: "45deg" }],
    marginRight: 6,
    marginBottom: 4,
  },
});
