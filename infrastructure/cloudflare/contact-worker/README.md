# Contact API Worker

`/api/contact` を自社ドメイン配下で受ける Cloudflare Worker です。
問い合わせ内容は Resend でメール送信し、KV に短期レート制限と監査ログを保存します。

## 1. 前提

- Cloudflare で `regalocom.net` を管理していること
- GitHub Actions から Cloudflare Workers をデプロイできる API token があること
- Resend の API key があること

## 2. KV namespace

Cloudflare 側で2つのKV namespaceを作成します。

```bash
wrangler kv namespace create CONTACT_LOGS
wrangler kv namespace create CONTACT_RATE_LIMITS
```

作成後、出力された `id` を GitHub repository secrets に保存します。

- `CONTACT_LOGS_KV_ID`
- `CONTACT_RATE_LIMITS_KV_ID`

`wrangler.toml` には `__CONTACT_LOGS_KV_ID__` と `__CONTACT_RATE_LIMITS_KV_ID__` の
placeholder を置いています。GitHub Actions が deploy 前に secrets の値で差し替えます。

## 3. GitHub repository secrets

Contact Worker の自動デプロイには以下が必須です。

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CONTACT_LOGS_KV_ID`
- `CONTACT_RATE_LIMITS_KV_ID`
- `RESEND_API_KEY`

いずれかが空の場合、`.github/workflows/contact-worker.yml` は fail-fast します。
KV が Worker に bind されていない場合も、POST は `rate_limit_not_configured` で失敗します。
スパム対策なしで公開しないための挙動です。

## 4. Worker vars

通常は `wrangler.toml` の `[vars]` で管理します。

- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_ALLOWED_ORIGIN`
- `CONTACT_LOG_RETENTION_DAYS`
- `CONTACT_RATE_LIMIT_WINDOW_SECONDS`
- `CONTACT_RATE_LIMIT_MAX_PER_IP`
- `CONTACT_RATE_LIMIT_MAX_PER_EMAIL`

既定では IP 単位で15分5件、メール単位で15分3件までに制限します。

## 5. フロント側

本番のフロントは `/api/contact` に送信します。

```env
VITE_CONTACT_ENDPOINT=/api/contact
VITE_SITE_URL=https://www.regalocom.net
```

## 6. 本番確認

デプロイ後は以下を確認します。

```bash
curl -i https://www.regalocom.net/api/contact
curl -i -X OPTIONS \
  -H "Origin: https://www.regalocom.net" \
  -H "Access-Control-Request-Method: POST" \
  https://www.regalocom.net/api/contact
```

GET は route 疎通確認用に `200` JSON を返します。
OPTIONS は CORS preflight として `204` を返します。
POST はフォームからのみ利用します。

## 7. 添付制限

- 添付は3点まで
- 合計10MBまで
- 許可拡張子は PDF / Office / txt / csv / png / jpg / jpeg / webp
