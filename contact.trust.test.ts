import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const contactSource = readFileSync(new URL('./components/Contact.tsx', import.meta.url), 'utf8');
const envExample = readFileSync(new URL('./.env.example', import.meta.url), 'utf8');

describe('contact trust boundary', () => {
  it('fails closed when the first-party contact API is not configured', () => {
    expect(contactSource).toContain('const CONFIGURED_CONTACT_ENDPOINT');
    expect(contactSource).not.toContain("|| '/api/contact'");
    expect(contactSource).toContain('data-contact-fallback="active"');
    expect(contactSource).toContain("payload?.accepting === true");
    expect(contactSource).not.toContain('formsubmit.co');
    expect(contactSource).not.toContain('contact_submit_fallback');
  });

  it('keeps third-party contact paths explicit and user-selected', () => {
    expect(envExample).not.toContain('VITE_CONTACT_ENABLE_LEGACY_FALLBACK');
    expect(envExample).not.toContain('VITE_CONTACT_LEGACY_ENDPOINT');
    expect(contactSource).toContain('Googleフォームで問い合わせる');
    expect(contactSource).toContain('メールで問い合わせる');
  });
});
