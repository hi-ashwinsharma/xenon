import { useId, type CSSProperties, type ReactElement } from "react";
import type { WebFieldProps } from "./web.types";

export function Field({
  label,
  helpText,
  error,
  optional = false,
  htmlFor,
  children,
  className,
  style,
  ...restProps
}: WebFieldProps): ReactElement {
  const generatedId = useId();
  const inputId = htmlFor ?? generatedId;
  const helpId = `${inputId}-help`;
  const errorId = `${inputId}-error`;

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "var(--x-font-family)",
    ...style,
  };

  const labelRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "0.875rem",
    fontWeight: 400,
    color: "var(--x-text)",
  };

  const optionalBadgeStyle: CSSProperties = {
    fontSize: "0.75rem",
    color: "var(--x-text-muted)",
  };

  const messageStyle: CSSProperties = {
    fontSize: "0.8125rem",
    lineHeight: "1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: error ? "var(--x-danger)" : "var(--x-text-muted)",
  };

  return (
    <div className={className} style={containerStyle} {...restProps}>
      {label && (
        <div style={labelRowStyle}>
          <label htmlFor={inputId}>{label}</label>
          {optional && <span style={optionalBadgeStyle}>Optional</span>}
        </div>
      )}

      {children}

      {(error || helpText) && (
        <div id={error ? errorId : helpId} style={messageStyle}>
          {error && (
            <span
              aria-hidden="true"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "14px",
                height: "14px",
                color: "var(--x-danger)",
                flexShrink: 0,
              }}
            >
              <svg
                fill="none"
                height="14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                viewBox="0 0 16 16"
                width="14"
              >
                <circle cx="8" cy="8" r="6.25" />
                <line x1="8" x2="8" y1="5" y2="8" />
                <circle cx="8" cy="11" fill="currentColor" r="0.6" stroke="none" />
              </svg>
            </span>
          )}
          <span>{error ?? helpText}</span>
        </div>
      )}
    </div>
  );
}
