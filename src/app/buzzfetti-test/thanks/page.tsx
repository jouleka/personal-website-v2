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
import Link from "next/link";

