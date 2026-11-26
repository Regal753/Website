import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/corporate-font.css';
import App from './App';
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

// ビルド時に本文を書き出したページはそのHTMLを引き継ぎ、空のページは通常どおり描画する
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
