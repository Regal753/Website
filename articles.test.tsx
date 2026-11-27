import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { buildArticleList, parseArticle, parseFrontmatter } from './utils/articles';
import { Markdown, parseBlocks } from './utils/markdown';

const sample = `---
title: "『90%還元』は何の90%？"
description: 提携前に確認する3つのこと
date: 2026-12-01
service: music-publishing
---

## 還元率の計算元

契約書の **分配の対象** を確認します。
詳しくは[お問い合わせ](/contact)へ。

- 計算元
- 権利の範囲

> 法律の判断は専門家に確認します。

<script>alert(1)</script>
`;

const renderMarkdown = (source: string) =>
  renderToStaticMarkup(
    <MemoryRouter>
      <Markdown source={source} />
    </MemoryRouter>,
  );

describe('articles', () => {
  it('reads front matter and derives the slug from the file name', () => {
    const article = parseArticle('../content/articles/bgm-revenue-share.md', sample);
    expect(article).toMatchObject({
      slug: 'bgm-revenue-share',
      title: '『90%還元』は何の90%？',
      date: '2026-12-01',
      service: 'music-publishing',
      draft: false,
    });
    expect(parseFrontmatter('本文だけ').data).toEqual({});
  });

  it('rejects articles that miss required fields or use an unsafe slug', () => {
    expect(() => parseArticle('../content/articles/Bad_Name.md', sample)).toThrow('ファイル名');
    expect(() => parseArticle('../content/articles/ok.md', '---\ntitle: a\n---\n本文')).toThrow('description');
    expect(() =>
      parseArticle('../content/articles/ok.md', sample.replace('music-publishing', 'unknown')),
    ).toThrow('service');
  });

  it('skips templates and drafts, and sorts by date', () => {
    const list = buildArticleList({
      '../content/articles/_template.md': sample,
      '../content/articles/old.md': sample.replace('2026-12-01', '2026-01-01'),
      '../content/articles/new.md': sample,
      '../content/articles/wip.md': sample.replace('service:', 'draft: true\nservice:'),
    });
    expect(list.map((article) => article.slug)).toEqual(['new', 'old']);
    expect(buildArticleList({ '../content/articles/wip.md': sample.replace('service:', 'draft: true\nservice:') }, true)).toHaveLength(1);
  });

  it('renders the supported Markdown and keeps raw HTML as text', () => {
    expect(parseBlocks(sample.split('---\n').slice(2).join('---\n')).map((block) => block.kind)).toEqual([
      'heading',
      'paragraph',
      'list',
      'quote',
      'paragraph',
    ]);
    const html = renderMarkdown(parseFrontmatter(sample).body);
    expect(html).toContain('<h2');
    expect(html).toContain('<strong');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('<blockquote');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('does not turn unsafe link targets into links', () => {
    const html = renderMarkdown('[押す](javascript:alert(1))');
    expect(html).not.toContain('href=');
  });

  it('blanks draft articles at build time so their text never reaches the bundle', async () => {
    const { isDraftArticle } = await import('./vite.config');
    expect(isDraftArticle(sample.replace('service:', 'draft: true\nservice:'))).toBe(true);
    expect(isDraftArticle(sample)).toBe(false);
    expect(isDraftArticle('本文に draft: true と書いても下書きにはならない')).toBe(false);
    expect(buildArticleList({ '../content/articles/blanked.md': '' })).toEqual([]);
  });

  it('keeps the writing template out of the published list', () => {
    const template = readFileSync(new URL('./content/articles/_template.md', import.meta.url), 'utf8');
    expect(template).toContain('draft: true');
    expect(buildArticleList({ '../content/articles/_template.md': template })).toEqual([]);
  });
});
