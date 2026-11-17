import test from "node:test";
import assert from "node:assert/strict";
import { absoluteUrl, serializeJsonLd, SITE_URL, socialProfiles } from "../src/lib/site.ts";

test("absolute URLs resolve against the production origin", () => {
  assert.equal(SITE_URL, "https://jurgenleka.com");
  assert.equal(absoluteUrl("/"), "https://jurgenleka.com/");
  assert.equal(absoluteUrl("/sitemap.xml"), "https://jurgenleka.com/sitemap.xml");
});

test("inline JSON-LD cannot close its script tag", () => {
  const html = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
  assert.ok(!html.includes("<"));
  assert.deepEqual(JSON.parse(html), { name: "</script><script>alert(1)</script>" });
});

test("profile links are absolute HTTPS URLs", () => {
  assert.ok(socialProfiles.length > 0);
  for (const { href } of socialProfiles) assert.match(href, /^https:\/\//);
});
