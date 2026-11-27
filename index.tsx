import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/corporate-font.css';
import App, { getRouterBasename } from './App';
import { initializeAnalytics } from './utils/analytics';

initializeAnalytics();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const normalizePath = (value: string): string => (value.length > 1 ? value.replace(/\/+$/, '') : value) || '/';

// 今のURL（basename を除く）が、ビルド時に本文を書き出したURLと同じか。
// 404ページから戻ってきた場合などは、別のページの本文が入っているので引き継がない。
const matchesPrerenderedPath = (element: HTMLElement): boolean => {
  const prerenderedPath = element.dataset.prerenderedPath;
  if (!prerenderedPath) return false;
  const basename = getRouterBasename() ?? '';
  const pathname = basename && window.location.pathname.startsWith(basename)
    ? window.location.pathname.slice(basename.length)
    : window.location.pathname;
  return normalizePath(pathname) === normalizePath(prerenderedPath);
};

if (rootElement.hasChildNodes() && matchesPrerenderedPath(rootElement)) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  rootElement.replaceChildren();
  ReactDOM.createRoot(rootElement).render(app);
}
