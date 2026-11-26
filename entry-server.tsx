import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppRoutes } from './App';

// ビルド時に各ページの本文をHTMLへ書き出すための入口（scripts/generate-spa-routes.mjs から呼ぶ）
export const render = (url: string): string =>
  renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </React.StrictMode>,
  );
