import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (relativePath: string): string =>
  readFileSync(new URL(relativePath, import.meta.url), 'utf8');

const indexHtml = read('./index.html');
const privacyHtml = read('./public/privacy.html');
const termsHtml = read('./public/terms.html');
const sitemap = read('./public/sitemap.xml');
const contactSource = read('./components/Contact.tsx');
const serviceDetailSource = read('./pages/ServiceDetailPage.tsx');
const pagesWorkflow = read('./.github/workflows/pages.yml');

describe('site audit remediation', () => {
  it('does not block first paint on external font CSS or an unrelated image preload', () => {
    expect(indexHtml).not.toContain('fonts.googleapis.com');
    expect(indexHtml).not.toContain('fonts.gstatic.com');
    expect(indexHtml).not.toContain('rel="preload"');
    expect(privacyHtml).not.toContain('fonts.googleapis.com');
    expect(termsHtml).not.toContain('fonts.googleapis.com');
  });

  it('ships browser-enforced policy metadata and legal-page favicons', () => {
    for (const html of [indexHtml, privacyHtml, termsHtml]) {
      expect(html).toContain('Content-Security-Policy');
      expect(html).toContain('strict-origin-when-cross-origin');
      expect(html).toContain('rel="icon"');
    }
  });

  it('labels modeled support examples without implying customer results', () => {
    expect(serviceDetailSource).toContain('支援設計のサンプル');
    expect(serviceDetailSource).toContain('特定顧客の実績紹介ではありません');
    expect(serviceDetailSource).not.toContain('公開している改善事例');
  });

  it('keeps the inquiry flow estimate-first without publishing a price table', () => {
    expect(serviceDetailSource).toContain('>お見積り</h2>');
    expect(serviceDetailSource).not.toContain('>料金</h2>');
  });

  it('uses calm public contact copy', () => {
    expect(contactSource).not.toContain('送信できない画面');
    expect(contactSource).toContain('ご都合のよい方法をお選びください');
  });

  it('keeps sitemap update evidence current for every canonical route', () => {
    const lastModifiedDates = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(
      (match) => match[1],
    );
    expect(lastModifiedDates).toHaveLength(8);
    expect(new Set(lastModifiedDates)).toEqual(new Set(['2026-08-08']));
  });

  it('supports optional privacy-first production analytics without a secret', () => {
    expect(pagesWorkflow).toContain('VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN');
    expect(indexHtml).toContain('https://static.cloudflareinsights.com');
  });
});
