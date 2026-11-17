import test from "node:test";
import assert from "node:assert/strict";
import {
  MAX_TURNSTILE_TOKEN_LENGTH, TURNSTILE_SITEVERIFY_URL, readTurnstileToken, verifyTurnstile,
} from "../src/lib/turnstile.ts";

const REAL_SECRET = "0x4AAAAAAA-not-a-real-secret";
const TEST_SECRET = "1x0000000000000000000000000000000AA";

function request(url = "https://jurgenleka.com/api/send-email", headers = { "CF-Connecting-IP": "203.0.113.7" }) {
  return new Request(url, { method: "POST", headers });
}
function siteverify(body, status = 200) {
  const calls = [];
  const fetcher = async (url, init) => {
    calls.push({ url, init, body: JSON.parse(init.body) });
    return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  };
  return { fetcher, calls };
}
// Silence expected configuration errors in test output.
test.beforeEach(() => { test.mock.method(console, "error", () => {}); });
test.afterEach(() => { test.mock.restoreAll(); });

test("token shape: missing, empty, non-string, and oversized tokens are rejected", () => {
  for (const value of [undefined, null, "", "   ", 42, {}, ["t"], "x".repeat(MAX_TURNSTILE_TOKEN_LENGTH + 1)]) {
    assert.equal(readTurnstileToken(value), null);
  }
  assert.equal(readTurnstileToken(" token "), "token");
});

test("valid token posts secret, response, and CF-Connecting-IP to siteverify", async () => {
  const { fetcher, calls } = siteverify({ success: true, action: "contact" });
  assert.deepEqual(await verifyTurnstile("tok", request(), REAL_SECRET, fetcher), { ok: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, TURNSTILE_SITEVERIFY_URL);
  assert.equal(calls[0].init.method, "POST");
  assert.deepEqual(calls[0].body, { secret: REAL_SECRET, response: "tok", remoteip: "203.0.113.7" });
});

test("remoteip is omitted without CF-Connecting-IP and X-Forwarded-For is ignored", async () => {
  const { fetcher, calls } = siteverify({ success: true, action: "contact" });
  await verifyTurnstile("tok", request(undefined, { "X-Forwarded-For": "198.51.100.1" }), REAL_SECRET, fetcher);
  assert.equal("remoteip" in calls[0].body, false);
});

test("invalid, expired, or wrong-action tokens are rejected with 403", async () => {
  for (const body of [
    { success: false, "error-codes": ["invalid-input-response"] },
    { success: false, "error-codes": ["timeout-or-duplicate"] },
    { success: "true", action: "contact" },
    { success: true, action: "login" },
    {},
  ]) {
    const result = await verifyTurnstile("tok", request(), REAL_SECRET, siteverify(body).fetcher);
    assert.equal(result.ok, false);
    assert.equal(result.status, 403);
  }
  const expired = await verifyTurnstile("tok", request(), REAL_SECRET,
    siteverify({ success: false, "error-codes": ["timeout-or-duplicate"] }).fetcher);
  assert.match(expired.error, /expired/);
});

test("missing secret fails closed without calling siteverify", async () => {
  const { fetcher, calls } = siteverify({ success: true, action: "contact" });
  for (const secret of [undefined, ""]) {
    assert.equal((await verifyTurnstile("tok", request(), secret, fetcher)).status, 503);
  }
  assert.equal(calls.length, 0);
});

test("a rejected secret is a 503 configuration error, not a user error", async () => {
  const result = await verifyTurnstile("tok", request(), REAL_SECRET,
    siteverify({ success: false, "error-codes": ["invalid-input-secret"] }).fetcher);
  assert.equal(result.status, 503);
});

test("siteverify outages and non-JSON replies fail closed with 503", async () => {
  const failures = [
    async () => { throw new TypeError("network down"); },
    async () => new Response("oops", { status: 500 }),
    async () => new Response("not json", { status: 200 }),
  ];
  for (const fetcher of failures) {
    assert.equal((await verifyTurnstile("tok", request(), REAL_SECRET, fetcher)).status, 503);
  }
});

test("Cloudflare dummy secrets work on localhost only", async () => {
  const { fetcher, calls } = siteverify({ success: true, action: "" });
  for (const url of ["http://localhost:3000/api/send-email", "http://127.0.0.1:8787/api/send-email"]) {
    assert.deepEqual(await verifyTurnstile("XXXX.DUMMY.TOKEN.XXXX", request(url), TEST_SECRET, fetcher), { ok: true });
  }
  const live = await verifyTurnstile("XXXX.DUMMY.TOKEN.XXXX", request(), TEST_SECRET, fetcher);
  assert.equal(live.status, 503);
  assert.equal(calls.length, 2);
});
