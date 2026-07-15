import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const siteUrl = 'https://www.regalocom.net';

const routeEntrypoints = [
  {
    path: 'company/index.html',
    aliases: ['company.html'],
    title: '会社情報 | Regalo',
    description: '京都発の実務チームRegaloの会社概要、公開情報、支援体制をご案内します。',
    canonicalPath: '/company',
  },
  {
    path: 'contact/index.html',
    aliases: ['contact.html'],
    title: 'お問い合わせ | Regalo',
    description:
      'SNS運用、音楽権利管理、AIを活用した運用改善のご相談を24時間受け付けています。通常1営業日以内にご連絡します。',
    canonicalPath: '/contact',
  },
  {
    path: 'services/sns-management/index.html',
    title: 'SNS管理事業部 | Regalo',
    description:
      'YouTubeを中心に、企画設計から制作進行、公開後の分析改善まで一気通貫で支援します。',
    canonicalPath: '/services/sns-management/',
  },
  {
    path: 'services/music-publishing/index.html',
    title: '音楽出版事業部 | Regalo',
    description: '音楽著作権の管理を行い、制作から権利管理、実運用まで一貫して支援します。',
    canonicalPath: '/services/music-publishing/',
  },
  {
    path: 'services/ai-marketing-strategy/index.html',
    title: 'AIマーケティング戦略事業部 | Regalo',
    description:
      'レポート整備、進行共有、通知の自動化を通じて、マーケティング運用の品質とスピードを高めます。',
    canonicalPath: '/services/ai-marketing-strategy/',
  },
  // Legacy slugs resolve to the current service canonical URL.
  {
    path: 'services/sns-operations/index.html',
    title: 'SNS管理事業部 | Regalo',
    description:
      'YouTubeを中心に、企画設計から制作進行、公開後の分析改善まで一気通貫で支援します。',
    canonicalPath: '/services/sns-management/',
  },
  {
    path: 'services/music-publishing-bgm/index.html',
    title: '音楽出版事業部 | Regalo',
    description: '音楽著作権の管理を行い、制作から権利管理、実運用まで一貫して支援します。',
    canonicalPath: '/services/music-publishing/',
  },
  {
    path: 'services/bgm-production/index.html',
    title: '音楽出版事業部 | Regalo',
    description: '音楽著作権の管理を行い、制作から権利管理、実運用まで一貫して支援します。',
    canonicalPath: '/services/music-publishing/',
  },
  {
    path: 'services/rights-management/index.html',
    title: 'AIマーケティング戦略事業部 | Regalo',
    description:
      'レポート整備、進行共有、通知の自動化を通じて、マーケティング運用の品質とスピードを高めます。',
    canonicalPath: '/services/ai-marketing-strategy/',
  },
  {
    path: 'services/workflow-automation/index.html',
    title: 'AIマーケティング戦略事業部 | Regalo',
    description:
      'レポート整備、進行共有、通知の自動化を通じて、マーケティング運用の品質とスピードを高めます。',
    canonicalPath: '/services/ai-marketing-strategy/',
  },
];

const redirectAliases = {
  // Legacy service detail URLs
  'services/sns-operations.html': '/services/sns-management/',
  'services/music-publishing-bgm.html': '/services/music-publishing/',
  'services/bgm-production.html': '/services/music-publishing/',
  'services/rights-management.html': '/services/ai-marketing-strategy/',
  'services/workflow-automation.html': '/services/ai-marketing-strategy/',
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

const routeUrl = (canonicalPath) =>
  canonicalPath === '/' ? `${siteUrl}/` : `${siteUrl}${canonicalPath}`;

const replaceMeta = (html, attribute, value, content) => {
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}="${value}")[^>]*>`, 's');
  return html.replace(pattern, `<meta ${attribute}="${value}" content="${escapeHtml(content)}" />`);
};

const withRouteMeta = (html, route) => {
  const canonicalUrl = routeUrl(route.canonicalPath);

  return [
    (value) =>
      value.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(route.title)}</title>`),
    (value) => replaceMeta(value, 'name', 'description', route.description),
    (value) => replaceMeta(value, 'property', 'og:url', canonicalUrl),
    (value) => replaceMeta(value, 'property', 'og:title', route.title),
    (value) => replaceMeta(value, 'property', 'og:description', route.description),
    (value) => replaceMeta(value, 'name', 'twitter:title', route.title),
    (value) => replaceMeta(value, 'name', 'twitter:description', route.description),
    (value) =>
      value.replace(
        /<link\b(?=[^>]*\brel="canonical")[^>]*>/s,
        `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
      ),
  ].reduce((current, transform) => transform(current), html);
};

const createRedirectHtml = (relativeTarget) => {
  const escapedTarget = escapeHtml(relativeTarget);
  const escapedCanonical = escapeHtml(routeUrl(relativeTarget));
  return `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Redirecting...</title>
    <meta name="robots" content="noindex,follow" />
    <link rel="canonical" href="${escapedCanonical}" />
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

  await writeEntrypoint('services/index.html', indexHtml);

  for (const route of routeEntrypoints) {
    const routeHtml = withRouteMeta(indexHtml, route);
    await writeEntrypoint(route.path, routeHtml);

    for (const aliasPath of route.aliases ?? []) {
      await writeEntrypoint(aliasPath, routeHtml);
    }
  }

  for (const [aliasPath, redirectTarget] of Object.entries(redirectAliases)) {
    await writeEntrypoint(aliasPath, createRedirectHtml(redirectTarget));
  }

  const flatEntrypointCount = routeEntrypoints.reduce(
    (count, route) => count + (route.aliases?.length ?? 0),
    0,
  );
  console.info(
    `[build:routes] generated ${routeEntrypoints.length + flatEntrypointCount + 1} SPA entrypoints and ${Object.keys(redirectAliases).length} redirect aliases`,
  );
};

main().catch((error) => {
  console.error('[build:routes] failed to generate SPA entrypoints');
  console.error(error);
  process.exit(1);
});

