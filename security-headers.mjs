export function isBuzzfettiTestPath(pathname) {
  return pathname === "/buzzfetti-test" || pathname.startsWith("/buzzfetti-test/");
}

export function securityHeaders(development = false, buzzfettiTest = false) {
  // Next's static RSC bootstrap needs inline scripts, and motion uses inline CSS.
  // Restrict their origins without requiring dynamic rendering of the portfolio.
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${development ? " 'unsafe-eval'" : ""}${buzzfettiTest ? " https://buzzfetti.torotoro.uk" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${development ? " ws: wss:" : ""}${buzzfettiTest ? " https://buzzfetti.torotoro.uk" : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
  return {
    "Content-Security-Policy": csp,
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
    "Cross-Origin-Opener-Policy": "same-origin",
    ...(!development ? { "Strict-Transport-Security": "max-age=31536000" } : {}),
  };
}
