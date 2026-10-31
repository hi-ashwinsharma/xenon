"use client";

import { useEffect, useState, type ReactElement } from "react";
import { Heading, Text } from "@xenon/web";
import { LAUNCH_AT_MS, LAUNCH_NOW_HEADER } from "./launch.config";
import type { LaunchCountdownProps, LaunchUnitProps } from "./launch.types";

const TICK_MS = 250;
const RELEASE_PROBE_MS = 2000;
const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;

function LaunchUnit({ label, value }: LaunchUnitProps): ReactElement {
  const digits = String(value ?? 0).padStart(2, "0");

  return (
    <div className="x-launch-unit">
      <Text as="span" styleKey="display" tabular className="x-launch-digits">
        {digits.split("").map((digit, index) => (
          <span
            key={`${digits.length - index}-${digit}`}
            className="x-launch-digit"
          >
            {digit}
          </span>
        ))}
      </Text>
      <Text as="span" styleKey="caption1" tone="muted">
        {label}
      </Text>
    </div>
  );
}

export function LaunchCountdown({
  launchLabel,
}: LaunchCountdownProps): ReactElement {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    let clockOffset = 0;
    let lastProbeAt = 0;

    // The server decides when the gate opens, so a wrong device clock can
    // neither reveal the site early nor leave a visitor stuck at zero.
    const probeServer = async (): Promise<void> => {
      lastProbeAt = Date.now();
      try {
        const response = await fetch(window.location.href, {
          method: "HEAD",
          cache: "no-store",
        });
        if (!response.ok) return;
        const serverNow = response.headers.get(LAUNCH_NOW_HEADER);
        if (serverNow === null) {
          window.location.reload();
          return;
        }
        clockOffset = Number(serverNow) - Date.now();
      } catch {
        // Offline: keep counting on the device clock and probe again later.
      }
    };

    const tick = (): void => {
      const msLeft = LAUNCH_AT_MS - (Date.now() + clockOffset);
      setSecondsLeft(Math.max(0, Math.ceil(msLeft / MS_PER_SECOND)));
      if (msLeft <= 0 && Date.now() - lastProbeAt >= RELEASE_PROBE_MS) {
        void probeServer();
      }
    };

    const handleVisibilityChange = (): void => {
      if (document.visibilityState === "visible") void probeServer();
    };

    void probeServer();
    const interval = window.setInterval(tick, TICK_MS);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const total = secondsLeft ?? 0;
  const hours = Math.floor(total / SECONDS_PER_HOUR);
  const minutes = Math.floor((total % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const seconds = total % SECONDS_PER_MINUTE;

  return (
    <main className="x-launch">
      <Heading level={1} styleKey="title2">
        Xenon
      </Heading>
      <div
        role="timer"
        aria-label={`${hours} hours, ${minutes} minutes and ${seconds} seconds until launch`}
        className="x-launch-timer"
        data-ready={secondsLeft !== null}
      >
        <LaunchUnit label="Hours" value={hours} />
        <LaunchUnit label="Minutes" value={minutes} />
        <LaunchUnit label="Seconds" value={seconds} />
      </div>
      <Text styleKey="subhead" tone="muted" align="center">
        {secondsLeft === 0 ? "Opening now" : `Public launch on ${launchLabel}`}
      </Text>
    </main>
  );
}
