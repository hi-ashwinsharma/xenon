import type { ReactNode } from "react";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps {
  /**
   * Controlled on/off state.
   */
  checked?: boolean;
  /**
   * Default state for uncontrolled usage.
   */
  defaultChecked?: boolean;
  /**
   * Callback fired when on/off state toggles.
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Disabled interaction state.
   */
  disabled?: boolean;
  /**
   * Size scale: sm (36x20), md (46x26), lg (56x32). Defaults to "md".
   */
  size?: SwitchSize;
  /**
   * Accessible text label placed adjacent to the switch.
   */
  label?: ReactNode;
  /**
   * Supporting subtext.
   */
  description?: ReactNode;
  /**
   * Form element name.
   */
  name?: string;
  /**
   * Form element value.
   */
  value?: string;
  /**
   * Explicit accessibility label.
   */
  "aria-label"?: string;
  /**
   * Form element ID.
   */
  id?: string;
}
