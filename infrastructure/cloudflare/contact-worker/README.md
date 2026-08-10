# Contact API Worker

サイト内の問い合わせを処理するCloudflare Workerです。既定では、既存の確認済み
Googleフォームへ中継します。Resendを設定した場合はメール送信を優先し、監査ログを
KVへ保存できます。

## 1. 前提

- Cloudflare で `regalocom.net` を管理していること
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) を利用できること
- CloudflareアカウントでWorkersを利用できること

## 2. 初期設定

```bash
cd infrastructure/cloudflare/contact-worker
```

1. 必要なら `CONTACT_ALLOWED_ORIGIN` とGoogleフォームの項目IDを環境に合わせて変更

### KV 作成例

```bash
wrangler kv namespace create CONTACT_LOGS
```

## 3. 任意のシークレット登録

既定のGoogleフォーム中継にはシークレットは不要です。添付ファイル本体の転送と
自動返信を使う場合だけ、ResendのAPIキーを登録します。

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

初回デプロイ後は、表示された`https://regalo-contact-api.<subdomain>.workers.dev`で
GET health checkとPOSTを受けられます。
GETが `{"ok":true,"accepting":true}` を返すことを確認してから、フロント側を有効化します。

本番はWorker Custom Domainの`https://contact-api.regalocom.net`を利用します。DNSと
TLS証明書はCloudflareが管理し、フロント側の`VITE_CONTACT_ENDPOINT`もこのURLへ固定します。

GitHub Actionsで手動デプロイする場合は、次のSecretsとrepository variableを設定してください:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `VITE_CONTACT_ENDPOINT` repository variable（初回デプロイ後のWorker URL）

GitHub Actionsの`Deploy Contact API Worker`は、誤公開を避けるため
`workflow_dispatch`からの手動実行だけを受け付けます。上記設定を保存した後、
Actions画面から明示的に実行してください。本番health checkが`accepting:true`でなければ
失敗します。通常の`main` pushでは起動しません。

## 5. フロント側設定

`.env` で以下を利用します:

```env
VITE_CONTACT_ENDPOINT=
VITE_SITE_URL=https://www.regalocom.net
```

- `VITE_CONTACT_ENDPOINT` はWorker公開とhealth check成功後だけ設定する
- 未指定またはAPI異常時は、Googleフォームとメールの明示導線を表示する
- API障害時に第三者フォームへ自動送信しない。利用者自身が送信先を選ぶ

## 6. 監査ログ

KVには `contact/YYYY-MM-DD/<uuid>.json` で保存されます。
保存期間は `CONTACT_LOG_RETENTION_DAYS`（既定180日）です。
