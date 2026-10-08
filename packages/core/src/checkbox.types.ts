import type { ReactNode } from "react";

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps {
  /**
   * Controlled checked state.
   */
  checked?: boolean;
  /**
   * Default checked state for uncontrolled usage.
   */
  defaultChecked?: boolean;
  /**
   * Callback fired when checked state toggles.
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Indeterminate visual state (renders a horizontal line indicator).
   */
  indeterminate?: boolean;
  /**
   * Disabled interaction state.
   */
  disabled?: boolean;
  /**
   * Invalid / error state.
   */
  error?: boolean;
  /**
   * Size token tier: sm (16px), md (20px), lg (24px). Defaults to "md".
   */
  size?: CheckboxSize;
  /**
   * Accessible text label placed adjacent to the indicator.
   */
  label?: ReactNode;
  /**
   * Secondary supporting text placed beneath the label.
   */
  description?: ReactNode;
  /**
   * HTML form input name.
   */
  name?: string;
  /**
   * HTML form input value.
   */
  value?: string;
  /**
   * Explicit accessible label if label prop is omitted.
   */
  "aria-label"?: string;
  /**
   * Form element ID.
   */
  id?: string;
}
