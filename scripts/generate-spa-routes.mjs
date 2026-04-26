import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const indexHtmlPath = path.join(distDir, 'index.html');

const routeIndexPaths = [
  'company/index.html',
  'contact/index.html',
  'services/index.html',
  'services/sns-management/index.html',
  'services/music-publishing/index.html',
  'services/ai-marketing-strategy/index.html',
  // Legacy slugs
  'services/sns-operations/index.html',
  'services/music-publishing-bgm/index.html',
  'services/bgm-production/index.html',
  'services/rights-management/index.html',
  'services/workflow-automation/index.html',
];

const redirectAliases = {
  'company.html': 'company',
  'contact.html': 'contact',
  // Legacy service detail URLs
  'services/sns-operations.html': 'sns-management',
  'services/music-publishing-bgm.html': 'music-publishing',
  'services/bgm-production.html': 'music-publishing',
  'services/rights-management.html': 'ai-marketing-strategy',
  'services/workflow-automation.html': 'ai-marketing-strategy',
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
    await writeEntrypoint(target, indexHtml);
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

