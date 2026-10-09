import type { ChangeEvent } from "react";

export interface TextareaProps {
  readonly value?: string;
  readonly defaultValue?: string;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly readOnly?: boolean;
  readonly invalid?: boolean;
  readonly autoGrow?: boolean;
  readonly minRows?: number;
  readonly maxRows?: number;
  readonly maxLength?: number;
  readonly showCount?: boolean;
  readonly onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  readonly className?: string;
}
