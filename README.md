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

フロントは、`VITE_CONTACT_ENDPOINT` が設定され、GET health check が
`{"ok":true,"accepting":true}` を返す場合だけサイト内フォームを表示します。
未設定・タイムアウト・異常応答の場合は、壊れた入力欄を表示せず、確認済みのGoogleフォームと
入力内容を引き継ぐメール導線を表示します。第三者サービスへ自動送信はしません。

`.env` 例:

```env
VITE_CONTACT_ENDPOINT=
VITE_SITE_URL=https://www.regalocom.net
```

Cloudflare Workerを公開した後、GitHub Actions repository variable
`VITE_CONTACT_ENDPOINT=https://www.regalocom.net/api/contact` を設定してPagesを再実行すると、
サイト内フォームが有効になります。未設定の間も問い合わせ導線は停止しません。

Cloudflare Worker 版の実装とセットアップは以下:

- `infrastructure/cloudflare/contact-worker/README.md`
