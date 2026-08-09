type EventParams = Record<string, string | number | boolean | undefined>;

const CLOUDFLARE_BEACON_URL = 'https://static.cloudflareinsights.com/beacon.min.js';
const CLOUDFLARE_TOKEN = (import.meta.env.VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN || '').trim();
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{16,128}$/;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const sanitizeParams = (params?: EventParams): Record<string, string | number | boolean> => {
  if (!params) return {};
  const entries = Object.entries(params).filter(([, value]) => value !== undefined);
  return Object.fromEntries(entries) as Record<string, string | number | boolean>;
};

export const initializeAnalytics = (): boolean => {
  if (typeof document === 'undefined' || !TOKEN_PATTERN.test(CLOUDFLARE_TOKEN)) return false;
  if (document.querySelector<HTMLScriptElement>('script[data-regalo-analytics="cloudflare"]')) return true;

  const script = document.createElement('script');
  script.defer = true;
  script.src = CLOUDFLARE_BEACON_URL;
  script.dataset.regaloAnalytics = 'cloudflare';
  script.dataset.cfBeacon = JSON.stringify({ token: CLOUDFLARE_TOKEN });
  document.head.appendChild(script);
  return true;
};

export const trackEvent = (eventName: string, params?: EventParams): void => {
  if (typeof window === 'undefined') return;
  const payload = sanitizeParams(params);

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...payload });
  }

  // Keep local visibility without sending personal or form-field data.
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info('[trackEvent]', eventName, payload);
  }
};

