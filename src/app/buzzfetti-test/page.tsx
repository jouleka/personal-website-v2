import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Buzzfetti tracking test",
  description: "An unlisted page for testing consented Buzzfetti analytics on Jurgen Leka's portfolio.",
  path: "/buzzfetti-test",
});

export default function TrackingTestPage() {
  return (
    <>
      <h1 className="text-4xl font-semibold">Try Buzzfetti tracking</h1>
      <p>Allow or decline optional analytics using the controls below. After allowing,
        follow the link to test a complete visit through to the goal page.</p>
      <Link className="inline-block rounded-full bg-foreground px-6 py-3 text-background" href="/buzzfetti-test/thanks" prefetch={false}>
        Complete the test visit
      </Link>
    </>
  );
}
import Link from "next/link";

