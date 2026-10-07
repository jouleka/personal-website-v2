export const MAX_CONTACT_BODY_BYTES = 32 * 1024;
const BODY_TIMEOUT_MS = 5000;

class BodyError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function contactError(status: number, error: string) {
  return Response.json(
    { success: false, error },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export function validateContactHeaders(request: Request): Response | null {
  // Browsers send Origin on this JSON POST. Reject missing/null origins too.
  // This is a CSRF check; rate limits still protect against non-browser clients.
  if (
    request.headers.get("origin") !== new URL(request.url).origin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  ) {
    return contactError(403, "Please send your message from this website.");
  }
  if (
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  ) {
    return contactError(415, "Use a JSON request body.");
  }
  const length = request.headers.get("content-length");
  if (length !== null) {
    if (!/^\d+$/.test(length)) return contactError(400, "Invalid request body.");
    if (Number(length) > MAX_CONTACT_BODY_BYTES) {
      return contactError(413, "Your message is too large.");
    }
  }
  return null;
}

// Bound bytes while streaming, including chunked bodies and false/missing lengths.
// The Worker calls this before OpenNext's converter buffers the request.
export async function readContactBody(request: Request): Promise<string> {
  if (!request.body) throw new BodyError(400, "Invalid request body.");
  const reader = request.body.getReader();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new BodyError(408, "Request timed out.")), BODY_TIMEOUT_MS);
  });
  try {
    return await Promise.race([
      (async () => {
        const decoder = new TextDecoder("utf-8", { fatal: true });
        let bytes = 0;
        let text = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          bytes += value.byteLength;
          if (bytes > MAX_CONTACT_BODY_BYTES) {
            throw new BodyError(413, "Your message is too large.");
          }
          text += decoder.decode(value, { stream: true });
        }
        return text + decoder.decode();
      })(),
      timeout,
    ]);
  } finally {
    clearTimeout(timer);
    // Do not wait on an untrusted stream's cancellation hook.
    void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

export function contactBodyError(error: unknown): Response {
  return error instanceof BodyError
    ? contactError(error.status, error.message)
    : contactError(400, "Invalid request body.");
}

export function isContactPath(pathname: string): boolean {
  try {
    return decodeURIComponent(pathname).replace(/\/+/g, "/").replace(/\/$/, "").toLowerCase() ===
      "/api/send-email";
  } catch {
    return false;
  }
}

export async function guardContactRequest(
  request: Request,
  limiter: Pick<RateLimit, "limit"> | undefined,
): Promise<Request | Response> {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  }
  const invalidHeaders = validateContactHeaders(request);
  if (invalidHeaders) return invalidHeaders;
  // Missing/broken bindings must not silently enable unlimited email requests.
  if (!limiter) return contactError(503, "Message delivery is temporarily unavailable.");
  try {
    // Cloudflare sets this header at the edge. Never trust X-Forwarded-For.
    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const { success } = await limiter.limit({ key: `contact-ip:${ip}` });
    if (!success) {
      const response = contactError(429, "Please wait a minute before trying again.");
      response.headers.set("Retry-After", "60");
      return response;
    }
  } catch {
    return contactError(503, "Message delivery is temporarily unavailable.");
  }
  try {
    const body = await readContactBody(request);
    const headers = new Headers(request.headers);
    headers.set("content-length", String(new TextEncoder().encode(body).byteLength));
    return new Request(request.url, { method: "POST", headers, body, signal: request.signal });
  } catch (error) {
    return contactBodyError(error);
  }
}

export async function limitContactDelivery(
  email: string,
  emailLimiter: Pick<RateLimit, "limit"> | undefined,
  siteLimiter: Pick<RateLimit, "limit"> | undefined,
): Promise<Response | null> {
  if (!emailLimiter || !siteLimiter) {
    return contactError(503, "Message delivery is temporarily unavailable.");
  }
  try {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email.toLowerCase()));
    const key = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
    const emailLimit = await emailLimiter.limit({ key });
    const siteLimit = emailLimit.success
      ? await siteLimiter.limit({ key: "contact-delivery" })
      : { success: false };
    if (!siteLimit.success) {
      const response = contactError(429, "Please wait a minute before trying again.");
      response.headers.set("Retry-After", "60");
      return response;
    }
    return null;
  } catch {
    return contactError(503, "Message delivery is temporarily unavailable.");
  }
}
