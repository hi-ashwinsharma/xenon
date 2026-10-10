import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import {
  DEFAULT_RADIUS_STOP,
  compileNativeTokens,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
} from "@xenon/tokens";
import type { CommandPaletteItem } from "@xenon/core";
import { useXenon } from "./provider";
import { Text } from "./text";
import type {
  NativeCommandPaletteProps,
} from "./native.types";

export function CommandPalette({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  items,
  placeholder = "Type a command or search...",
  emptyText = "No commands found.",
  children,
  style,
}: NativeCommandPaletteProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const [query, setQuery] = useState<string>("");

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

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    if (!nextOpen) {
      setQuery("");
    }
    onOpenChange?.(nextOpen);
  };

  const filteredItems = query.trim()
    ? items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        (item.group && item.group.toLowerCase().includes(query.toLowerCase())),
      )
    : items;

  const groupedItems = filteredItems.reduce<Record<string, CommandPaletteItem[]>>(
    (acc, item) => {
      const groupName = item.group || "General";
      if (!acc[groupName]) acc[groupName] = [];
      acc[groupName].push(item);
      return acc;
    },
    {},
  );

  return (
    <>
      {children}
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
                borderRadius: tokens.radius[radius].surface,
              },
              style,
            ]}
          >
            {/* Search Input Bar */}
            <View
              style={[
                styles.searchBar,
                {
                  borderBottomColor: tokens.colors.border,
                },
              ]}
            >
              <TextInput
                autoFocus
                onChangeText={setQuery}
                placeholder={placeholder}
                placeholderTextColor={tokens.colors.textMuted}
                style={[styles.input, { color: tokens.colors.text }]}
                value={query}
              />
              <Pressable
                accessibilityLabel="Close search"
                accessibilityRole="button"
                onPress={() => setOpen(false)}
                style={styles.closeButton}
              >
                <Text styleKey="caption2" tone="muted">
                  DONE
                </Text>
              </Pressable>
            </View>

            {/* Command Results */}
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={styles.listContainer}
            >
              {filteredItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text tone="muted">{emptyText}</Text>
                </View>
              ) : (
                Object.entries(groupedItems).map(([groupName, groupList]) => (
                  <View key={groupName} style={styles.groupContainer}>
                    <Text
                      styleKey="caption2"
                      style={styles.groupHeader}
                      tone="muted"
                    >
                      {groupName.toUpperCase()}
                    </Text>

                    {groupList.map((item) => (
                      <Pressable
                        accessibilityRole="button"
                        accessibilityState={{ disabled: item.disabled }}
                        disabled={item.disabled}
                        key={item.id}
                        onPress={() => {
                          if (!item.disabled) {
                            item.onSelect?.();
                            setOpen(false);
                          }
                        }}
                        style={({ pressed }) => [
                          styles.item,
                          pressed && styles.itemPressed,
                          item.disabled && styles.disabled,
                        ]}
                      >
                        <View style={styles.itemLeft}>
                          {item.icon && (
                            <View style={styles.itemIcon}>{item.icon}</View>
                          )}
                          <Text
                            styleKey="body"
                            tone={item.disabled ? "muted" : "default"}
                            weight={300}
                          >
                            {item.label}
                          </Text>
                        </View>

                        {item.shortcut && (
                          <View
                            style={[
                              styles.shortcutBadge,
                              {
                                backgroundColor: tokens.colors.surface2,
                                borderColor: tokens.colors.border,
                                borderRadius: tokens.radius[radius].joint,
                              },
                            ]}
                          >
                            <Text styleKey="caption2" tone="muted">
                              {item.shortcut}
                            </Text>
                          </View>
                        )}
                      </Pressable>
                    ))}
                  </View>
                ))
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    maxHeight: "80%",
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  closeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  listContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
  },
  groupContainer: {
    marginBottom: 8,
  },
  groupHeader: {
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 4,
    letterSpacing: 0.5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  itemPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemIcon: {
    marginRight: 10,
  },
  shortcutBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: StyleSheet.hairlineWidth,
  },
  disabled: {
    opacity: 0.45,
  },
});
