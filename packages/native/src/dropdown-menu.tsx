import React, { createContext, useContext, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import { Text } from "./text";
import type {
  NativeDropdownMenuContentProps,
  NativeDropdownMenuGroupProps,
  NativeDropdownMenuItemProps,
  NativeDropdownMenuProps,
  NativeDropdownMenuSeparatorProps,
  NativeDropdownMenuTriggerProps,
} from "./native.types";

interface NativeDropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = createContext<NativeDropdownMenuContextValue | null>(null);

export function useDropdownMenu(): NativeDropdownMenuContextValue {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("useDropdownMenu must be used within a DropdownMenu");
  }
  return context;
}

export function DropdownMenu({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: NativeDropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  asChild,
  children,
  style,
}: NativeDropdownMenuTriggerProps) {
  const { open, setOpen } = useDropdownMenu();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onPress: () => setOpen(!open),
    });
  }

  return (
    <Pressable onPress={() => setOpen(!open)} style={style}>
      {children}
    </Pressable>
  );
}

export function DropdownMenuContent({
  children,
  style,
}: NativeDropdownMenuContentProps) {
  const { open, setOpen } = useDropdownMenu();

  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";
  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Outside provider fallback
  }

  const tokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  return (
    <Modal
      animationType="fade"
      onRequestClose={() => setOpen(false)}
      transparent
      visible={open}
    >
      <Pressable onPress={() => setOpen(false)} style={styles.scrim}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={[
            styles.card,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
            },
            style,
          ]}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function DropdownMenuGroup({
  label,
  children,
  style,
}: NativeDropdownMenuGroupProps) {
  return (
    <View style={[styles.group, style]}>
      {label && (
        <Text style={styles.groupLabel} styleKey="caption2" tone="muted">
          {label.toUpperCase()}
        </Text>
      )}
      {children}
    </View>
  );
}

export function DropdownMenuItem({
  disabled = false,
  destructive = false,
  icon,
  shortcut,
  onSelect,
  children,
  style,
}: NativeDropdownMenuItemProps) {
  const { setOpen } = useDropdownMenu();

  const handlePress = () => {
    if (disabled) return;
    onSelect?.();
    setOpen(false);
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.itemContent}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text
          style={{
            color: destructive ? "#ff453a" : undefined,
          }}
          styleKey="callout"
          weight={400}
        >
          {children}
        </Text>
      </View>

      {shortcut && (
        <Text styleKey="caption2" tone="muted">
          {shortcut}
        </Text>
      )}
    </Pressable>
  );
}

export function DropdownMenuSeparator({
  style,
}: NativeDropdownMenuSeparatorProps) {
  let resolvedTheme: ResolvedTheme = "dark";
  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
  } catch {}
  const tokens = compileNativeTokens(resolvedTheme, "lime");

  return (
    <View
      style={[
        styles.separator,
        { backgroundColor: tokens.colors.border },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    padding: 6,
    minWidth: 220,
    maxWidth: "90%",
    gap: 2,
  },
  group: {
    gap: 2,
  },
  groupLabel: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    letterSpacing: 0.8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
  itemPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.45,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 4,
  },
});
