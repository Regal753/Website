import { readFileSync } from 'node:fs';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const configuredBasePath = process.env.BASE_PATH?.trim() || '/';
const basePath = configuredBasePath.endsWith('/') ? configuredBasePath : `${configuredBasePath}/`;

// 下書き（draft: true）の記事は、配布するJavaScriptに本文が入らないよう読み込み時点で空にする。
// VITE_SHOW_DRAFTS=1 のときだけ、確認用に下書きも読み込む。
export const isDraftArticle = (source: string): boolean => {
  const frontmatter = source.replace(/\r\n/g, '\n').match(/^﻿?---\n([\s\S]*?)\n---/);
  return Boolean(frontmatter && /^draft:\s*['"]?true['"]?\s*$/m.test(frontmatter[1]));
};

const excludeDraftArticles = (showDrafts: boolean): Plugin => ({
  name: 'regalo-exclude-draft-articles',
  enforce: 'pre',
  load(id) {
    const [file, query = ''] = id.split('?');
    if (!/[\\/]content[\\/]articles[\\/][^\\/]+\.md$/.test(file) || !query.includes('raw')) return null;
    const source = readFileSync(file, 'utf8');
    if (!showDrafts && isDraftArticle(source)) return 'export default "";';
    return `export default ${JSON.stringify(source)};`;
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    base: basePath,
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [excludeDraftArticles(env.VITE_SHOW_DRAFTS === '1'), react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
