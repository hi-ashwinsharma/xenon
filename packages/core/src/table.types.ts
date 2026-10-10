import type { ReactNode } from "react";

export type TableVariant = "default" | "subtle" | "bordered" | "striped";
export type TableSize = "sm" | "md" | "lg";
export type TableAlign = "left" | "center" | "right";

export interface TableProps {
  readonly variant?: TableVariant;
  readonly size?: TableSize;
  readonly fullWidth?: boolean;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface TableHeaderProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface TableBodyProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface TableFooterProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface TableRowProps {
  readonly selected?: boolean;
  readonly interactive?: boolean;
  readonly onClick?: () => void;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface TableHeadProps {
  readonly align?: TableAlign;
  readonly width?: number | string;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface TableCellProps {
  readonly align?: TableAlign;
  readonly numeric?: boolean;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface TableCaptionProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface DataTableColumn<T> {
  readonly key: string;
  readonly header: ReactNode;
  readonly accessor?: (item: T, index: number) => ReactNode;
  readonly align?: TableAlign;
  readonly width?: number | string;
  readonly numeric?: boolean;
}

export interface DataTableProps<T> {
  readonly columns: readonly DataTableColumn<T>[];
  readonly data: readonly T[];
  readonly variant?: TableVariant;
  readonly size?: TableSize;
  readonly interactive?: boolean;
  readonly onRowClick?: (item: T, index: number) => void;
  readonly emptyContent?: ReactNode;
  readonly caption?: ReactNode;
  readonly className?: string;
}
