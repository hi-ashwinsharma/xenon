import { useMemo, type ReactElement } from "react";
import { Pressable, StyleSheet, View, type ViewStyle } from "react-native";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import { Text } from "./text";
import type { NativePaginationProps } from "./native.types";

export function Pagination({
  page,
  totalPages,
  siblingCount = 1,
  disabled = false,
  compact = false,
  onPageChange,
  style,
  ...restProps
}: NativePaginationProps): ReactElement {
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

  const pages = useMemo(() => {
    if (compact) {
      return [];
    }

    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const startPage = Math.max(2, page - siblingCount);
    const endPage = Math.min(totalPages - 1, page + siblingCount);

    const hasLeftEllipsis = startPage > 2;
    const hasRightEllipsis = endPage < totalPages - 1;

    const items: (number | "dots-left" | "dots-right")[] = [1];

    if (hasLeftEllipsis) {
      items.push("dots-left");
    }

    for (let p = startPage; p <= endPage; p += 1) {
      items.push(p);
    }

    if (hasRightEllipsis) {
      items.push("dots-right");
    }

    items.push(totalPages);
    return items;
  }, [totalPages, page, siblingCount, compact]);

  const canPrev = page > 1 && !disabled;
  const canNext = page < totalPages && !disabled;

  return (
    <View
      accessibilityRole="none"
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        },
        style,
      ]}
      {...restProps}
    >
      {/* Previous Button */}
      <Pressable
        accessibilityLabel="Previous Page"
        accessibilityRole="button"
        disabled={!canPrev}
        onPress={() => {
          if (canPrev) {
            onPageChange?.(page - 1);
          }
        }}
        style={({ pressed }) => [
          {
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 9999,
            opacity: !canPrev ? 0.35 : 1,
            transform: [{ scale: pressed && canPrev ? 0.94 : 1 }],
          },
        ]}
      >
        <View
          style={{
            width: 6,
            height: 6,
            borderLeftWidth: 1.2,
            borderBottomWidth: 1.2,
            borderColor: nativeTokens.colors.textMuted,
            transform: [{ rotate: "45deg" }],
          }}
        />
      </Pressable>

      {compact ? (
        <View style={{ paddingHorizontal: 8 }}>
          <Text style={{ fontSize: 13, color: nativeTokens.colors.textMuted }}>
            {page} / {totalPages}
          </Text>
        </View>
      ) : (
        pages.map((item, index) => {
          if (item === "dots-left" || item === "dots-right") {
            return (
              <View
                key={`ellipsis-${index}`}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 32,
                  gap: 2,
                }}
              >
                <View
                  style={{
                    width: 2,
                    height: 2,
                    borderRadius: 1,
                    backgroundColor: nativeTokens.colors.textMuted,
                  }}
                />
                <View
                  style={{
                    width: 2,
                    height: 2,
                    borderRadius: 1,
                    backgroundColor: nativeTokens.colors.textMuted,
                  }}
                />
                <View
                  style={{
                    width: 2,
                    height: 2,
                    borderRadius: 1,
                    backgroundColor: nativeTokens.colors.textMuted,
                  }}
                />
              </View>
            );
          }

          const isCurrent = item === page;

          return (
            <Pressable
              accessibilityLabel={`Page ${item}`}
              accessibilityRole="button"
              accessibilityState={{ selected: isCurrent, disabled }}
              disabled={disabled}
              key={`page-${item}`}
              onPress={() => {
                if (!disabled && !isCurrent) {
                  onPageChange?.(item);
                }
              }}
              style={({ pressed }) => [
                {
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 32,
                  height: 32,
                  paddingHorizontal: 8,
                  borderRadius: 9999,
                  borderWidth: isCurrent ? StyleSheet.hairlineWidth : 0,
                  borderColor: isCurrent
                    ? nativeTokens.colors.border
                    : "transparent",
                  backgroundColor: isCurrent
                    ? nativeTokens.colors.surface2
                    : "transparent",
                  opacity: disabled ? 0.35 : 1,
                  transform: [{ scale: pressed && !disabled ? 0.94 : 1 }],
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: isCurrent
                    ? nativeTokens.colors.text
                    : nativeTokens.colors.textMuted,
                  fontWeight: isCurrent ? "400" : "300",
                }}
              >
                {item}
              </Text>
            </Pressable>
          );
        })
      )}

      {/* Next Button */}
      <Pressable
        accessibilityLabel="Next Page"
        accessibilityRole="button"
        disabled={!canNext}
        onPress={() => {
          if (canNext) {
            onPageChange?.(page + 1);
          }
        }}
        style={({ pressed }) => [
          {
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 9999,
            opacity: !canNext ? 0.35 : 1,
            transform: [{ scale: pressed && canNext ? 0.94 : 1 }],
          },
        ]}
      >
        <View
          style={{
            width: 6,
            height: 6,
            borderRightWidth: 1.2,
            borderTopWidth: 1.2,
            borderColor: nativeTokens.colors.textMuted,
            transform: [{ rotate: "45deg" }],
          }}
        />
      </Pressable>
    </View>
  );
}
