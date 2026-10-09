import {
  useMemo,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import type { WebPaginationProps } from "./web.types";

export function Pagination({
  page,
  totalPages,
  siblingCount = 1,
  disabled = false,
  compact = false,
  onPageChange,
  className,
  style,
  ...restProps
}: WebPaginationProps): ReactElement {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const pages = useMemo(() => {
    if (compact) {
      return [];
    }

    const totalNumbers = siblingCount * 2 + 3; // current + siblings + first + last
    const totalBlocks = totalNumbers + 2; // with ellipsis

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

  const buttonBaseStyle = (isActive: boolean, isDisabled: boolean, key: string): CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "32px",
    height: "32px",
    padding: "0 8px",
    borderRadius: "9999px",
    border: "1px solid",
    borderColor: isActive ? "var(--x-border)" : "transparent",
    backgroundColor: isActive ? "var(--x-surface-2)" : "transparent",
    color: isActive ? "var(--x-text)" : "var(--x-text-muted)",
    fontSize: "0.8125rem", // 13px
    fontWeight: isActive ? 400 : 300,
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.35 : 1,
    outline: "none",
    transform: pressedKey === key && !isDisabled ? "scale(0.94)" : "scale(1)",
    transition:
      "background-color var(--x-dur-instant) ease, border-color var(--x-dur-instant) ease, transform var(--x-dur-instant) ease, color var(--x-dur-instant) ease",
    userSelect: "none",
    boxSizing: "border-box",
  });

  return (
    <nav
      aria-label="Pagination"
      className={className}
      data-x-pagination=""
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        boxSizing: "border-box",
        ...style,
      }}
      {...restProps}
    >
      <button
        aria-label="Previous Page"
        disabled={!canPrev}
        onClick={() => {
          if (canPrev) {
            onPageChange?.(page - 1);
          }
        }}
        onMouseDown={() => setPressedKey("prev")}
        onMouseLeave={() => setPressedKey(null)}
        onMouseUp={() => setPressedKey(null)}
        style={buttonBaseStyle(false, !canPrev, "prev")}
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          viewBox="0 0 16 16"
          width="14"
        >
          <polyline points="10 3 5 8 10 13" />
        </svg>
      </button>

      {compact ? (
        <span
          style={{
            fontSize: "0.8125rem",
            color: "var(--x-text-muted)",
            fontWeight: 300,
            padding: "0 8px",
          }}
        >
          {page} / {totalPages}
        </span>
      ) : (
        pages.map((item, index) => {
          if (item === "dots-left" || item === "dots-right") {
            return (
              <span
                key={`ellipsis-${index}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "32px",
                  color: "var(--x-text-muted)",
                  userSelect: "none",
                }}
              >
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  height="12"
                  viewBox="0 0 16 16"
                  width="12"
                >
                  <circle cx="4" cy="8" r="1" />
                  <circle cx="8" cy="8" r="1" />
                  <circle cx="12" cy="8" r="1" />
                </svg>
              </span>
            );
          }

          const isCurrent = item === page;
          const key = `page-${item}`;

          return (
            <button
              aria-current={isCurrent ? "page" : undefined}
              aria-label={`Page ${item}`}
              disabled={disabled}
              key={key}
              onClick={() => {
                if (!disabled && !isCurrent) {
                  onPageChange?.(item);
                }
              }}
              onMouseDown={() => setPressedKey(key)}
              onMouseEnter={(e) => {
                if (!isCurrent && !disabled) {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.color = "var(--x-text)";
                }
              }}
              onMouseLeave={(e) => {
                setPressedKey(null);
                if (!isCurrent && !disabled) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--x-text-muted)";
                }
              }}
              onMouseUp={() => setPressedKey(null)}
              style={buttonBaseStyle(isCurrent, disabled, key)}
              type="button"
            >
              {item}
            </button>
          );
        })
      )}

      <button
        aria-label="Next Page"
        disabled={!canNext}
        onClick={() => {
          if (canNext) {
            onPageChange?.(page + 1);
          }
        }}
        onMouseDown={() => setPressedKey("next")}
        onMouseLeave={() => setPressedKey(null)}
        onMouseUp={() => setPressedKey(null)}
        style={buttonBaseStyle(false, !canNext, "next")}
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          viewBox="0 0 16 16"
          width="14"
        >
          <polyline points="6 3 11 8 6 13" />
        </svg>
      </button>
    </nav>
  );
}
