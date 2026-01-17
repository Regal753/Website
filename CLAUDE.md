# Claude Code 作業指示書

このリポジトリは **1ページ構成のコーポレートサイト**（React + Vite + TypeScript）です。  
AI Studio 由来のコードを含むため、**本番運用向けに整理・安全化**してください。

---

## 目的

- 会社サイト（トップ/サービス/技術/お問い合わせ）の **見た目は維持しつつ**、
- **運用しやすい形**（GitHubに置きやすい、依存が少ない、危険な実装を排除）にする。

---

## 最重要制約（P0）

1. **フロントエンドにAPIキーを埋め込まない**
   - `.env.*` のキーを JS に置換して配布する構成は **本番では禁止**。
   - Gemini 連携（問い合わせ下書き生成）は **削除する**（またはバックエンド経由に移行する）。

2. **お問い合わせは「実際に届く」導線にする**
   - 現状は `setTimeout` のダミー送信。必ず実運用可能な方式に置換する。
   - 方針（いずれか1つに統一）:
     - A) `mailto:` でメールソフト起動
     - B) Googleフォームへのリンク（ボタン or iframe）
     - C) 自前エンドポイント（Cloud Functions / Apps Script）へ `fetch`（※今回は原則やらない）

3. **秘密情報をコミットしない**
   - `.env` / `.env.*` は `.gitignore` で除外（`.env.example` のみ許可）。

---

## 現状把握（読み取り）

- Gemini 連携は削除済み（フロントにAPIキーを埋め込まない）
- `components/Contact.tsx` … mailto による実運用導線
- `index.html` … AI Studio 由来の importmap 等は削除済み（このブランチでは整理済み）

---

## 期待する最終状態（受け入れ基準）

- `npm install` → `npm run dev` でローカル起動できる（エラーなし）
- `npm run build` → `npm run preview` で確認できる（コンソールエラーなし）
- 「お問い合わせ」から **実際にアクションが起こる**
  - mailto ならメールクライアントが起動
  - Googleフォームならフォームへ遷移/送信できる
- フロント配布物（`dist/`）に **APIキーが含まれない**
- 会社名・フッター表記・ナビラベル等の **プレースホルダ**を整理
  - 会社名は暫定で `Regalo` などに置換するか、`site.config.ts` に集約

---

## タスクリスト

### P0: セキュリティ/運用の最低ライン

1. **Gemini機能を削除**
   - `@google/genai` 依存を削除（`package.json`）
   - `services/geminiService.ts` を削除 or 未使用化
   - `Contact.tsx` から「AIで下書き生成」UI/処理を削除
   - `vite.config.ts` の `define: process.env.*` を削除（不要になるため）

2. **お問い合わせ送信を本番化（A推奨: mailto）**
   - 送信ボタンで `mailto:` を開く方式に変更
   - 例：件名に問い合わせ種別、本文に名前/メール/本文を整形して入れる
   - 送信成功UIは「mailto起動後に案内を出す」程度でOK

3. **ブランド表記を統一**
   - Footer の `NEXT CREATION / Next Creation Inc.` を差し替え
   - `metadata.json` / `index.html title` を差し替え
   - Header のナビ（Home/Services/Technology/Contact）を日本語化（任意）

### P1: 仕上げ（品質/公開向け）

4. **SEO最低限**
   - `index.html` に description / OGP（暫定値で可）
   - favicon（なければプレースホルダでも可）

5. **GitHub Pages想定のビルド**
   - ルーティング無しなので `vite.config.ts` に `base: "./"` を設定（推奨）

---

## 実装方針

- 可能なら **設定値を `site.config.ts` に集約**し、各コンポーネントから参照する  
  （会社名、メール、コピーライト、ナビ文言など）
- 外部サービスに依存しない（メール送信サーバ等は今回は追加しない）

---

## コマンド

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

## 変更後に必ず行うこと

- `npm run build` が通るか
- `dist/` の JS に機密（APIキー）が混入していないか（検索）
- Contact導線が期待通り動くか
