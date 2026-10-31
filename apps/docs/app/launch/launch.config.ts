// 1 November 2026, 12:00 pm IST. NEXT_PUBLIC_XENON_LAUNCH_AT overrides it per
// environment, for example a past date to review the real site on a preview.
const DEFAULT_LAUNCH_AT = "2026-11-01T12:00:00+05:30";

const configuredLaunchAt = Date.parse(
  process.env.NEXT_PUBLIC_XENON_LAUNCH_AT ?? "",
);

export const LAUNCH_AT_MS: number = Number.isNaN(configuredLaunchAt)
  ? Date.parse(DEFAULT_LAUNCH_AT)
  : configuredLaunchAt;

// Present only on gated responses, carrying the server clock in epoch ms.
export const LAUNCH_NOW_HEADER = "x-xenon-launch-now";
