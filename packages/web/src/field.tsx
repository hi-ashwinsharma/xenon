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
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "var(--x-danger)",
                color: "var(--x-bg)",
                fontSize: "9px",
                fontWeight: "bold",
                lineHeight: 1,
              }}
            >
              !
            </span>
          )}
          <span>{error ?? helpText}</span>
        </div>
      )}
    </div>
  );
}
