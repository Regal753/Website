# Regalo Site Worker

GitHub Pages版と同じ`dist`をCloudflare Workers Static Assetsへ配置し、`public/_headers`の
HSTS、CSP、X-Content-Type-Options、Referrer-Policy等を実HTTPレスポンスへ適用する構成です。

```powershell
npm ci
npm run build
wrangler deploy --config infrastructure/cloudflare/site-worker/wrangler.toml
```

初回は`workers.dev`で本番相当の表示・ルート・ヘッダーを確認します。公開ドメインの切替は、
既存`www` CNAMEをCloudflareで切り替えられる状態にしてから行います。確認前に
`www.regalocom.net`のDNSを変更しないでください。

本番は、Cloudflareでプロキシ済みにした既存の`www` CNAME
（`regal753.github.io`）の手前へWorker Route `www.regalocom.net/*`を配置します。
CNAMEを削除しないため、ロールバック時はWorker Routeを外すだけでGitHub Pagesへ戻せます。
