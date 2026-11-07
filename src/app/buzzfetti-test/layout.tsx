import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Buzzfetti tracking test",
  robots: { index: false, follow: false },
};

export default function TrackingTestLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        defer
        src="https://buzzfetti.torotoro.uk/analytics/tracker.js"
        data-site="1528b20c-a5f5-40de-b89f-64c4d530b074"
        data-install="Y9VZQHLln7Wx9fruOT1MFj65vxsCSHMQidPipUYiULw4QEmK0cXdOGAC9vEfIn4J"
      />
      <main className="mx-auto min-h-screen max-w-2xl space-y-6 px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-widest">Jurgen Leka · Tracking test</p>
        {children}
        <p className="text-sm opacity-70">
          This page tests optional Buzzfetti analytics. No analytics events are
          sent before you allow analytics. Change your choice with the Analytics preferences button.
          A test completion is not a real enquiry or customer conversion.
        </p>
        <Link className="inline-block underline" href="/" prefetch={false}>Back to the portfolio</Link>
      </main>
    </>
  );
}
