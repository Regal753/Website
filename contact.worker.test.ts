import { afterEach, describe, expect, it, vi } from 'vitest';
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

const googleFormEnv = {
  ...baseEnv,
  CONTACT_GOOGLE_FORM_ACTION:
    'https://docs.google.com/forms/d/e/1FAIpQLS-example/formResponse',
  CONTACT_GOOGLE_FORM_NAME_FIELD: 'entry.100',
  CONTACT_GOOGLE_FORM_EMAIL_FIELD: 'entry.200',
  CONTACT_GOOGLE_FORM_TYPE_FIELD: 'entry.300',
  CONTACT_GOOGLE_FORM_MESSAGE_FIELD: 'entry.400',
};

afterEach(() => {
  vi.restoreAllMocks();
});

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

  it('accepts inquiries through the configured Google Form relay without a mail API key', async () => {
    const healthResponse = await contactWorker.fetch(
      new Request('https://www.regalocom.net/api/contact'),
      googleFormEnv,
      context
    );
    expect(await healthResponse.json()).toMatchObject({
      ok: true,
      accepting: true,
      delivery: 'google_forms',
    });

    const googleFormFetch = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(null, { status: 200 }));
    const formData = new FormData();
    formData.set('name', 'テスト太郎');
    formData.set('company', '株式会社テスト');
    formData.set('email', 'test@example.com');
    formData.set('phone', '070-0000-0000');
    formData.set('inquiry_type', 'YouTube BGM・権利運用の初期診断について');
    formData.set('message', '問い合わせ本文');

    const response = await contactWorker.fetch(
      new Request('https://www.regalocom.net/api/contact', {
        method: 'POST',
        headers: { Origin: 'https://www.regalocom.net' },
        body: formData,
      }),
      googleFormEnv,
      context
    );
    const payload = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({ ok: true, autoReplySent: false });
    expect(googleFormFetch).toHaveBeenCalledTimes(1);
    const [, options] = googleFormFetch.mock.calls[0];
    const submitted = new URLSearchParams(String(options?.body));
    expect(submitted.get('entry.100')).toBe('テスト太郎');
    expect(submitted.get('entry.200')).toBe('test@example.com');
    expect(submitted.get('entry.300')).toBe('YouTube運用について');
    expect(submitted.get('entry.400')).toContain('株式会社テスト');
    expect(submitted.get('entry.400')).toContain('問い合わせ本文');
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

  it('rejects browser requests from an unapproved origin before delivery', async () => {
    const googleFormFetch = vi.spyOn(globalThis, 'fetch');
    const response = await contactWorker.fetch(
      new Request('https://www.regalocom.net/api/contact', {
        method: 'POST',
        headers: {
          Origin: 'https://example.invalid',
          'Content-Type': 'multipart/form-data; boundary=test',
        },
        body: '--test--',
      }),
      googleFormEnv,
      context
    );

    expect(response.status).toBe(403);
    expect(await response.json()).toMatchObject({ ok: false, error: 'forbidden_origin' });
    expect(googleFormFetch).not.toHaveBeenCalled();
  });
});
