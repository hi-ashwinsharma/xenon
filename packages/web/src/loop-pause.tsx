"use client";

import { type ReactElement } from "react";
import { Pause, Play } from "@phosphor-icons/react";
import { Icon } from "./icon";
import { IconButton } from "./icon-button";

interface LoopPauseProps {
  readonly paused: boolean;
  readonly onToggle: () => void;
}

/** The visible pause control every guarded autoplay loop carries (WCAG 2.2.2). */
export function LoopPause({ paused, onToggle }: LoopPauseProps): ReactElement {
  return (
    <IconButton
      variant="ghost"
      size="sm"
      ariaLabel={paused ? "Play motion" : "Pause motion"}
      aria-pressed={paused}
      onClick={onToggle}
    >
      <Icon size="sm">{paused ? <Play /> : <Pause />}</Icon>
    </IconButton>
  );
}
