"use client";

import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import type { AccordionType, AccordionVariant } from "@xenon/core";
import type {
  WebAccordionContentProps,
  WebAccordionItemProps,
  WebAccordionProps,
  WebAccordionTriggerProps,
} from "./web.types";

interface AccordionContextValue {
  readonly type: AccordionType;
  readonly collapsible: boolean;
  readonly variant: AccordionVariant;
  readonly expandedValues: ReadonlySet<string>;
  readonly toggleValue: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

interface AccordionItemContextValue {
  readonly value: string;
  readonly disabled: boolean;
  readonly isExpanded: boolean;
  readonly contentId: string;
  readonly triggerId: string;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function CaretDownIcon({
  style,
}: {
  readonly style?: CSSProperties;
}): ReactElement {
  return (
    <svg
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
      viewBox="0 0 24 24"
      width="16"
      style={style}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export const Accordion = forwardRef<HTMLDivElement, WebAccordionProps>(
  function Accordion(
    {
      type = "single",
      collapsible = true,
      value: controlledValue,
      defaultValue,
      onValueChange,
      variant = "default",
      children,
      style,
      className,
      ...restProps
    },
    ref,
  ): ReactElement {
    const isControlled = controlledValue !== undefined;

    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(() => {
      if (defaultValue !== undefined) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return [];
    });

    const currentValues = useMemo<ReadonlySet<string>>(() => {
      if (isControlled) {
        if (Array.isArray(controlledValue)) {
          return new Set(controlledValue);
        }
        return controlledValue ? new Set([controlledValue]) : new Set();
      }
      return new Set(uncontrolledValue);
    }, [isControlled, controlledValue, uncontrolledValue]);

    const toggleValue = useCallback(
      (itemValue: string) => {
        let nextValues: string[];

        if (type === "single") {
          const isCurrentlyOpen = currentValues.has(itemValue);
          if (isCurrentlyOpen) {
            nextValues = collapsible ? [] : [itemValue];
          } else {
            nextValues = [itemValue];
          }
        } else {
          const set = new Set(currentValues);
          if (set.has(itemValue)) {
            set.delete(itemValue);
          } else {
            set.add(itemValue);
          }
          nextValues = Array.from(set);
        }

        if (!isControlled) {
          setUncontrolledValue(nextValues);
        }

        if (onValueChange) {
          onValueChange(type === "single" ? (nextValues[0] ?? "") : nextValues);
        }
      },
      [type, collapsible, currentValues, isControlled, onValueChange],
    );

    const contextValue = useMemo<AccordionContextValue>(
      () => ({
        type,
        collapsible,
        variant,
        expandedValues: currentValues,
        toggleValue,
      }),
      [type, collapsible, variant, currentValues, toggleValue],
    );

    const containerStyle: CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: variant === "separated" ? "8px" : 0,
      borderRadius: variant === "bordered" ? "var(--x-radius)" : undefined,
      border: variant === "bordered" ? "1px solid var(--x-border)" : undefined,
      overflow: variant === "bordered" ? "hidden" : undefined,
      ...style,
    };

    return (
      <AccordionContext.Provider value={contextValue}>
        <div ref={ref} style={containerStyle} className={className} {...restProps}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);

export const AccordionItem = forwardRef<HTMLDivElement, WebAccordionItemProps>(
  function AccordionItem(
    { value, disabled = false, children, style, className, ...restProps },
    ref,
  ): ReactElement {
    const rootContext = useContext(AccordionContext);
    const id = useId();
    const contentId = `accordion-content-${id}`;
    const triggerId = `accordion-trigger-${id}`;

    const isExpanded = rootContext ? rootContext.expandedValues.has(value) : false;

    const itemContext = useMemo<AccordionItemContextValue>(
      () => ({
        value,
        disabled,
        isExpanded,
        contentId,
        triggerId,
      }),
      [value, disabled, isExpanded, contentId, triggerId],
    );

    const variant = rootContext?.variant ?? "default";

    const itemStyle: CSSProperties = {
      borderBottom:
        variant === "default" || variant === "bordered"
          ? "1px solid var(--x-border)"
          : undefined,
      borderRadius: variant === "separated" ? "var(--x-radius)" : undefined,
      border: variant === "separated" ? "1px solid var(--x-border)" : undefined,
      backgroundColor: variant === "separated" ? "var(--x-surface-1)" : "transparent",
      overflow: "hidden",
      ...style,
    };

    return (
      <AccordionItemContext.Provider value={itemContext}>
        <div ref={ref} style={itemStyle} className={className} {...restProps}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  WebAccordionTriggerProps
>(function AccordionTrigger(
  {
    disabled: itemDisabledOverride,
    showCaret = true,
    children,
    style,
    className,
    ...restProps
  },
  ref,
): ReactElement {
  const rootContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!rootContext || !itemContext) {
    throw new Error("AccordionTrigger must be used within an Accordion and AccordionItem");
  }

  const isDisabled = itemDisabledOverride ?? itemContext.disabled;
  const isExpanded = itemContext.isExpanded;

  const triggerStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    background: "none",
    border: "none",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.4 : 1,
    color: "var(--x-text)",
    fontSize: "14px",
    fontWeight: 400,
    textAlign: "left",
    transition: "color var(--x-motion-duration-fast) var(--x-motion-ease-out)",
    ...style,
  };

  const caretStyle: CSSProperties = {
    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform var(--x-motion-duration-moderate) var(--x-motion-ease-spring)",
    color: "var(--x-text-muted)",
    flexShrink: 0,
    marginLeft: "12px",
  };

  return (
    <button
      ref={ref}
      id={itemContext.triggerId}
      type="button"
      aria-expanded={isExpanded}
      aria-controls={itemContext.contentId}
      disabled={isDisabled}
      onClick={() => {
        if (!isDisabled) {
          rootContext.toggleValue(itemContext.value);
        }
      }}
      style={triggerStyle}
      className={className}
      {...restProps}
    >
      <span>{children}</span>
      {showCaret && <CaretDownIcon style={caretStyle} />}
    </button>
  );
});

export const AccordionContent = forwardRef<
  HTMLDivElement,
  WebAccordionContentProps
>(function AccordionContent(
  { children, style, className, ...restProps },
  ref,
): ReactElement {
  const itemContext = useContext(AccordionItemContext);

  if (!itemContext) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }

  const isExpanded = itemContext.isExpanded;

  const wrapperStyle: CSSProperties = {
    display: "grid",
    gridTemplateRows: isExpanded ? "1fr" : "0fr",
    transition: "grid-template-rows var(--x-motion-duration-moderate) var(--x-motion-ease-spring)",
    ...style,
  };

  const innerStyle: CSSProperties = {
    overflow: "hidden",
  };

  const bodyStyle: CSSProperties = {
    padding: "0 16px 16px 16px",
    fontSize: "14px",
    lineHeight: 1.6,
    color: "var(--x-text-secondary)",
  };

  return (
    <div
      ref={ref}
      id={itemContext.contentId}
      role="region"
      aria-labelledby={itemContext.triggerId}
      hidden={!isExpanded}
      style={wrapperStyle}
      className={className}
      {...restProps}
    >
      <div style={innerStyle}>
        <div style={bodyStyle}>{children}</div>
      </div>
    </div>
  );
});
