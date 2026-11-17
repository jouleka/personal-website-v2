import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Buzzfetti test visit completed",
  description: "The goal page for the unlisted Buzzfetti analytics test on Jurgen Leka's portfolio.",
  path: "/buzzfetti-test/thanks",
});

export default function TrackingTestCompletePage() {
  return (
    <>
      <h1 className="text-4xl font-semibold">Test visit completed</h1>
      <p>If you allowed analytics, Buzzfetti can report this visit reaching the test goal.
        This does not submit the contact form or send an email.</p>
      <Link className="inline-block underline" href="/buzzfetti-test" prefetch={false}>Return to the test page</Link>
    </>
  );
}
