import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type ReactElement,
} from "react";
import type { WebTextareaProps } from "./web.types";

export function Textarea({
  value: controlledValue,
  defaultValue = "",
  placeholder,
  disabled = false,
  readOnly = false,
  invalid = false,
  autoGrow = false,
  minRows = 3,
  maxRows = 10,
  maxLength,
  showCount = false,
  onChange,
  className,
  style,
  rows = 3,
  ...restProps
}: WebTextareaProps): ReactElement {
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    String(defaultValue),
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const currentLength = String(value || "").length;

  const adjustHeight = useCallback(() => {
    if (!autoGrow || !textareaRef.current) {
      return;
    }
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    const lineHeight = 20; // 1.25rem line height
    const paddingOffset = 24; // 12px top + 12px bottom
    const minHeight = minRows * lineHeight + paddingOffset;
    const maxHeight = maxRows * lineHeight + paddingOffset;
    const scrollHeight = textarea.scrollHeight;
    const targetHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${targetHeight}px`;
  }, [autoGrow, minRows, maxRows]);

  useEffect(() => {
    adjustHeight();
  }, [adjustHeight, value]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>): void => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
      adjustHeight();
    },
    [isControlled, onChange, adjustHeight],
  );

  const containerStyle: CSSProperties = useMemo(() => {
    const borderColor = invalid
      ? "var(--x-danger)"
      : isFocused
        ? "var(--x-accent)"
        : "var(--x-border)";

    return {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      boxSizing: "border-box",
      borderRadius: "8px",
      backgroundColor: "var(--x-surface-2)",
      border: `1px solid ${borderColor}`,
      outline: "none",
      opacity: disabled ? 0.45 : 1,
      cursor: disabled ? "not-allowed" : "text",
      transition:
        "border-color var(--x-dur-fast) var(--x-ease-standard), background-color var(--x-dur-fast) var(--x-ease-standard)",
      ...style,
    };
  }, [invalid, isFocused, disabled, style]);

  const textareaStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    padding: "12px 14px",
    margin: 0,
    boxSizing: "border-box",
    fontFamily: "var(--x-font-family)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 400,
    color: "var(--x-text)",
    cursor: disabled ? "not-allowed" : "text",
    resize: autoGrow ? "none" : "vertical",
    minHeight: `${minRows * 20 + 24}px`,
  };

  return (
    <div
      className={className}
      onClick={() => textareaRef.current?.focus()}
      style={containerStyle}
    >
      <textarea
        aria-disabled={disabled ? "true" : undefined}
        aria-invalid={invalid ? "true" : undefined}
        disabled={disabled}
        maxLength={maxLength}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={textareaRef}
        rows={rows}
        style={textareaStyle}
        value={value}
        {...restProps}
      />

      {showCount && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0 12px 8px 12px",
            fontSize: "11px",
            fontFamily: "var(--x-font-family-mono, monospace)",
            color: "var(--x-text-muted)",
            userSelect: "none",
            pointerEvents: "none",
            lineHeight: 1,
          }}
        >
          {maxLength ? `${currentLength} / ${maxLength}` : currentLength}
        </div>
      )}
    </div>
  );
}
