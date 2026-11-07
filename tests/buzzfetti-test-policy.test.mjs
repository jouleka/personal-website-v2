import test from "node:test";
import assert from "node:assert/strict";
import { isBuzzfettiTestPath, securityHeaders } from "../security-headers.mjs";

test("the test permits the Buzzfetti script and collector without widening normal portfolio policy", () => {
  const normal = securityHeaders()["Content-Security-Policy"];
  const tracking = securityHeaders(false, true)["Content-Security-Policy"];
  assert.ok(!normal.includes("buzzfetti.torotoro.uk"));
  for (const directive of ["script-src", "connect-src"]) {
    const rule = tracking.split("; ").find((entry) => entry.startsWith(directive + " "));
    assert.ok(rule.includes("https://buzzfetti.torotoro.uk"));
    assert.ok(!rule.includes("*.torotoro.uk"));
  }
  assert.equal(isBuzzfettiTestPath("/"), false);
  assert.equal(isBuzzfettiTestPath("/buzzfetti-test-other"), false);
  assert.equal(isBuzzfettiTestPath("/buzzfetti-test"), true);
  assert.equal(isBuzzfettiTestPath("/buzzfetti-test/thanks"), true);
});
