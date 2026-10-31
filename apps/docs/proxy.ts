import { NextResponse, type NextRequest } from "next/server";
import { AppRoutes } from "@xenon/core";
import { LAUNCH_AT_MS, LAUNCH_NOW_HEADER } from "./app/launch/launch.config";

const MS_PER_SECOND = 1000;

function isAgentEndpoint(pathname: string): boolean {
  return (
    pathname === AppRoutes.llms ||
    pathname === AppRoutes.llmsFull ||
    pathname === AppRoutes.registry ||
    pathname.startsWith(`${AppRoutes.registry}/`)
  );
}

export function proxy(request: NextRequest): NextResponse {
  const now = Date.now();
  const { pathname } = request.nextUrl;

  if (now >= LAUNCH_AT_MS) {
    return pathname === AppRoutes.launch
      ? NextResponse.redirect(new URL(AppRoutes.home, request.url))
      : NextResponse.next();
  }

  const headers = {
    "Cache-Control": "no-store",
    [LAUNCH_NOW_HEADER]: String(now),
  };

  // Agents and the CLI expect JSON or text, so they get a retryable status.
  if (isAgentEndpoint(pathname)) {
    return NextResponse.json(
      { error: "Xenon has not launched yet." },
      {
        status: 503,
        headers: {
          ...headers,
          "Retry-After": String(
            Math.ceil((LAUNCH_AT_MS - now) / MS_PER_SECOND),
          ),
        },
      },
    );
  }

  return NextResponse.rewrite(new URL(AppRoutes.launch, request.url), {
    headers,
  });
}

export const config = {
  matcher: "/((?!_next/|__next|favicon.ico).*)",
};
