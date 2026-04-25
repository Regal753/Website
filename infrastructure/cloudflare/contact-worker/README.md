# Contact API Worker

`/api/contact` を独自ドメイン配下で処理するための Cloudflare Worker です。  
問い合わせ内容はメール送信（Resend）し、KVで短期レート制限と監査ログ保存を行えます。

## 1. 前提

- Cloudflare で `regalocom.net` を管理していること
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) を利用できること
- Resend の API キーを発行済みであること

## 2. 初期設定

```bash
cd infrastructure/cloudflare/contact-worker
```

1. 必要なら `routes.pattern` と `CONTACT_ALLOWED_ORIGIN` を環境に合わせて変更

### KV 作成例

```bash
wrangler kv namespace create CONTACT_LOGS
wrangler kv namespace create CONTACT_RATE_LIMITS
```

作成後、出力された `id` を `wrangler.toml` の `[[kv_namespaces]]` に追加してください。

## 3. シークレット登録

```bash
wrangler secret put RESEND_API_KEY
```

必要に応じて Slack/Discord 等への通知ログを使う場合:

```bash
wrangler secret put CONTACT_LOG_WEBHOOK_URL
```

## 4. デプロイ

```bash
wrangler deploy
```

デプロイ後、`https://www.regalocom.net/api/contact` で POST を受けられます。

GitHub Actions で自動デプロイする場合は以下の Secrets を設定してください:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Worker 側で別途必要な Secrets / Vars:

- `RESEND_API_KEY`（必須）
- `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` / `CONTACT_ALLOWED_ORIGIN`（`wrangler.toml` の vars で管理）

## 5. フロント側設定

`.env` で以下を利用します:

```env
VITE_CONTACT_ENDPOINT=/api/contact
VITE_CONTACT_ENABLE_LEGACY_FALLBACK=false
VITE_CONTACT_LEGACY_ENDPOINT=
VITE_SITE_URL=https://www.regalocom.net
```

- `VITE_CONTACT_ENDPOINT` は独自ドメインAPIを指定
- `VITE_CONTACT_ENABLE_LEGACY_FALLBACK=true` に明示変更した場合だけ、API障害時に旧フォーム送信へフォールバック

## 6. 監査ログ

KVには `contact/YYYY-MM-DD/<uuid>.json` で保存されます。  
保存期間は `CONTACT_LOG_RETENTION_DAYS`（既定180日）です。

## 7. スパム・添付制限

- `CONTACT_RATE_LIMITS` が設定されている場合、既定で IP 単位 15分5件、メール単位 15分3件までに制限します。
- 上限は `CONTACT_RATE_LIMIT_WINDOW_SECONDS`、`CONTACT_RATE_LIMIT_MAX_PER_IP`、`CONTACT_RATE_LIMIT_MAX_PER_EMAIL` で調整できます。
- 添付は3点、合計10MBまでです。
- 許可する添付拡張子は PDF / Office / txt / csv / png / jpg / jpeg / webp です。
