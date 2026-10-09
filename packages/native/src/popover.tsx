import React, { createContext, useContext, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import type {
  NativePopoverCloseProps,
  NativePopoverContentProps,
  NativePopoverProps,
  NativePopoverTriggerProps,
} from "./native.types";

interface NativePopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PopoverContext = createContext<NativePopoverContextValue | null>(null);

export function usePopover(): NativePopoverContextValue {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a Popover");
  }
  return context;
}

export function Popover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: NativePopoverProps) {
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
    <PopoverContext.Provider value={{ open, setOpen }}>
      {children}
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({
  asChild,
  children,
  style,
}: NativePopoverTriggerProps) {
  const { open, setOpen } = usePopover();

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

export function PopoverContent({
  children,
  style,
}: NativePopoverContentProps) {
  const { open, setOpen } = usePopover();

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
      <Pressable
        onPress={() => setOpen(false)}
        style={styles.scrim}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={[
            styles.popoverCard,
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

export function PopoverClose({
  asChild,
  children,
  style,
}: NativePopoverCloseProps) {
  const { setOpen } = usePopover();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onPress: () => setOpen(false),
    });
  }

  return (
    <Pressable onPress={() => setOpen(false)} style={style}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 16,
  },
  popoverCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    padding: 16,
    minWidth: 260,
    maxWidth: "90%",
  },
});
