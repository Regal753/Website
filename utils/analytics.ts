type EventParams = Record<string, string | number | boolean | undefined>;

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

export const trackEvent = (eventName: string, params?: EventParams): void => {
  if (typeof window === 'undefined') return;
  const payload = sanitizeParams(params);

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...payload });
  }

  // Keep visibility during MVP phase even without analytics integration.
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info('[trackEvent]', eventName, payload);
  }
};

