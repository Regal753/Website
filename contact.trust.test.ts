import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const contactSource = readFileSync(new URL('./components/Contact.tsx', import.meta.url), 'utf8');
const envExample = readFileSync(new URL('./.env.example', import.meta.url), 'utf8');

describe('contact trust boundary', () => {
  it('uses the first-party contact API by default', () => {
    expect(contactSource).toContain("return configured || '/api/contact'");
    expect(contactSource).not.toContain('formsubmit.co');
    expect(contactSource).not.toContain('contact_submit_fallback');
  });

  it('does not advertise an automatic third-party fallback', () => {
    expect(envExample).not.toContain('VITE_CONTACT_ENABLE_LEGACY_FALLBACK');
    expect(envExample).not.toContain('VITE_CONTACT_LEGACY_ENDPOINT');
  });
});
