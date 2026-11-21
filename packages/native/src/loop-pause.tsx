import { type ReactElement } from "react";
import { Button } from "./button";

interface LoopPauseProps {
  readonly paused: boolean;
  readonly onToggle: () => void;
}

/** The visible pause control every guarded autoplay loop carries (WCAG 2.2.2). */
export function LoopPause({ paused, onToggle }: LoopPauseProps): ReactElement {
  return (
    <Button variant="ghost" size="sm" onPress={onToggle}>
      {paused ? "Play motion" : "Pause motion"}
    </Button>
  );
}
