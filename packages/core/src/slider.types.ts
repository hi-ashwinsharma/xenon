export type SliderSize = "sm" | "md" | "lg";

export interface SliderProps {
  /**
   * Controlled current numeric value.
   */
  value?: number;
  /**
   * Default numeric value for uncontrolled usage.
   */
  defaultValue?: number;
  /**
   * Minimum permitted value. Defaults to 0.
   */
  min?: number;
  /**
   * Maximum permitted value. Defaults to 100.
   */
  max?: number;
  /**
   * Step increment granularity. Defaults to 1.
   */
  step?: number;
  /**
   * Callback fired as value changes during drag or keyboard interaction.
   */
  onValueChange?: (value: number) => void;
  /**
   * Callback fired when value interaction finishes (drag release).
   */
  onValueCommit?: (value: number) => void;
  /**
   * Disabled interaction state.
   */
  disabled?: boolean;
  /**
   * Size tier controlling track thickness and thumb diameter. Defaults to "md".
   */
  size?: SliderSize;
  /**
   * Explicit accessible label.
   */
  "aria-label"?: string;
  /**
   * Form element name.
   */
  name?: string;
  /**
   * Form element ID.
   */
  id?: string;
}
