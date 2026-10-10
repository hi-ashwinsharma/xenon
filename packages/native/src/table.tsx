import React, {
  createContext,
  useContext,
  useMemo,
} from "react";
import {
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
import type { TableSize, TableVariant } from "@xenon/core";
import { useXenon } from "./provider";
import { Text } from "./text";
import type {
  NativeDataTableProps,
  NativeTableBodyProps,
  NativeTableCaptionProps,
  NativeTableCellProps,
  NativeTableFooterProps,
  NativeTableHeadProps,
  NativeTableHeaderProps,
  NativeTableProps,
  NativeTableRowProps,
} from "./native.types";

interface TableContextValue {
  readonly variant: TableVariant;
  readonly size: TableSize;
}

const TableContext = createContext<TableContextValue>({
  variant: "default",
  size: "md",
});

const sizeMetrics: Record<TableSize, { py: number; px: number; minHeight: number }> = {
  sm: { py: 8, px: 12, minHeight: 36 },
  md: { py: 12, px: 16, minHeight: 44 },
  lg: { py: 16, px: 20, minHeight: 52 },
};

function useTableTokens() {
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

export function Table({
  variant = "default",
  size = "md",
  children,
  style,
}: NativeTableProps) {
  const { tokens, radius } = useTableTokens();
  const contextValue = useMemo(() => ({ variant, size }), [variant, size]);

  return (
    <TableContext.Provider value={contextValue}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          variant === "bordered" && {
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: tokens.colors.border,
            borderRadius: tokens.radius[radius].control,
            overflow: "hidden",
          },
          style,
        ]}
      >
        <View style={styles.tableInner}>{children}</View>
      </ScrollView>
    </TableContext.Provider>
  );
}

export function TableHeader({ children, style }: NativeTableHeaderProps) {
  const { tokens } = useTableTokens();
  const { variant } = useContext(TableContext);

  return (
    <View
      style={[
        styles.header,
        {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: tokens.colors.border,
          backgroundColor:
            variant === "subtle" ? tokens.colors.surface : "transparent",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function TableBody({ children, style }: NativeTableBodyProps) {
  return <View style={[styles.body, style]}>{children}</View>;
}

export function TableFooter({ children, style }: NativeTableFooterProps) {
  const { tokens } = useTableTokens();

  return (
    <View
      style={[
        styles.footer,
        {
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: tokens.colors.border,
          backgroundColor: tokens.colors.surface,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function TableRow({
  selected,
  interactive,
  onPress,
  children,
  style,
}: NativeTableRowProps) {
  const { tokens } = useTableTokens();

  const rowStyle = [
    styles.row,
    {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: tokens.colors.border,
      backgroundColor: selected ? "rgba(194, 255, 11, 0.08)" : "transparent",
    },
    style,
  ];

  if (interactive || onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          rowStyle,
          pressed && { backgroundColor: tokens.colors.surface },
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={rowStyle}>{children}</View>;
}

export function TableHead({
  align = "left",
  width,
  children,
  style,
  textStyle,
}: NativeTableHeadProps) {
  const { tokens } = useTableTokens();
  const { size } = useContext(TableContext);
  const metrics = sizeMetrics[size];

  const justifyContent =
    align === "right"
      ? "flex-end"
      : align === "center"
        ? "center"
        : "flex-start";

  return (
    <View
      style={[
        styles.cell,
        {
          paddingVertical: metrics.py,
          paddingHorizontal: metrics.px,
          minHeight: metrics.minHeight,
          justifyContent,
          width: width ? (typeof width === "number" ? width : undefined) : undefined,
        },
        style,
      ]}
    >
      {typeof children === "string" ? (
        <Text
          styleKey="footnote"
          weight={400}
          style={[{ color: tokens.colors.textMuted }, textStyle]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

export function TableCell({
  align = "left",
  children,
  style,
  textStyle,
}: NativeTableCellProps) {
  const { tokens } = useTableTokens();
  const { size } = useContext(TableContext);
  const metrics = sizeMetrics[size];

  const justifyContent =
    align === "right"
      ? "flex-end"
      : align === "center"
        ? "center"
        : "flex-start";

  return (
    <View
      style={[
        styles.cell,
        {
          paddingVertical: metrics.py,
          paddingHorizontal: metrics.px,
          minHeight: metrics.minHeight,
          justifyContent,
        },
        style,
      ]}
    >
      {typeof children === "string" || typeof children === "number" ? (
        <Text
          styleKey="subhead"
          weight={300}
          style={[{ color: tokens.colors.text }, textStyle]}
        >
          {String(children)}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

export function TableCaption({
  children,
  style,
  textStyle,
}: NativeTableCaptionProps) {
  const { tokens } = useTableTokens();

  return (
    <View style={[styles.caption, style]}>
      {typeof children === "string" ? (
        <Text
          styleKey="caption1"
          style={[{ color: tokens.colors.textMuted }, textStyle]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

export function DataTable<T>({
  columns,
  data,
  variant = "default",
  size = "md",
  interactive,
  onRowClick,
  emptyContent,
  caption,
  style,
}: NativeDataTableProps<T>) {
  const { tokens } = useTableTokens();

  return (
    <Table variant={variant} size={size} style={style}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              align={col.align}
              width={col.width}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <View style={styles.emptyContainer}>
              {typeof emptyContent === "string" ? (
                <Text styleKey="subhead" style={{ color: tokens.colors.textMuted }}>
                  {emptyContent}
                </Text>
              ) : (
                (emptyContent ?? (
                  <Text styleKey="subhead" style={{ color: tokens.colors.textMuted }}>
                    No data available
                  </Text>
                ))
              )}
            </View>
          </TableRow>
        ) : (
          data.map((item, index) => (
            <TableRow
              key={(item as { id?: string | number }).id?.toString() ?? index}
              interactive={interactive || Boolean(onRowClick)}
              onPress={onRowClick ? () => onRowClick(item, index) : undefined}
            >
              {columns.map((col) => {
                const cellContent = col.accessor
                  ? col.accessor(item, index)
                  : (item as Record<string, unknown>)[col.key] as React.ReactNode;

                return (
                  <TableCell
                    key={col.key}
                    align={col.align}
                  >
                    {cellContent}
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
  },
  tableInner: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
  },
  body: {
    flexDirection: "column",
  },
  footer: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  caption: {
    paddingVertical: 8,
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    paddingVertical: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
