import type { ReactNode } from "react";

export type RadioSize = "sm" | "md" | "lg";
export type RadioOrientation = "vertical" | "horizontal";

export interface RadioGroupProps {
  /**
   * Controlled value of the selected radio item.
   */
  value?: string;
  /**
   * Default selected value for uncontrolled usage.
   */
  defaultValue?: string;
  /**
   * Callback fired when selected radio value changes.
   */
  onValueChange?: (value: string) => void;
  /**
   * Form control name shared across all radio items.
   */
  name?: string;
  /**
   * Layout orientation for the group. Defaults to "vertical".
   */
  orientation?: RadioOrientation;
  /**
   * Size tier applied to child radio items. Defaults to "md".
   */
  size?: RadioSize;
  /**
   * Disabled state applied to the entire group.
   */
  disabled?: boolean;
  /**
   * Accessible group label.
   */
  "aria-label"?: string;
  /**
   * Radio items or layout children.
   */
  children?: ReactNode;
}

export interface RadioProps {
  /**
   * Distinct value for this radio option.
   */
  value: string;
  /**
   * Text label placed adjacent to the circular indicator.
   */
  label?: ReactNode;
  /**
   * Secondary supporting text placed beneath the label.
   */
  description?: ReactNode;
  /**
   * Disabled state for this specific radio option.
   */
  disabled?: boolean;
  /**
   * Size override if not inherited from parent RadioGroup.
   */
  size?: RadioSize;
  /**
   * Explicit accessible label if label prop is omitted.
   */
  "aria-label"?: string;
  /**
   * Element ID.
   */
  id?: string;
}

export interface RadioContextValue {
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  size?: RadioSize;
}
