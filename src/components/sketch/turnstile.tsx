"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Public sitekey. Production uses the jurgenleka.com widget; development and
// tests use Cloudflare's always-pass dummy key unless overridden.
export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  (process.env.NODE_ENV === "production" ? "0x4AAAAAAGFnmogNsf4eYC21" : "1x00000000000000000000AA");

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  scriptPromise ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile missing")));
    script.onerror = () => {
      scriptPromise = null;
      script.remove();
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export type TurnstileHandle = { reset: () => void };

type Props = {
  action: string;
  /** Receives a fresh token, or null when it expires, errors, or is reset. */
  onToken: (token: string | null) => void;
  /** Called when the widget cannot load or run, so the form can explain why. */
  onError: () => void;
  className?: string;
};

const Turnstile = forwardRef<TurnstileHandle, Props>(function Turnstile(
  { action, onToken, onError, className },
  ref,
) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  // Keep the latest callbacks without re-rendering the widget.
  const callbacks = useRef({ onToken, onError });
  useEffect(() => {
    callbacks.current = { onToken, onError };
  });

  useImperativeHandle(ref, () => ({
    reset() {
      callbacks.current.onToken(null);
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
    },
  }), []);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !container.current) return;
        widgetId.current = turnstile.render(container.current, {
          sitekey: TURNSTILE_SITE_KEY,
          action,
          theme: "light",
          size: "flexible",
          callback: (token: string) => callbacks.current.onToken(token),
          // The widget refreshes expired tokens itself; just drop the stale one.
          "expired-callback": () => callbacks.current.onToken(null),
          "timeout-callback": () => callbacks.current.onToken(null),
          "error-callback": () => {
            callbacks.current.onToken(null);
            callbacks.current.onError();
          },
        });
      })
      .catch(() => {
        if (!cancelled) callbacks.current.onError();
      });
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, [action]);

  return <div ref={container} className={className} />;
});

export default Turnstile;
