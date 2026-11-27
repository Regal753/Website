import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const distDir = path.resolve('dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const ssrEntryPath = path.resolve('dist-ssr', 'entry-server.js');
const EMPTY_ROOT = '<div id="root"></div>';
const siteUrl = 'https://www.regalocom.net';

const routeEntrypoints = [
  {
    path: 'company/index.html',
    aliases: ['company.html'],
    title: '会社情報 | Regalo',
    description: '株式会社Regaloの会社概要、事業内容、代表者と公開情報をご案内します。',
    canonicalPath: '/company',
  },
  {
    path: 'contact/index.html',
    aliases: ['contact.html'],
    title: 'お問い合わせ | Regalo',
    description:
      '音楽出版・BGM制作、YouTube・SNS運用、制作進行、業務自動化についてご相談いただけます。',
    canonicalPath: '/contact',
  },
  {
    path: 'services/sns-management/index.html',
    title: 'YouTube・SNS運用 | Regalo',
    description:
      'YouTubeを中心に、企画、制作進行、投稿管理、公開後の数値確認を支援します。',
    canonicalPath: '/services/sns-management/',
    imagePath: '/images/services/sns-cover.webp',
    imageAlt: 'YouTube・SNS運用のサービス案内',
    imageWidth: 1350,
    imageHeight: 900,
    serviceName: 'YouTube・SNS運用',
  },
  {
    path: 'services/music-publishing/index.html',
    title: '音楽出版・BGM制作 | Regalo',
    description: 'BGM制作、権利情報・契約情報の整理、利用条件の確認手順、管理台帳の整備に対応します。',
    canonicalPath: '/services/music-publishing/',
    imagePath: '/images/services/music-cover.webp',
    imageAlt: '音楽出版・BGM制作のサービス案内',
    imageWidth: 1350,
    imageHeight: 900,
    serviceName: '音楽出版・BGM制作',
  },
  {
    path: 'services/workflow-automation/index.html',
    title: '制作進行・業務自動化 | Regalo',
    description:
      'レポート作成、進行共有、通知、確認依頼の自動化に対応し、運用手順と納品物を明確にします。',
    canonicalPath: '/services/workflow-automation/',
    imagePath: '/images/services/ai-cover.webp',
    imageAlt: '制作進行・業務自動化のサービス案内',
    imageWidth: 1350,
    imageHeight: 900,
    serviceName: '制作進行・業務自動化',
  },
  // Legacy slugs resolve to the current service canonical URL.
  {
    path: 'services/sns-operations/index.html',
    title: 'YouTube・SNS運用 | Regalo',
    description:
      'YouTubeを中心に、企画、制作進行、投稿管理、公開後の数値確認を支援します。',
    canonicalPath: '/services/sns-management/',
    imagePath: '/images/services/sns-cover.webp',
    imageAlt: 'YouTube・SNS運用のサービス案内',
    imageWidth: 1350,
    imageHeight: 900,
    serviceName: 'YouTube・SNS運用',
  },
  {
    path: 'services/music-publishing-bgm/index.html',
    title: '音楽出版・BGM制作 | Regalo',
    description: 'BGM制作、権利情報・契約情報の整理、利用条件の確認手順、管理台帳の整備に対応します。',
    canonicalPath: '/services/music-publishing/',
    imagePath: '/images/services/music-cover.webp',
    imageAlt: '音楽出版・BGM制作のサービス案内',
    imageWidth: 1350,
    imageHeight: 900,
    serviceName: '音楽出版・BGM制作',
  },
  {
    path: 'services/bgm-production/index.html',
    title: '音楽出版・BGM制作 | Regalo',
    description: 'BGM制作、権利情報・契約情報の整理、利用条件の確認手順、管理台帳の整備に対応します。',
    canonicalPath: '/services/music-publishing/',
    imagePath: '/images/services/music-cover.webp',
    imageAlt: '音楽出版・BGM制作のサービス案内',
    imageWidth: 1350,
    imageHeight: 900,
    serviceName: '音楽出版・BGM制作',
  },
  {
    path: 'services/rights-management/index.html',
    title: '音楽出版・BGM制作 | Regalo',
    description: 'BGM制作、権利情報・契約情報の整理、利用条件の確認手順、管理台帳の整備に対応します。',
    canonicalPath: '/services/music-publishing/',
    imagePath: '/images/services/music-cover.webp',
    imageAlt: '音楽出版・BGM制作のサービス案内',
    imageWidth: 1350,
    imageHeight: 900,
    serviceName: '音楽出版・BGM制作',
  },
  {
    path: 'services/ai-marketing-strategy/index.html',
    title: '制作進行・業務自動化 | Regalo',
    description:
      'レポート作成、進行共有、通知、確認依頼の自動化に対応し、運用手順と納品物を明確にします。',
    canonicalPath: '/services/workflow-automation/',
    imagePath: '/images/services/ai-cover.webp',
    imageAlt: '制作進行・業務自動化のサービス案内',
    imageWidth: 1350,
    imageHeight: 900,
    serviceName: '制作進行・業務自動化',
  },
];

const redirectAliases = {
  // Legacy service detail URLs
  'services/sns-operations.html': '/services/sns-management/',
  'services/music-publishing-bgm.html': '/services/music-publishing/',
  'services/bgm-production.html': '/services/music-publishing/',
  'services/rights-management.html': '/services/music-publishing/',
  'services/ai-marketing-strategy.html': '/services/workflow-automation/',
  'services/workflow-automation.html': '/services/workflow-automation/',
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

const createRouteStructuredData = (route) => {
  if (!route.serviceName) return null;

  const serviceUrl = routeUrl(route.canonicalPath);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: route.serviceName,
      serviceType: route.serviceName,
      description: route.description,
      url: serviceUrl,
      provider: {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: '株式会社Regalo',
        url: `${siteUrl}/`,
      },
      areaServed: {
        '@type': 'Country',
        name: '日本',
      },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: '法人・制作会社',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Regalo',
          item: `${siteUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: route.serviceName,
          item: serviceUrl,
        },
      ],
    },
  ];
};

const withRouteMeta = (html, route) => {
  const canonicalUrl = routeUrl(route.canonicalPath);

  const metaHtml = [
    (value) =>
      value.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(route.title)}</title>`),
    (value) => replaceMeta(value, 'name', 'description', route.description),
    (value) => replaceMeta(value, 'property', 'og:url', canonicalUrl),
    (value) => replaceMeta(value, 'property', 'og:title', route.title),
    (value) => replaceMeta(value, 'property', 'og:description', route.description),
    (value) => replaceMeta(value, 'name', 'twitter:title', route.title),
    (value) => replaceMeta(value, 'name', 'twitter:description', route.description),
    (value) => route.imagePath ? replaceMeta(value, 'property', 'og:image', `${siteUrl}${route.imagePath}`) : value,
    (value) => route.imageAlt ? replaceMeta(value, 'property', 'og:image:alt', route.imageAlt) : value,
    (value) => route.imageWidth ? replaceMeta(value, 'property', 'og:image:width', String(route.imageWidth)) : value,
    (value) => route.imageHeight ? replaceMeta(value, 'property', 'og:image:height', String(route.imageHeight)) : value,
    (value) => route.imagePath ? replaceMeta(value, 'name', 'twitter:image', `${siteUrl}${route.imagePath}`) : value,
    (value) =>
      value.replace(
        /<link\b(?=[^>]*\brel="canonical")[^>]*>/s,
        `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
      ),
  ].reduce((current, transform) => transform(current), html);

  const structuredData = route.structuredData ?? createRouteStructuredData(route);
  if (!structuredData) return metaHtml;

  const serialized = JSON.stringify(structuredData).replace(/</g, '\\u003c');
  return metaHtml.replace(
    '</head>',
    `    <script id="route-structured-data" type="application/ld+json">${serialized}</script>\n  </head>`,
  );
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

// 正規URLのページだけ本文をHTMLへ書き出す（旧URLは _redirects の301で正規URLへ移るため空のまま）
const withPrerenderedBody = (html, markup) => {
  if (!html.includes(EMPTY_ROOT)) {
    throw new Error('dist/index.html does not contain an empty #root to prerender into');
  }
  return html.replace(EMPTY_ROOT, `<div id="root">${markup}</div>`);
};

const isCanonicalEntrypoint = (route) =>
  route.path === `${route.canonicalPath.replace(/^\//, '').replace(/\/$/, '')}/index.html`;

// 公開する記事の一覧ページと各記事ページ。記事が1本もなければ何も書き出さない
const createArticleEntrypoints = (articles) => {
  if (articles.length === 0) return [];
  return [
    {
      path: 'articles/index.html',
      title: '記事 | Regalo',
      description: 'BGMの権利やYouTube運用で、株式会社Regaloが実際に確認していることをまとめています。',
      canonicalPath: '/articles/',
      imageAlt: '株式会社Regaloの記事一覧',
    },
    ...articles.map((article) => ({
      path: `articles/${article.slug}/index.html`,
      title: `${article.title} | Regalo`,
      description: article.description,
      canonicalPath: `/articles/${article.slug}/`,
      imageAlt: `${article.title}（株式会社Regaloの記事）`,
      structuredData: [article.structuredData],
      lastmod: article.updated ?? article.date,
    })),
  ];
};

// public/sitemap.xml をもとに、記事のURLを dist/sitemap.xml へ足す
const appendArticlesToSitemap = async (entrypoints) => {
  if (entrypoints.length === 0) return;
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  const sitemap = await readFile(sitemapPath, 'utf8');
  const latest = entrypoints.reduce((max, route) => (route.lastmod && route.lastmod > max ? route.lastmod : max), '');
  const urls = entrypoints
    .map((route) => `  <url>\n    <loc>${escapeHtml(routeUrl(route.canonicalPath))}</loc>\n    <lastmod>${route.lastmod ?? latest}</lastmod>\n  </url>\n`)
    .join('');
  await writeFile(sitemapPath, sitemap.replace('</urlset>', `${urls}</urlset>`), 'utf8');
};

const main = async () => {
  const indexHtml = await readFile(indexHtmlPath, 'utf8');
  const { render, getArticleEntrypoints } = await import(pathToFileURL(ssrEntryPath).href);
  const articleEntrypoints = createArticleEntrypoints(getArticleEntrypoints(siteUrl));

  await writeEntrypoint('services/index.html', indexHtml);
  await writeFile(indexHtmlPath, withPrerenderedBody(indexHtml, render('/')), 'utf8');
  let prerenderedCount = 1;

  for (const route of routeEntrypoints) {
    let routeHtml = withRouteMeta(indexHtml, route);
    if (isCanonicalEntrypoint(route)) {
      routeHtml = withPrerenderedBody(routeHtml, render(route.canonicalPath));
      prerenderedCount += 1;
    }
    await writeEntrypoint(route.path, routeHtml);

    for (const aliasPath of route.aliases ?? []) {
      await writeEntrypoint(aliasPath, routeHtml);
    }
  }

  for (const route of articleEntrypoints) {
    const routeHtml = withPrerenderedBody(withRouteMeta(indexHtml, route), render(route.canonicalPath));
    await writeEntrypoint(route.path, routeHtml);
    prerenderedCount += 1;
  }
  await appendArticlesToSitemap(articleEntrypoints);

  for (const [aliasPath, redirectTarget] of Object.entries(redirectAliases)) {
    await writeEntrypoint(aliasPath, createRedirectHtml(redirectTarget));
  }

  const flatEntrypointCount = routeEntrypoints.reduce(
    (count, route) => count + (route.aliases?.length ?? 0),
    0,
  );
  console.info(
    `[build:routes] generated ${routeEntrypoints.length + flatEntrypointCount + articleEntrypoints.length + 1} SPA entrypoints (${prerenderedCount} prerendered, ${articleEntrypoints.length} article pages) and ${Object.keys(redirectAliases).length} redirect aliases`,
  );
};

main().catch((error) => {
  console.error('[build:routes] failed to generate SPA entrypoints');
  console.error(error);
  process.exit(1);
});

