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
※本番運用でフロントエンドにAPIキーを埋め込むのは推奨しません（`CLAUDE.md` を参照）。

## Claude Code に投げる場合

- `CLAUDE.md` にタスクと制約をまとめています。
- Claude Code には「`CLAUDE.md` の内容に従って作業して」と指示してください。
