import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const privacyPage = readFileSync(
  new URL('./public/apps/machowalker/privacy/index.html', import.meta.url),
  'utf8',
);

describe('MachoWalker app privacy page', () => {
  it('uses the stable canonical App Store URL', () => {
    expect(privacyPage).toContain(
      '<link rel="canonical" href="https://www.regalocom.net/apps/machowalker/privacy/" />',
    );
  });

  it('states the current local-only data behavior and support contact', () => {
    expect(privacyPage).toContain('当社または第三者のサーバーへ送信しません');
    expect(privacyPage).toContain('利用者情報を収集しません');
    expect(privacyPage).toContain('contact@regalocom.net');
    expect(privacyPage).toContain('Motion &amp; Fitness');
  });
});
