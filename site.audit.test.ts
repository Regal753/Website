import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (relativePath: string): string =>
  readFileSync(new URL(relativePath, import.meta.url), 'utf8');

const indexHtml = read('./index.html');
const entrySource = read('./index.tsx');
const privacyHtml = read('./public/privacy.html');
const termsHtml = read('./public/terms.html');
const machoWalkerPrivacyHtml = read('./public/apps/machowalker/privacy/index.html');
const sitemap = read('./public/sitemap.xml');
const contactSource = read('./components/Contact.tsx');
const serviceDetailSource = read('./pages/ServiceDetailPage.tsx');
const homePageSource = read('./pages/HomePage.tsx');
const businessTrustSource = read('./components/BusinessTrust.tsx');
const footerSource = read('./components/Footer.tsx');
const heroSource = read('./components/Hero.tsx');
const corporateCopySource = [
  heroSource,
  read('./components/Header.tsx'),
  read('./components/Services.tsx'),
  read('./components/Cases.tsx'),
  read('./components/MusicRightsReview.tsx'),
  read('./components/TeamPreview.tsx'),
  businessTrustSource,
  read('./components/Process.tsx'),
  read('./components/BusinessFAQ.tsx'),
  read('./components/News.tsx'),
  read('./components/CompanyInfo.tsx'),
  contactSource,
  footerSource,
  read('./components/LegalRedirect.tsx'),
  serviceDetailSource,
  read('./site.config.ts'),
  read('./services.catalog.ts'),
  read('./App.tsx'),
].join('\n');
const corporateFontStyles = read('./styles/corporate-font.css');
const staticFontInjector = read('./scripts/inject-static-font-styles.mjs');
const pagesWorkflow = read('./.github/workflows/pages.yml');
const cloudflareHeaders = read('./public/_headers');

describe('site audit remediation', () => {
  it('does not block first paint on external font CSS or an unrelated image preload', () => {
    expect(indexHtml).not.toContain('fonts.googleapis.com');
    expect(indexHtml).not.toContain('fonts.gstatic.com');
    expect(indexHtml).not.toContain('rel="preload" as="image"');
    for (const html of [privacyHtml, termsHtml, machoWalkerPrivacyHtml]) {
      expect(html).not.toContain('fonts.googleapis.com');
      expect(html).not.toContain('fonts.gstatic.com');
    }
  });

  it('keeps the Vite module entry resolvable when a deployment base path is configured', () => {
    expect(indexHtml).toContain('src="/index.tsx"');
    expect(indexHtml).not.toContain('%BASE_URL%index.tsx');
  });

  it('self-hosts one corporate Japanese typeface across the SPA and legal pages', () => {
    expect(entrySource).toContain("./styles/corporate-font.css");
    expect(corporateFontStyles).toContain("font-family: 'Regalo Corporate Sans'");
    expect(corporateFontStyles).toContain('noto-sans-jp-regalo-home.woff2');
    expect(corporateFontStyles).toContain('noto-sans-jp-regalo-extra.woff2');
    expect(corporateFontStyles).toContain('font-display: swap');
    expect(corporateFontStyles).toContain('unicode-range:');
    expect(indexHtml).toContain("font-family: 'Regalo Corporate Sans'");
    expect(indexHtml).toContain('font-synthesis: none');
    expect(heroSource).toContain('corporate-display');
    expect(heroSource).not.toContain("tracking-[-0.04em]");
    for (const html of [privacyHtml, termsHtml, machoWalkerPrivacyHtml]) {
      expect(html).toContain('Regalo Corporate Sans');
      expect(html).toContain("style-src 'self' 'unsafe-inline'");
      expect(html).toContain("font-src 'self' data:");
    }
    expect(staticFontInjector).toContain("'privacy.html'");
    expect(staticFontInjector).toContain("'terms.html'");
    expect(staticFontInjector).toContain("'machowalker'");
    expect(staticFontInjector).toContain('rel="preload"');
    expect(staticFontInjector).toContain('as="font"');
  });

  it('ships browser-enforced policy metadata and legal-page favicons', () => {
    for (const html of [indexHtml, privacyHtml, termsHtml, machoWalkerPrivacyHtml]) {
      expect(html).toContain('Content-Security-Policy');
      expect(html).toContain('strict-origin-when-cross-origin');
      expect(html).toContain('rel="icon"');
    }
  });

  it('presents support examples without defensive disclaimers', () => {
    expect(serviceDetailSource).toContain('対応例');
    expect(serviceDetailSource).not.toContain('顧客実績ではありません');
    expect(serviceDetailSource).not.toContain('公開している改善事例');
  });

  it('keeps service images and publishes pre-contract scope information', () => {
    expect(serviceDetailSource).toContain('slideImagePaths.map');
    expect(serviceDetailSource).toContain('の掲載画像');
    expect(serviceDetailSource).not.toContain('業務イメージ');
    expect(serviceDetailSource).toContain('対象となる企業');
    expect(serviceDetailSource).toContain('ご相談時に必要な情報');
    expect(serviceDetailSource).toContain('対応範囲');
    expect(serviceDetailSource).toContain('対応可能な環境');
    expect(serviceDetailSource).not.toContain('>ギャラリー</h2>');
    expect(serviceDetailSource).not.toContain('>使用技術</h2>');
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
    expect(lastModifiedDates).toHaveLength(9);
    expect(lastModifiedDates.filter((date) => date === '2026-08-13')).toHaveLength(8);
    expect(lastModifiedDates.filter((date) => date === '2026-08-10')).toHaveLength(1);
  });

  it('publishes decision-ready corporate trust information without inventing customer proof', () => {
    expect(homePageSource).toContain('<BusinessTrust />');
    expect(businessTrustSource).toContain('法人情報と発注前の確認事項');
    expect(businessTrustSource).toContain('国税庁 法人番号公表サイト');
    expect(businessTrustSource).toContain('クラウドワークス公式メディア');
    expect(businessTrustSource).toContain('日本音楽出版社協会');
    expect(businessTrustSource).toContain("href: '#process'");
    expect(businessTrustSource).not.toMatch(/導入社数|顧客満足度|成功率|実績\s*\d+/);
    expect(footerSource).toContain('法人情報・外部確認先を見る');
    expect(footerSource).toContain('法人番号');
  });

  it('uses direct corporate headings and excludes vague campaign copy', () => {
    expect(corporateCopySource).toContain('現状確認と対応内容');
    expect(corporateCopySource).toContain('法人情報と発注前の確認事項');
    expect(corporateCopySource).toContain('課題別の対応内容と納品物');
    expect(corporateCopySource).toContain('ご発注までの流れ');

    for (const phrase of [
      'まずは、',
      '現在地',
      '稟議前',
      '止まらない運用',
      '一気通貫',
      '伴走',
      '現場で回る',
      '実務で回る',
      '相談の入口',
      '事業フェーズ',
      '最適な支援内容',
      '支援設計のサンプル',
      '京都発の実務チーム',
    ]) {
      expect(corporateCopySource).not.toContain(phrase);
    }
  });

  it('describes the legal entity in Organization structured data', () => {
    expect(indexHtml).toContain('"legalName": "株式会社Regalo"');
    expect(indexHtml).toContain('"foundingDate": "2024-06-10"');
    expect(indexHtml).toContain('"name": "塩田玲央"');
    expect(indexHtml).toContain('houjin-bangou.nta.go.jp');
    expect(indexHtml).toContain('crowdworks.jp/times/interview/28780/');
  });

  it('supports optional privacy-first production analytics without a secret', () => {
    expect(pagesWorkflow).toContain('VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN');
    expect(indexHtml).toContain('https://static.cloudflareinsights.com');
  });

  it('defines production response headers for the Cloudflare static deployment', () => {
    expect(cloudflareHeaders).toContain('Strict-Transport-Security: max-age=31536000');
    expect(cloudflareHeaders).toContain('X-Content-Type-Options: nosniff');
    expect(cloudflareHeaders).toContain('Referrer-Policy: strict-origin-when-cross-origin');
    expect(cloudflareHeaders).toContain("frame-ancestors 'none'");
    expect(indexHtml).toContain('https://contact-api.regalocom.net');
    expect(cloudflareHeaders).toContain('https://contact-api.regalocom.net');
    expect(cloudflareHeaders).toContain('https://*.workers.dev');
  });
});
