import type { ReactElement } from "react";
import type { Metadata } from "next";
import { LaunchCountdown } from "./LaunchCountdown";
import { LAUNCH_AT_MS } from "./launch.config";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const launchDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

export default function LaunchPage(): ReactElement {
  return (
    <LaunchCountdown
      launchLabel={`${launchDateFormat.format(LAUNCH_AT_MS)} IST`}
    />
  );
}
