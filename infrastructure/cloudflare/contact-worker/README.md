# Contact API Worker

`/api/contact` を独自ドメイン配下で処理するための Cloudflare Worker です。
問い合わせ内容はメール送信（Resend）し、監査ログをKVに保存できます。

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
```

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

GitHub Actionsの`Deploy Contact API Worker`は、誤公開を避けるため
`workflow_dispatch`からの手動実行だけを受け付けます。上記Secretsを設定した後、
Actions画面から明示的に実行してください。通常の`main` pushでは起動しません。

## 5. フロント側設定

`.env` で以下を利用します:

```env
VITE_CONTACT_ENDPOINT=
VITE_SITE_URL=https://www.regalocom.net
```

- `VITE_CONTACT_ENDPOINT` は独自ドメインAPIを優先
- 未指定時も同一オリジンの `/api/contact` を利用
- API障害時に第三者フォームへ自動転送しない。予備Googleフォームは利用者が画面上で明示的に選ぶ

## 6. 監査ログ

KVには `contact/YYYY-MM-DD/<uuid>.json` で保存されます。
保存期間は `CONTACT_LOG_RETENTION_DAYS`（既定180日）です。
