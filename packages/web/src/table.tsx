"use client";

import React, {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  type CSSProperties,
  type ReactElement,
} from "react";
import type { TableSize, TableVariant } from "@xenon/core";
import type {
  WebDataTableProps,
  WebTableBodyProps,
  WebTableCaptionProps,
  WebTableCellProps,
  WebTableFooterProps,
  WebTableHeadProps,
  WebTableHeaderProps,
  WebTableProps,
  WebTableRowProps,
} from "./web.types";

interface TableContextValue {
  readonly variant: TableVariant;
  readonly size: TableSize;
}

const TableContext = createContext<TableContextValue>({
  variant: "default",
  size: "md",
});

const sizePaddings: Record<
  TableSize,
  { y: number; x: number; fontSize: string }
> = {
  sm: { y: 8, x: 12, fontSize: "12px" },
  md: { y: 12, x: 16, fontSize: "14px" },
  lg: { y: 16, x: 20, fontSize: "15px" },
};

export const Table = forwardRef<HTMLTableElement, WebTableProps>(function Table(
  {
    variant = "default",
    size = "md",
    fullWidth = true,
    children,
    style,
    className,
    ...restProps
  },
  ref,
): ReactElement {
  const contextValue = useMemo(() => ({ variant, size }), [variant, size]);

  const isOuterBordered = variant === "bordered" || variant === "default";
  const containerStyle: CSSProperties = {
    position: "relative",
    width: fullWidth ? "100%" : "auto",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "var(--x-radius-surface, 16px)",
    border: isOuterBordered ? "1px solid var(--x-border)" : undefined,
    overflow: "hidden",
  };

  const tableStyle: CSSProperties = {
    width: "100%",
    captionSide: "bottom",
    borderCollapse: "collapse",
    fontSize: sizePaddings[size].fontSize,
    textAlign: "left",
    ...style,
  };

  return (
    <TableContext.Provider value={contextValue}>
      <div style={containerStyle}>
        <table
          ref={ref}
          style={tableStyle}
          className={className}
          {...restProps}
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
});

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  WebTableHeaderProps
>(function TableHeader(
  { children, style, className, ...restProps },
  ref,
): ReactElement {
  const { variant } = useContext(TableContext);

  const headerStyle: CSSProperties = {
    borderBottom: "1px solid var(--x-border)",
    backgroundColor:
      variant === "subtle" ? "var(--x-surface-1)" : "transparent",
    ...style,
  };

  return (
    <thead ref={ref} style={headerStyle} className={className} {...restProps}>
      {children}
    </thead>
  );
});

export const TableBody = forwardRef<HTMLTableSectionElement, WebTableBodyProps>(
  function TableBody(
    { children, style, className, ...restProps },
    ref,
  ): ReactElement {
    return (
      <tbody ref={ref} style={style} className={className} {...restProps}>
        {children}
      </tbody>
    );
  },
);

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  WebTableFooterProps
>(function TableFooter(
  { children, style, className, ...restProps },
  ref,
): ReactElement {
  const footerStyle: CSSProperties = {
    borderTop: "1px solid var(--x-border)",
    backgroundColor: "var(--x-surface-1)",
    color: "var(--x-text-secondary)",
    ...style,
  };

  return (
    <tfoot ref={ref} style={footerStyle} className={className} {...restProps}>
      {children}
    </tfoot>
  );
});

export const TableRow = forwardRef<HTMLTableRowElement, WebTableRowProps>(
  function TableRow(
    {
      selected,
      interactive,
      onClick,
      children,
      style,
      className,
      ...restProps
    },
    ref,
  ): ReactElement {
    const { variant } = useContext(TableContext);

    const rowStyle: CSSProperties = {
      borderBottom: "1px solid var(--x-border)",
      transition:
        "background-color var(--x-motion-duration-fast) var(--x-motion-ease-out)",
      cursor: interactive || onClick ? "pointer" : "default",
      backgroundColor: selected ? "rgba(194, 255, 11, 0.08)" : undefined,
      ...style,
    };

    return (
      <tr
        ref={ref}
        style={rowStyle}
        className={className}
        onClick={onClick}
        {...restProps}
      >
        {children}
      </tr>
    );
  },
);

export const TableHead = forwardRef<HTMLTableCellElement, WebTableHeadProps>(
  function TableHead(
    { align = "left", width, children, style, className, ...restProps },
    ref,
  ): ReactElement {
    const { size } = useContext(TableContext);
    const metrics = sizePaddings[size];

    const headStyle: CSSProperties = {
      padding: `${metrics.y}px ${metrics.x}px`,
      textAlign: align,
      fontWeight: 400,
      color: "var(--x-text-secondary)",
      width,
      whiteSpace: "nowrap",
      fontVariantNumeric: align === "right" ? "tabular-nums" : undefined,
      ...style,
    };

    return (
      <th ref={ref} style={headStyle} className={className} {...restProps}>
        {children}
      </th>
    );
  },
);

export const TableCell = forwardRef<HTMLTableCellElement, WebTableCellProps>(
  function TableCell(
    { align = "left", numeric, children, style, className, ...restProps },
    ref,
  ): ReactElement {
    const { size } = useContext(TableContext);
    const metrics = sizePaddings[size];

    const cellStyle: CSSProperties = {
      padding: `${metrics.y}px ${metrics.x}px`,
      textAlign: align,
      color: "var(--x-text)",
      fontVariantNumeric:
        numeric || align === "right" ? "tabular-nums" : undefined,
      ...style,
    };

    return (
      <td ref={ref} style={cellStyle} className={className} {...restProps}>
        {children}
      </td>
    );
  },
);

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  WebTableCaptionProps
>(function TableCaption(
  { children, style, className, ...restProps },
  ref,
): ReactElement {
  const captionStyle: CSSProperties = {
    marginTop: "8px",
    fontSize: "12px",
    color: "var(--x-text-muted)",
    textAlign: "center",
    ...style,
  };

  return (
    <caption
      ref={ref}
      style={captionStyle}
      className={className}
      {...restProps}
    >
      {children}
    </caption>
  );
});

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
  className,
  ...restProps
}: WebDataTableProps<T>): ReactElement {
  return (
    <Table
      variant={variant}
      size={size}
      style={style}
      className={className}
      {...restProps}
    >
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key} align={col.align} width={col.width}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              align="center"
              style={{
                padding: "32px 16px",
                color: "var(--x-text-muted)",
              }}
            >
              {emptyContent ?? "No data available"}
            </TableCell>
          </TableRow>
        ) : (
          data.map((item, index) => (
            <TableRow
              key={(item as { id?: string | number }).id?.toString() ?? index}
              interactive={interactive || Boolean(onRowClick)}
              onClick={onRowClick ? () => onRowClick(item, index) : undefined}
            >
              {columns.map((col) => {
                const cellContent = col.accessor
                  ? col.accessor(item, index)
                  : ((item as Record<string, unknown>)[
                      col.key
                    ] as React.ReactNode);

                return (
                  <TableCell
                    key={col.key}
                    align={col.align}
                    numeric={col.numeric}
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
