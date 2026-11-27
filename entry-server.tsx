import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppRoutes, createArticleStructuredData, getRouterBasename } from './App';
import { articles } from './utils/articles';

// 記事ページの書き出し用に、公開する記事の情報と構造化データを渡す
export const getArticleEntrypoints = (siteUrl: string) =>
  articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    date: article.date,
    updated: article.updated,
    structuredData: createArticleStructuredData(article, siteUrl),
  }));

// ビルド時に各ページの本文をHTMLへ書き出すための入口（scripts/generate-spa-routes.mjs から呼ぶ）。
// url はサイト内のパス（例: /company）。BASE_PATH を付けてビルドしたときは、
// ブラウザ側の BrowserRouter と同じ basename を付けて描画し、リンクと引き継ぎを一致させる。
export const render = (url: string): string => {
  const basename = getRouterBasename();
  const location = basename ? `${basename}${url === '/' ? '' : url}` || '/' : url;
  return renderToString(
    <React.StrictMode>
      <StaticRouter basename={basename} location={location}>
        <AppRoutes />
      </StaticRouter>
    </React.StrictMode>,
  );
};
