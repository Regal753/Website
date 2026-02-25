# Regalo Website (React + Vite)

Regalo のコーポレートサイトです。  
React + Vite + TypeScript で構成されています。

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
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
API障害時は任意で旧フォーム送信にフォールバックできます。

`.env` 例:

```env
VITE_CONTACT_ENDPOINT=
VITE_CONTACT_ENABLE_LEGACY_FALLBACK=true
VITE_CONTACT_LEGACY_ENDPOINT=
VITE_SITE_URL=https://www.regalocom.net
```

Cloudflare Worker 版の実装とセットアップは以下:

- `infrastructure/cloudflare/contact-worker/README.md`
