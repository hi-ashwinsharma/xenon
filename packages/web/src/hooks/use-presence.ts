import { useEffect, useState } from "react";

export type PresenceStatus = "entering" | "entered" | "exiting" | "exited";

export interface UsePresenceOptions {
  open: boolean;
  durationMs?: number;
}

export interface UsePresenceReturn {
  isMounted: boolean;
  status: PresenceStatus;
}

/**
 * Manages element presence in the DOM to enable exit animations before unmounting.
 */
export function usePresence({
  open,
  durationMs = 200,
}: UsePresenceOptions): UsePresenceReturn {
  const [isMounted, setIsMounted] = useState<boolean>(open);
  const [status, setStatus] = useState<PresenceStatus>(open ? "entered" : "exited");

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (open) {
      setIsMounted(true);
      setStatus("entering");
      // Double rAF ensures the browser paints the initial state before entering
      const frame1 = requestAnimationFrame(() => {
        const frame2 = requestAnimationFrame(() => {
          setStatus("entered");
        });
        timeoutId = frame2 as unknown as ReturnType<typeof setTimeout>;
      });
      timeoutId = frame1 as unknown as ReturnType<typeof setTimeout>;
    } else if (isMounted) {
      setStatus("exiting");
      timeoutId = setTimeout(() => {
        setIsMounted(false);
        setStatus("exited");
      }, durationMs);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        cancelAnimationFrame(timeoutId as unknown as number);
      }
    };
  }, [open, durationMs, isMounted]);

  return { isMounted, status };
}
