import test from "node:test";
import assert from "node:assert/strict";
import {
  MAX_CONTACT_BODY_BYTES, guardContactRequest, readContactBody,
  validateContactHeaders, isContactPath, limitContactDelivery,
} from "../src/lib/contact-security.ts";

const origin = "https://jurgenleka.com";
function request(body = "{}", overrides = {}) {
  return new Request(`${origin}/api/send-email`, {
    method: "POST", body,
    headers: { Origin: origin, "Content-Type": "application/json", ...overrides },
    duplex: "half",
  });
}
const allowed = { limit: async () => ({ success: true }) };

test("same-origin JSON accepted, including charset", () => {
  assert.equal(validateContactHeaders(request()), null);
  assert.equal(validateContactHeaders(request("{}", { "Content-Type": "application/json; charset=utf-8" })), null);
});

for (const badOrigin of ["https://attacker.test", `${origin}.attacker.test`, "null", ""]) {
  test(`reject origin ${badOrigin || "missing"}`, () => {
    assert.equal(validateContactHeaders(request("{}", { Origin: badOrigin })).status, 403);
  });
}
test("reject cross-site browser metadata and non-JSON media", () => {
  assert.equal(validateContactHeaders(request("{}", { "Sec-Fetch-Site": "cross-site" })).status, 403);
  assert.equal(validateContactHeaders(request("{}", { "Content-Type": "text/plain" })).status, 415);
});
test("reject oversized declared length before reading", async () => {
  const res = await guardContactRequest(request("{}", { "Content-Length": `${MAX_CONTACT_BODY_BYTES + 1}` }), allowed);
  assert.equal(res.status, 413);
});
test("enforce bytes without Content-Length or with a false length", async () => {
  for (const headers of [{}, { "Content-Length": "2" }]) {
    const res = await guardContactRequest(request("x".repeat(MAX_CONTACT_BODY_BYTES + 1), headers), allowed);
    assert.equal(res.status, 413);
  }
});
test("enforce streamed multi-chunk byte count and cancel source", async () => {
  let pulls = 0, cancelled = false;
  const stream = new ReadableStream({
    pull(controller) { pulls++; controller.enqueue(new Uint8Array(8192)); },
    cancel() { cancelled = true; },
  });
  const res = await guardContactRequest(request(stream), allowed);
  assert.equal(res.status, 413);
  assert.equal(cancelled, true);
  assert.ok(pulls < 10);
});
test("UTF-8 byte bound is independent of JS character count", async () => {
  assert.equal(await readContactBody(request("é".repeat(MAX_CONTACT_BODY_BYTES / 2))), "é".repeat(MAX_CONTACT_BODY_BYTES / 2));
  const res = await guardContactRequest(request("é".repeat(MAX_CONTACT_BODY_BYTES / 2 + 1)), allowed);
  assert.equal(res.status, 413);
});
test("invalid UTF-8 is rejected, not silently replaced", async () => {
  assert.equal((await guardContactRequest(request(new Uint8Array([0xff])), allowed)).status, 400);
});
test("stalled bodies time out and cancel", async () => {
  let cancelled = false;
  const stream = new ReadableStream({ cancel() { cancelled = true; } });
  assert.equal((await guardContactRequest(request(stream), allowed)).status, 408);
  assert.equal(cancelled, true);
});
test("request limiter failure or missing binding fails closed", async () => {
  assert.equal((await guardContactRequest(request(), undefined)).status, 503);
  assert.equal((await guardContactRequest(request(), { limit: async () => { throw new Error("offline"); } })).status, 503);
});
test("rate-limit rejection includes Retry-After and no cache", async () => {
  const res = await guardContactRequest(request(), { limit: async () => ({ success: false }) });
  assert.equal(res.status, 429);
  assert.equal(res.headers.get("retry-after"), "60");
  assert.equal(res.headers.get("cache-control"), "no-store");
});
test("only Cloudflare's edge IP is used, ignoring spoofed forwarded IP", async () => {
  let key;
  const limiter = { limit: async (options) => { key = options.key; return { success: true }; } };
  const res = await guardContactRequest(request("{}", { "CF-Connecting-IP": "192.0.2.1", "X-Forwarded-For": "203.0.113.1" }), limiter);
  assert.equal(key, "contact-ip:192.0.2.1");
  assert.ok(res instanceof Request);
  assert.equal(res.headers.get("content-length"), "2");
  assert.equal(await res.text(), "{}");
});
test("encoded, case and slash variants are guarded", () => {
  for (const path of ["/api/send-email", "/api/send-email/", "/API/SEND-EMAIL", "/api/%73end-email", "/api%2fsend-email", "/api//send-email"]) {
    assert.equal(isContactPath(path), true, path);
  }
  for (const path of ["/api/send-email-other", "/api/%ZZ", "/"]) assert.equal(isContactPath(path), false);
});
test("unsupported contact method is rejected before framework dispatch", async () => {
  const res = await guardContactRequest(new Request(`${origin}/api/send-email`), allowed);
  assert.equal(res.status, 405);
  assert.equal(res.headers.get("allow"), "POST");
});
test("delivery requires both working limiters", async () => {
  assert.equal((await limitContactDelivery("person@example.com", undefined, allowed)).status, 503);
  assert.equal((await limitContactDelivery("person@example.com", allowed, undefined)).status, 503);
  assert.equal((await limitContactDelivery("person@example.com", { limit: async () => { throw new Error(); } }, allowed)).status, 503);
  assert.equal(await limitContactDelivery("person@example.com", allowed, allowed), null);
});
test("email counters are case-normalized hashes and site quota is shared", async () => {
  const emailKeys = [], siteKeys = [];
  const email = { limit: async ({ key }) => { emailKeys.push(key); return { success: true }; } };
  const site = { limit: async ({ key }) => { siteKeys.push(key); return { success: true }; } };
  await limitContactDelivery("Person@example.com", email, site);
  await limitContactDelivery("person@example.com", email, site);
  assert.equal(emailKeys[0], emailKeys[1]);
  assert.match(emailKeys[0], /^[a-f0-9]{64}$/);
  assert.deepEqual(siteKeys, ["contact-delivery", "contact-delivery"]);
});
test("rejected email does not consume the site counter", async () => {
  let calls = 0;
  const res = await limitContactDelivery("person@example.com", { limit: async () => ({ success: false }) }, { limit: async () => { calls++; return { success: true }; } });
  assert.equal(res.status, 429);
  assert.equal(calls, 0);
  assert.equal(res.headers.get("retry-after"), "60");
});
test("site limit blocks delivery even when email limit allows it", async () => {
  const res = await limitContactDelivery("person@example.com", allowed, { limit: async () => ({ success: false }) });
  assert.equal(res.status, 429);
});
