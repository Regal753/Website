import { describe, expect, it } from 'vitest';
import contactWorker from './infrastructure/cloudflare/contact-worker/src/index';

const baseEnv = {
  RESEND_API_KEY: '',
  CONTACT_TO_EMAIL: 'contact@regalocom.net',
  CONTACT_FROM_EMAIL: 'Regalo Contact <noreply@regalocom.net>',
  CONTACT_ALLOWED_ORIGIN: 'https://www.regalocom.net',
};

const context = {
  waitUntil: (_promise: Promise<unknown>) => undefined,
};

describe('contact worker health endpoint', () => {
  it('fails closed when the mail provider is not configured', async () => {
    const response = await contactWorker.fetch(
      new Request('https://www.regalocom.net/api/contact', {
        headers: { Origin: 'https://www.regalocom.net' },
      }),
      baseEnv,
      context
    );
    const payload = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(503);
    expect(payload).toMatchObject({
      ok: false,
      accepting: false,
      error: 'server_not_configured',
    });
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('reports availability only when required mail settings exist', async () => {
    const response = await contactWorker.fetch(
      new Request('https://www.regalocom.net/api/contact'),
      { ...baseEnv, RESEND_API_KEY: 'test-key' },
      context
    );
    const payload = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      ok: true,
      accepting: true,
      service: 'regalo-contact-api',
    });
  });

  it('advertises GET in the CORS preflight response', async () => {
    const response = await contactWorker.fetch(
      new Request('https://www.regalocom.net/api/contact', {
        method: 'OPTIONS',
        headers: { Origin: 'https://www.regalocom.net' },
      }),
      baseEnv,
      context
    );

    expect(response.status).toBe(204);
    expect(response.headers.get('access-control-allow-methods')).toBe('GET, POST, OPTIONS');
    expect(response.headers.get('x-content-type-options')).toBe('nosniff');
  });
});
