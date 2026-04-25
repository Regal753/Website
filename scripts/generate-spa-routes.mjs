import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const siteUrl = (process.env.VITE_SITE_URL || 'https://www.regalocom.net').replace(/\/$/, '');

const routeIndexPaths = [
  'company/index.html',
  'contact/index.html',
  'services/sns-management/index.html',
  'services/music-publishing/index.html',
  'services/ai-marketing-strategy/index.html',
];

const redirectAliases = {
  'company.html': '/company/',
  'contact.html': '/contact/',
  'services/index.html': '/#services',
  // Legacy service detail URLs
  'services/sns-operations/index.html': '/services/sns-management/',
  'services/music-publishing-bgm/index.html': '/services/music-publishing/',
  'services/bgm-production/index.html': '/services/music-publishing/',
  'services/rights-management/index.html': '/services/ai-marketing-strategy/',
  'services/workflow-automation/index.html': '/services/ai-marketing-strategy/',
  'services/sns-operations.html': '/services/sns-management/',
  'services/music-publishing-bgm.html': '/services/music-publishing/',
  'services/bgm-production.html': '/services/music-publishing/',
  'services/rights-management.html': '/services/ai-marketing-strategy/',
  'services/workflow-automation.html': '/services/ai-marketing-strategy/',
};

const routeMeta = {
  'company/index.html': {
    title: '会社情報 | Regalo',
    description: '京都発の実務チームRegaloの会社概要、公開情報、支援体制をご案内します。',
    canonicalPath: '/company/',
  },
  'contact/index.html': {
    title: 'お問い合わせ | Regalo',
    description:
      'YouTube/SNS運用、音楽権利管理、制作進行や業務整理のご相談を24時間受け付けています。通常1営業日以内にご連絡します。',
    canonicalPath: '/contact/',
  },
  'services/sns-management/index.html': {
    title: 'YouTube/SNS運用支援 | Regalo',
    description:
      'YouTubeを中心に、企画設計から制作進行、公開後の分析改善まで一気通貫で支援します。再現可能な運用体制を構築し、継続的な成果を目指します。',
    canonicalPath: '/services/sns-management/',
  },
  'services/music-publishing/index.html': {
    title: '音楽出版・BGM権利管理 | Regalo',
    description: '音楽著作権の管理を行い、制作から権利管理、実運用まで一貫して支援します。',
    canonicalPath: '/services/music-publishing/',
  },
  'services/ai-marketing-strategy/index.html': {
    title: '制作進行・業務整理支援 | Regalo',
    description:
      '制作進行、素材共有、確認依頼、レポート整備を見直し、担当者が変わっても追える運用手順を整えます。',
    canonicalPath: '/services/ai-marketing-strategy/',
  },
};

const writeEntrypoint = async (relativePath, content) => {
  const absolutePath = path.join(distDir, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, content, 'utf8');
};

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const canonicalUrlForPath = (canonicalPath) =>
  canonicalPath === '/' ? `${siteUrl}/` : `${siteUrl}${canonicalPath}`;

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const replaceMetaAttribute = (html, attribute, value, content) =>
  html.replace(
    new RegExp(`<meta\\s+[^>]*${attribute}="${escapeRegExp(value)}"[^>]*>`, 'i'),
    `<meta ${attribute}="${value}" content="${escapeHtml(content)}" />`,
  );

const replaceMetaName = (html, name, content) =>
  replaceMetaAttribute(html, 'name', name, content);

const replaceMetaProperty = (html, property, content) =>
  replaceMetaAttribute(html, 'property', property, content);

const applyRouteMeta = (html, meta) => {
  const canonicalUrl = canonicalUrlForPath(meta.canonicalPath);
  let output = html
    .replace(/<title>.*?<\/title>/is, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i,
      `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    );

  output = replaceMetaName(output, 'description', meta.description);
  output = replaceMetaName(output, 'twitter:title', meta.title);
  output = replaceMetaName(output, 'twitter:description', meta.description);
  output = replaceMetaProperty(output, 'og:url', canonicalUrl);
  output = replaceMetaProperty(output, 'og:title', meta.title);
  output = replaceMetaProperty(output, 'og:description', meta.description);
  return output;
};

const createRedirectHtml = (relativeTarget) => {
  const escapedTarget = escapeHtml(relativeTarget);
  return `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Redirecting...</title>
    <meta name="robots" content="noindex,follow" />
    <link rel="canonical" href="${escapedTarget}" />
    <meta http-equiv="refresh" content="0; url=${escapedTarget}" />
    <script>
      (function () {
        var target = new URL(${JSON.stringify(relativeTarget)}, window.location.href).toString();
        window.location.replace(target);
      })();
    </script>
  </head>
  <body>
    <p>Redirecting. If you are not redirected automatically, open <a href="${escapedTarget}">this page</a>.</p>
  </body>
</html>
`;
};

const main = async () => {
  const indexHtml = await readFile(indexHtmlPath, 'utf8');

  for (const target of routeIndexPaths) {
    await writeEntrypoint(target, applyRouteMeta(indexHtml, routeMeta[target]));
  }

  for (const [aliasPath, redirectTarget] of Object.entries(redirectAliases)) {
    await writeEntrypoint(aliasPath, createRedirectHtml(redirectTarget));
  }

  console.info(
    `[build:routes] generated ${routeIndexPaths.length} SPA entrypoints and ${Object.keys(redirectAliases).length} redirect aliases`,
  );
};

main().catch((error) => {
  console.error('[build:routes] failed to generate SPA entrypoints');
  console.error(error);
  process.exit(1);
});

