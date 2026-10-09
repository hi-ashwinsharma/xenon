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
import { Heading } from "./heading";
import { Text } from "./text";
import type {
  NativeSheetCloseProps,
  NativeSheetContentProps,
  NativeSheetDescriptionProps,
  NativeSheetFooterProps,
  NativeSheetHeaderProps,
  NativeSheetProps,
  NativeSheetTitleProps,
  NativeSheetTriggerProps,
} from "./native.types";

interface NativeSheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext = createContext<NativeSheetContextValue | null>(null);

export function useSheet(): NativeSheetContextValue {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error("useSheet must be used within a Sheet");
  }
  return context;
}

export function Sheet({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: NativeSheetProps) {
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
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({
  asChild,
  children,
  style,
}: NativeSheetTriggerProps) {
  const { open, setOpen } = useSheet();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onPress: () => setOpen(true),
    });
  }

  return (
    <Pressable onPress={() => setOpen(true)} style={style}>
      {children}
    </Pressable>
  );
}

export function SheetContent({
  hasGrabHandle = true,
  children,
  style,
}: NativeSheetContentProps) {
  const { open, setOpen } = useSheet();

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
      animationType="slide"
      onRequestClose={() => setOpen(false)}
      transparent
      visible={open}
    >
      <Pressable onPress={() => setOpen(false)} style={styles.scrim}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={[
            styles.sheetCard,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
            },
            style,
          ]}
        >
          {/* Apple HIG Tactile Grab Handle */}
          {hasGrabHandle && (
            <View style={styles.grabHandleContainer}>
              <View
                style={[
                  styles.grabHandle,
                  { backgroundColor: tokens.colors.border },
                ]}
              />
            </View>
          )}
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function SheetHeader({
  children,
  style,
}: NativeSheetHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function SheetTitle({
  children,
  style,
}: NativeSheetTitleProps) {
  if (typeof children === "string") {
    return (
      <Heading level={3} style={style} weight={400}>
        {children}
      </Heading>
    );
  }
  return <>{children}</>;
}

export function SheetDescription({
  children,
  style,
}: NativeSheetDescriptionProps) {
  if (typeof children === "string") {
    return (
      <Text style={style} tone="muted">
        {children}
      </Text>
    );
  }
  return <>{children}</>;
}

export function SheetFooter({
  children,
  style,
}: NativeSheetFooterProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

export function SheetClose({
  asChild,
  children,
  style,
}: NativeSheetCloseProps) {
  const { setOpen } = useSheet();

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
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheetCard: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 8,
    gap: 16,
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
  header: {
    gap: 6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
});
