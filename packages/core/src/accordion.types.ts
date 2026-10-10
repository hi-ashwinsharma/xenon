import type { ReactNode } from "react";

export type AccordionType = "single" | "multiple";
export type AccordionVariant = "default" | "bordered" | "separated";

export interface AccordionProps {
  readonly type?: AccordionType;
  readonly collapsible?: boolean;
  readonly value?: string | readonly string[];
  readonly defaultValue?: string | readonly string[];
  readonly onValueChange?: (value: string | readonly string[]) => void;
  readonly variant?: AccordionVariant;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface AccordionItemProps {
  readonly value: string;
  readonly disabled?: boolean;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface AccordionTriggerProps {
  readonly children?: ReactNode;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly showCaret?: boolean;
}

export interface AccordionContentProps {
  readonly children?: ReactNode;
  readonly className?: string;
}
