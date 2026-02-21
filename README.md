# Corporate site starter (React + Vite)

このリポジトリは、1ページ構成のコーポレートサイト（React + Vite + TypeScript）です。

- 開発: Vite dev server（http://localhost:3000）
- ビルド: `vite build` → `dist/`

## Run locally

**Prerequisites:** Node.js (LTS 推奨)

```bash
npm install
npm run dev
```

## Build / Preview

```bash
npm run build
npm run preview
```

## Environment variables

`.env.example` を参照してください。  
フォーム送信を有効化する場合は `VITE_CONTACT_ENDPOINT` を設定できます（未設定時は `site.config.ts` のメール宛に FormSubmit を使用）。  
`VITE_SITE_URL` は送信完了後の戻り先URLです。  
※ FormSubmit は初回送信時に宛先メールの認証が必要です。

## Claude Code に投げる場合

- `CLAUDE.md` にタスクと制約をまとめています。
- Claude Code には「`CLAUDE.md` の内容に従って作業して」と指示してください。
