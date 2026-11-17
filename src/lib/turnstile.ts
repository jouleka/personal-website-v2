// Server-side Cloudflare Turnstile verification for the contact form.
// Kept free of framework and path-alias imports so `node --test` can load it.

export const TURNSTILE_SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
export const TURNSTILE_ACTION = "contact";
// Cloudflare documents a 2048-character maximum for widget tokens.
export const MAX_TURNSTILE_TOKEN_LENGTH = 2048;
const SITEVERIFY_TIMEOUT_MS = 5000;

// Cloudflare's public dummy secrets (always pass / always fail / already spent).
const TEST_SECRET = /^[123]x0+AA$/;
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

export type TurnstileResult = { ok: true } | { ok: false; status: number; error: string };

type SiteverifyResponse = {
  success?: unknown;
  action?: unknown;
  "error-codes"?: unknown;
};

export function isTurnstileTestSecret(secret: string): boolean {
  return TEST_SECRET.test(secret);
}

/** Validates the token's shape only; call before doing any other work. */
export function readTurnstileToken(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const token = value.trim();
  if (!token || token.length > MAX_TURNSTILE_TOKEN_LENGTH) return null;
  return token;
}

export async function verifyTurnstile(
  token: string,
  request: Request,
  secret: string | undefined,
  fetcher: typeof fetch = fetch,
): Promise<TurnstileResult> {
  if (!secret) {
    console.error("Contact verification not configured: missing TURNSTILE_SECRET_KEY");
    return { ok: false, status: 503, error: "Message delivery is temporarily unavailable." };
  }
  // A dummy secret baked in from a local .env file must never protect the live site.
  if (isTurnstileTestSecret(secret) && !LOCAL_HOSTS.has(new URL(request.url).hostname)) {
    console.error("Contact verification misconfigured: TURNSTILE_SECRET_KEY is a test key");
    return { ok: false, status: 503, error: "Message delivery is temporarily unavailable." };
  }

  // Cloudflare sets this header at the edge. Never trust X-Forwarded-For.
  const remoteip = request.headers.get("cf-connecting-ip");
  let outcome: SiteverifyResponse;
  try {
    const response = await fetcher(TURNSTILE_SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, ...(remoteip ? { remoteip } : {}) }),
      signal: AbortSignal.timeout(SITEVERIFY_TIMEOUT_MS),
    });
    if (!response.ok) throw new Error(`siteverify returned ${response.status}`);
    outcome = (await response.json()) as SiteverifyResponse;
  } catch (error) {
    console.error(`Contact verification unavailable: ${String((error as Error)?.message ?? error).slice(0, 200)}`);
    return { ok: false, status: 503, error: "Message delivery is temporarily unavailable." };
  }

  const codes = Array.isArray(outcome?.["error-codes"]) ? outcome["error-codes"].map(String) : [];
  if (outcome?.success !== true) {
    if (codes.some((code) => code.startsWith("missing-input-secret") || code.startsWith("invalid-input-secret"))) {
      console.error(`Contact verification misconfigured: ${codes.join(", ").slice(0, 200)}`);
      return { ok: false, status: 503, error: "Message delivery is temporarily unavailable." };
    }
    if (codes.includes("timeout-or-duplicate")) {
      return { ok: false, status: 403, error: "The verification check expired. Please try again." };
    }
    return { ok: false, status: 403, error: "We couldn't verify you're human. Please try again." };
  }
  // Dummy secrets do not echo the widget's action, so only enforce it for real keys.
  if (!isTurnstileTestSecret(secret) && outcome.action !== TURNSTILE_ACTION) {
    return { ok: false, status: 403, error: "We couldn't verify you're human. Please try again." };
  }
  return { ok: true };
}
