# Regalo Website (React + Vite)

Regalo のコーポレートサイトです。  
React + Vite + TypeScript で構成されています。

## 開発

```bash
npm ci
npm run dev
```

## ビルド

```bash
npm run typecheck
npm test
npm run build
npm run preview
```

## ルーティング

- `BrowserRouter` を利用
- GitHub Pages 直リンク対応のため、`public/404.html` で復元リダイレクトを実装
- `BASE_PATH` を指定すればサブパス配信にも対応（既定 `/`）

例:

```bash
BASE_PATH=/Website/ npm run build
```

## 問い合わせフォーム

フロントは `VITE_CONTACT_ENDPOINT`（既定 `/api/contact`）へ送信します。  
第三者フォームへの自動フォールバックは行いません。障害時は画面上の予備Googleフォームを利用者が明示的に選びます。

`.env` 例:

```env
VITE_CONTACT_ENDPOINT=
VITE_SITE_URL=https://www.regalocom.net
```

Cloudflare Worker 版の実装とセットアップは以下:

- `infrastructure/cloudflare/contact-worker/README.md`
