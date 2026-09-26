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
const cloudflareRedirects = read('./public/_redirects');
const siteWorkerConfig = read('./infrastructure/cloudflare/site-worker/wrangler.toml');
const appSource = read('./App.tsx');
const newsSource = read('./components/News.tsx');
const siteConfigSource = read('./site.config.ts');
const routeGeneratorSource = read('./scripts/generate-spa-routes.mjs');
const processSource = read('./components/Process.tsx');

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
    expect(contactSource).toContain('初回返信後に共有方法をご案内します');
    expect(contactSource).not.toContain('メールへ直接添付してください');
  });

  it('keeps sitemap update evidence current for every canonical route', () => {
    const lastModifiedDates = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(
      (match) => match[1],
    );
    expect(lastModifiedDates).toHaveLength(9);
    expect(lastModifiedDates.filter((date) => date === '2026-08-15')).toHaveLength(7);
    expect(lastModifiedDates.filter((date) => date === '2026-08-13')).toHaveLength(1);
    expect(lastModifiedDates.filter((date) => date === '2026-08-10')).toHaveLength(1);
  });

  it('publishes decision-ready corporate trust information without inventing customer proof', () => {
    expect(homePageSource).toContain('<BusinessTrust />');
    expect(homePageSource).not.toContain('<MusicRightsReview />');
    expect(businessTrustSource).toContain('法人情報と発注前の確認事項');
    expect(businessTrustSource).toContain('国税庁 法人番号公表サイト');
    expect(businessTrustSource).not.toContain('クラウドワークス公式メディア');
    expect(businessTrustSource).toContain('日本音楽出版社協会');
    expect(businessTrustSource).toContain("href: '#process'");
    expect(businessTrustSource).not.toMatch(/導入社数|顧客満足度|成功率|実績\s*\d+/);
    expect(footerSource).toContain('法人情報・外部確認先を見る');
    expect(footerSource).toContain('法人番号');
    expect(footerSource).toContain('電話受付 9:00-20:00');
    expect(footerSource).not.toContain('>お問い合わせ</Link>');
  });

  it('keeps service imagery and corporate trust information without duplicate proof cards', () => {
    expect(heroSource).not.toContain('主な確認内容');
    expect(heroSource).not.toContain('楽曲・権利情報と運用手順を整理');
    expect(heroSource).toContain('music-gallery-2.webp');
    expect(heroSource).not.toContain('PROOF_POINTS.map');
    expect(homePageSource).toContain('<BusinessTrust />');
    expect(processSource).not.toContain('お見積り前の確認事項');
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
    expect(indexHtml).toContain('"@id": "https://www.regalocom.net/#organization"');
    expect(indexHtml).toContain('"legalName": "株式会社Regalo"');
    expect(indexHtml).toContain('"foundingDate": "2024-06-10"');
    expect(indexHtml).toContain('"name": "塩田玲央"');
    expect(indexHtml).toContain('houjin-bangou.nta.go.jp');
    expect(indexHtml).toContain('crowdworks.jp/times/interview/28780/');
  });

  it('keeps legal pages aligned with the current corporate identity', () => {
    for (const html of [privacyHtml, termsHtml]) {
      expect(html).toContain('<span>株式会社Regalo</span>');
      expect(html).toContain('class="site-header"');
      expect(html).toContain('class="legal-footer"');
      expect(html).toContain('最終改定日：2026年8月15日');
      expect(html).not.toContain('京都発の実務チーム');
      expect(html).not.toMatch(/>\s*Regalo（以下「当社」）/);
    }
  });

  it('publishes service-specific social images and structured data', () => {
    expect(appSource).toContain("imagePath: `/${service.media.listImage}`");
    expect(appSource).toContain("'@type': 'Service'");
    expect(appSource).toContain("'@type': 'BreadcrumbList'");
    expect(routeGeneratorSource).toContain('/images/services/music-cover.webp');
    expect(routeGeneratorSource).toContain('/images/services/sns-cover.webp');
    expect(routeGeneratorSource).toContain('/images/services/ai-cover.webp');
    expect(routeGeneratorSource).toContain('id="route-structured-data"');
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

  it('uses permanent canonical redirects and a real HTTP 404 fallback', () => {
    expect(cloudflareRedirects).toContain('/services/rights-management /services/music-publishing/ 301');
    expect(cloudflareRedirects).toContain('/services/sns-operations /services/sns-management/ 301');
    expect(cloudflareRedirects).toContain('/services/ai-marketing-strategy /services/workflow-automation/ 301');
    expect(siteWorkerConfig).toContain('not_found_handling = "404-page"');
    expect(appSource).toContain('path="/services/rights-management" element={<Navigate to="/services/music-publishing/"');
  });

  it('publishes service-specific questions and a current factual update', () => {
    expect(serviceDetailSource).toContain('よくあるご質問');
    expect(serviceDetailSource).toContain('service.faqs.map');
    expect(siteConfigSource).toContain("date: '2026.08.15'");
    expect(siteConfigSource).toContain('発注前FAQ、法務ページ、共有用メタ情報を改善');
    expect(newsSource).toContain('siteConfig.newsItems');
  });

  it('uses a bounded hero image and responsive service covers', () => {
    expect(heroSource).toContain('music-gallery-2.webp');
    expect(heroSource).toContain('width={900}');
    expect(read('./components/Services.tsx')).toContain('coverVariant(service.media.listImage, 480)');
    expect(read('./components/Header.tsx')).toContain('images/logo-80.webp');
  });
});
