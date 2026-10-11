import React, { createContext, useContext, useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import { Text } from "./text";
import type {
  NativeTooltipContentProps,
  NativeTooltipProps,
  NativeTooltipTriggerProps,
} from "./native.types";

interface NativeTooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TooltipContext = createContext<NativeTooltipContextValue | null>(null);

export function useTooltip(): NativeTooltipContextValue {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltip must be used within a Tooltip");
  }
  return context;
}

export function Tooltip({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: NativeTooltipProps) {
  const [uncontrolledOpen, setUncontrolledOpen] =
    useState<boolean>(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      {children}
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({
  asChild,
  children,
  style,
}: NativeTooltipTriggerProps) {
  const { setOpen } = useTooltip();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onLongPress: () => setOpen(true),
    });
  }

  return (
    <Pressable onLongPress={() => setOpen(true)} style={style}>
      {children}
    </Pressable>
  );
}

export function TooltipContent({ children, style }: NativeTooltipContentProps) {
  const { open, setOpen } = useTooltip();

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
        <View
          style={[
            styles.tooltipCard,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
            },
            style,
          ]}
        >
          {typeof children === "string" ? (
            <Text styleKey="caption2" weight={400}>
              {children}
            </Text>
          ) : (
            children
          )}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  tooltipCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});
