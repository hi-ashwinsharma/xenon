export interface PaginationProps {
  /** Current active page (1-indexed) */
  readonly page: number;
  /** Total count of pages */
  readonly totalPages: number;
  /** Number of sibling pages shown around the active page (default: 1) */
  readonly siblingCount?: number;
  /** Whether the pagination controls are disabled */
  readonly disabled?: boolean;
  /** Compact mode: shows only previous/next actions and current status counter (default: false) */
  readonly compact?: boolean;
  /** Callback fired when page changes */
  readonly onPageChange?: (page: number) => void;
  readonly className?: string;
}
