import type { Metadata } from "next";
import type { RootLayoutProps } from "./layout.types";
import { Analytics } from "@vercel/analytics/next";
import { XenonDocsProvider } from "./providers/XenonDocsProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xenon",
  description: "A minimalistic, hairline-crisp React UI kit.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      data-x-theme="dark"
      data-x-accent="lime"
      data-x-radius="5"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <XenonDocsProvider>{children}</XenonDocsProvider>
        <Analytics />
      </body>
    </html>
  );
}
