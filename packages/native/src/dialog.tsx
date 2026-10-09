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
  NativeDialogCloseProps,
  NativeDialogContentProps,
  NativeDialogDescriptionProps,
  NativeDialogFooterProps,
  NativeDialogHeaderProps,
  NativeDialogProps,
  NativeDialogTitleProps,
  NativeDialogTriggerProps,
} from "./native.types";

interface NativeDialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<NativeDialogContextValue | null>(null);

export function useDialog(): NativeDialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a Dialog");
  }
  return context;
}

export function Dialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: NativeDialogProps) {
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
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  asChild,
  children,
  style,
}: NativeDialogTriggerProps) {
  const { open, setOpen } = useDialog();

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

export function DialogContent({
  children,
  style,
}: NativeDialogContentProps) {
  const { open, setOpen } = useDialog();

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
            styles.dialogCard,
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

export function DialogHeader({
  children,
  style,
}: NativeDialogHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function DialogTitle({
  children,
  style,
}: NativeDialogTitleProps) {
  if (typeof children === "string") {
    return (
      <Heading level={3} style={style} weight={400}>
        {children}
      </Heading>
    );
  }
  return <>{children}</>;
}

export function DialogDescription({
  children,
  style,
}: NativeDialogDescriptionProps) {
  if (typeof children === "string") {
    return (
      <Text style={style} tone="muted">
        {children}
      </Text>
    );
  }
  return <>{children}</>;
}

export function DialogFooter({
  children,
  style,
}: NativeDialogFooterProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

export function DialogClose({
  asChild,
  children,
  style,
}: NativeDialogCloseProps) {
  const { setOpen } = useDialog();

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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 24,
  },
  dialogCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    gap: 16,
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
