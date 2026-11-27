import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// サイトで表示する文字が、分割フォント（home / extra / supplement）のどれかに入っているかを確かめる。
// 欠けると、その文字だけ別の書体で表示される（以前は見出しの「透」が該当）。
// 失敗したら scripts/build-font-supplement.py を実行して補助フォントを作り直す。

const read = (relativePath: string): string =>
  readFileSync(new URL(relativePath, import.meta.url), 'utf8');

const listTsx = (dir: string): string[] =>
  readdirSync(new URL(`./${dir}/`, import.meta.url))
    .filter((name) => name.endsWith('.tsx'))
    .map((name) => `./${dir}/${name}`);

// 公開する記事（_ で始まる雛形は除く）
const listArticles = (): string[] =>
  readdirSync(new URL('./content/articles/', import.meta.url))
    .filter((name) => name.endsWith('.md') && !name.startsWith('_'))
    .map((name) => `./content/articles/${name}`);

const coveredCodePoints = (): Set<number> => {
  const css = read('./styles/corporate-font.css');
  const covered = new Set<number>();
  for (const [, ranges] of css.matchAll(/unicode-range:\s*([^;]+);/g)) {
    for (const raw of ranges.split(',')) {
      const part = raw.trim().replace(/^U\+/, '');
      if (!part) continue;
      const [start, end = start] = part.split('-');
      for (let code = parseInt(start, 16); code <= parseInt(end, 16); code += 1) covered.add(code);
    }
  }
  return covered;
};

const stripComments = (source: string): string =>
  source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

describe('corporate font subsets', () => {
  it('cover every non-ASCII character the site renders', () => {
    const covered = coveredCodePoints();
    const files = [
      ...listTsx('components'),
      ...listTsx('pages'),
      ...listTsx('utils'),
      ...listArticles(),
      './site.config.ts',
      './services.catalog.ts',
      './App.tsx',
      './index.html',
    ];
    const missing = new Map<string, string>();
    for (const file of files) {
      for (const char of stripComments(read(file))) {
        const code = char.codePointAt(0) ?? 0;
        if (code > 0x7f && !covered.has(code) && !missing.has(char)) missing.set(char, file);
      }
    }
    expect([...missing].map(([char, file]) => `${char} (${file})`)).toEqual([]);
  });
});
