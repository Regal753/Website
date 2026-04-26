import { describe, expect, it, vi } from 'vitest';
import worker from './index';

const createContext = () => ({
  waitUntil: vi.fn(),
});

const createValidFormData = () => {
  const formData = new FormData();
  formData.set('name', 'Codex Review');
  formData.set('email', 'review@example.com');
  formData.set('inquiry_type', 'Website review');
  formData.set('message', 'Testing contact worker configuration.');
  return formData;
};

describe('contact worker', () => {
  it('returns a GET health response for route verification', async () => {
    const response = await worker.fetch(
      new Request('https://www.regalocom.net/api/contact'),
      {} as never,
      createContext()
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      service: 'regalo-contact-api',
      configured: false,
    });
  });

  it('fails closed when the rate-limit KV binding is missing', async () => {
    const response = await worker.fetch(
      new Request('https://www.regalocom.net/api/contact', {
        method: 'POST',
        body: createValidFormData(),
      }),
      {
        RESEND_API_KEY: 'test-resend-key',
        CONTACT_TO_EMAIL: 'contact@regalocom.net',
        CONTACT_FROM_EMAIL: 'Regalo Contact <noreply@regalocom.net>',
      } as never,
      createContext()
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      error: 'rate_limit_not_configured',
      reason: 'not_configured',
    });
  });
});
