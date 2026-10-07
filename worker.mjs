import nextWorker from "./.open-next/worker.js";
import { guardContactRequest, isContactPath } from "./src/lib/contact-security.ts";
import { securityHeaders } from "./security-headers.mjs";

/** @type {ExportedHandler<CloudflareEnv>} */
const worker = {
  async fetch(request, env, ctx) {
    let response;
    if (isContactPath(new URL(request.url).pathname)) {
      const guarded = await guardContactRequest(request, env.CONTACT_REQUEST_LIMITER);
      response = guarded instanceof Response
        ? guarded
        : await nextWorker.fetch(guarded, env, ctx);
    } else if (request.method !== "GET" && request.method !== "HEAD") {
      // This portfolio has no Server Actions or other write endpoints. Reject
      // unsolicited bodies before the framework's converter buffers them.
      response = new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
    } else {
      response = await nextWorker.fetch(request, env, ctx);
    }
    const headers = new Headers(response.headers);
    for (const [name, value] of Object.entries(securityHeaders())) headers.set(name, value);
    headers.delete("X-Powered-By");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};

export default worker;

export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./.open-next/worker.js";
