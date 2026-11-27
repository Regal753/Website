// 記事は content/articles/*.md に1本1ファイルで置く（先頭が _ のファイルは雛形として読み込まない）。
// ファイル名がURLのスラッグになる（例: bgm-revenue-share.md → /articles/bgm-revenue-share/）。

export type ArticleServiceSlug = 'music-publishing' | 'sns-management' | 'workflow-automation';

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD（公開日）
  updated?: string; // YYYY-MM-DD（更新日。あれば表示）
  service?: ArticleServiceSlug; // 関連する事業。事業ページの「関連記事」に出る
  draft: boolean;
  body: string; // 本文（Markdown）
}

const SERVICE_SLUGS: ArticleServiceSlug[] = ['music-publishing', 'sns-management', 'workflow-automation'];
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const parseFrontmatter = (source: string): { data: Record<string, string>; body: string } => {
  const normalized = source.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: normalized };
  const data: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const found = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!found) continue;
    data[found[1]] = found[2].trim().replace(/^(['"])(.*)\1$/, '$2');
  }
  return { data, body: match[2].trim() };
};

export const parseArticle = (fileName: string, source: string): Article => {
  const slug = fileName.replace(/^.*\//, '').replace(/\.md$/, '');
  const { data, body } = parseFrontmatter(source);
  const problems: string[] = [];
  if (!SLUG_PATTERN.test(slug)) problems.push('ファイル名は半角英小文字・数字・ハイフンにしてください');
  if (!data.title) problems.push('title がありません');
  if (!data.description) problems.push('description がありません');
  if (!DATE_PATTERN.test(data.date ?? '')) problems.push('date は YYYY-MM-DD で書いてください');
  if (data.updated && !DATE_PATTERN.test(data.updated)) problems.push('updated は YYYY-MM-DD で書いてください');
  if (data.service && !SERVICE_SLUGS.includes(data.service as ArticleServiceSlug)) {
    problems.push(`service は ${SERVICE_SLUGS.join(' / ')} のどれかにしてください`);
  }
  if (!body) problems.push('本文がありません');
  if (problems.length > 0) {
    throw new Error(`記事 ${fileName} の書き方を確認してください: ${problems.join('、')}`);
  }
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated || undefined,
    service: (data.service as ArticleServiceSlug) || undefined,
    draft: data.draft === 'true',
    body,
  };
};

// 公開日の新しい順。下書き（draft: true）は VITE_SHOW_DRAFTS=1 のときだけ含める
// （ビルドでは vite.config.ts が下書きを空文字にするので、空のファイルもここで除く）
export const buildArticleList = (files: Record<string, string>, includeDrafts = false): Article[] =>
  Object.entries(files)
    .filter(([path, source]) => !/\/_[^/]*\.md$/.test(path) && source.trim() !== '')
    .map(([path, source]) => parseArticle(path, source))
    .filter((article) => includeDrafts || !article.draft)
    .sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date)));

// _ で始まる雛形は配布物に入れない
const articleFiles = import.meta.glob(['../content/articles/*.md', '!../content/articles/_*.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const articles: Article[] = buildArticleList(
  articleFiles,
  import.meta.env.VITE_SHOW_DRAFTS === '1',
);

export const hasArticles = articles.length > 0;

export const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((article) => article.slug === slug);

export const getArticlesByService = (service: ArticleServiceSlug): Article[] =>
  articles.filter((article) => article.service === service);

export const formatArticleDate = (date: string): string => date.replace(/-/g, '.');
