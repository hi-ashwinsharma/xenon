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
import { useXenon } from "./provider";
import { Text } from "./text";
import type { NativeComboboxProps } from "./native.types";

export function Combobox({
  value: controlledValue,
  defaultValue,
  onValueChange,
  options,
  placeholder = "Search options...",
  searchPlaceholder = "Type to search...",
  emptyText = "No results found.",
  disabled = false,
  fullWidth = false,
  style,
}: NativeComboboxProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const [open, setOpen] = useState<boolean>(false);
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

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = query.trim()
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  const handleSelect = (nextVal: string) => {
    if (!isControlled) {
      setUncontrolledValue(nextVal);
    }
    onValueChange?.(nextVal);
    setOpen(false);
    setQuery("");
  };

  return (
    <View style={[{ width: fullWidth ? "100%" : undefined }, style]}>
      {/* Trigger */}
      <Pressable
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={[
          styles.trigger,
          {
            backgroundColor: tokens.colors.surface,
            borderColor: open ? tokens.colors.accent : tokens.colors.border,
            borderRadius: tokens.radius[radius].control,
            opacity: disabled ? 0.45 : 1,
          },
        ]}
      >
        <Text
          styleKey="callout"
          tone={selectedOption ? "default" : "muted"}
          weight={400}
        >
          {selectedOption ? selectedOption.label : placeholder}
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

      {/* Bottom Sheet Modal with Search Input */}
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
            ]}
          >
            {/* Grab handle */}
            <View style={styles.grabHandleContainer}>
              <View
                style={[
                  styles.grabHandle,
                  { backgroundColor: tokens.colors.border },
                ]}
              />
            </View>

            {/* Search Input Bar */}
            <View
              style={[
                styles.searchBar,
                {
                  backgroundColor: tokens.colors.surface2,
                  borderColor: tokens.colors.border,
                  borderRadius: tokens.radius[radius].control,
                },
              ]}
            >
              <TextInput
                autoFocus
                onChangeText={setQuery}
                placeholder={searchPlaceholder}
                placeholderTextColor={tokens.colors.textMuted}
                style={[styles.input, { color: tokens.colors.text }]}
                value={query}
              />
            </View>

            {/* Options List */}
            <ScrollView style={styles.listContainer}>
              {filteredOptions.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text tone="muted">{emptyText}</Text>
                </View>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = value === opt.value;
                  return (
                    <Pressable
                      disabled={opt.disabled}
                      key={opt.value}
                      onPress={() => {
                        if (!opt.disabled) handleSelect(opt.value);
                      }}
                      style={({ pressed }) => [
                        styles.item,
                        pressed && styles.itemPressed,
                        isSelected && styles.itemSelected,
                        opt.disabled && styles.disabled,
                      ]}
                    >
                      <Text styleKey="body" weight={isSelected ? 400 : 300}>
                        {opt.label}
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
                })
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
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
    minWidth: 200,
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
    maxHeight: "75%",
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
  searchBar: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    height: 38,
    justifyContent: "center",
    marginBottom: 8,
  },
  input: {
    fontSize: 14,
    padding: 0,
    margin: 0,
  },
  listContainer: {
    paddingVertical: 4,
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
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
