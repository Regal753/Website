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

const routeHtmlAliases = [
  'company.html',
  'contact.html',
  // Legacy service detail URLs
  'services/sns-operations.html',
  'services/music-publishing-bgm.html',
  'services/bgm-production.html',
  'services/rights-management.html',
  'services/workflow-automation.html',
];

const writeEntrypoint = async (relativePath, content) => {
  const absolutePath = path.join(distDir, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, content, 'utf8');
};

const main = async () => {
  const indexHtml = await readFile(indexHtmlPath, 'utf8');
  const targets = [...routeIndexPaths, ...routeHtmlAliases];

  for (const target of targets) {
    await writeEntrypoint(target, indexHtml);
  }

  console.info(`[build:routes] generated ${targets.length} SPA entrypoints`);
};

main().catch((error) => {
  console.error('[build:routes] failed to generate SPA entrypoints');
  console.error(error);
  process.exit(1);
});

