# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

Gatsby 5 (gatsby-starter-blog ベース) で構築した個人ブログ https://blog.hypermkt.jp/ 。記事は Markdown で `content/blog/` に置く。

## コマンド

```sh
npm run develop   # 開発サーバー (http://localhost:8000、GraphiQL は /___graphql)
npm run build     # 本番ビルド (public/ に出力)
npm run serve     # ビルド結果をローカルで配信
npm run clean     # .cache / public を削除 (GraphQL スキーマや画像処理が不整合なときに)
npm run format    # Prettier で整形 (semi なし、ダブルクォート、trailingComma: es5)
```

テストと Lint はない。`npm test` は意図的に失敗するプレースホルダ。変更の確認は `npm run build` が通るかどうかで行う。

## 記事の追加

- 配置: `content/blog/<YYYY>/<YYYY-MM-DD-slug>.md`
- URL はファイルパスから自動生成される (`gatsby-node.js` の `createFilePath`)。例: `content/blog/2025/2025-10-05-kaigi-on-rails-2025.md` → `/2025/2025-10-05-kaigi-on-rails-2025/`。ファイルを移動・リネームすると公開 URL が変わる。
- frontmatter:
  ```yaml
  ---
  title: 記事タイトル
  date: 2025-10-05
  categories:
    - Ruby on Rails
  ---
  ```
- 画像は `static/images/blog/<YYYY>/<記事ファイル名>/` に置き、本文から `/images/blog/<YYYY>/<記事ファイル名>/xxx.png` で参照する。

## アーキテクチャ

- `gatsby-node.js` がすべての動的ページを生成する:
  - トップ一覧: `src/templates/blog-index.js` (`gatsby-awesome-pagination` で 50 件ごとにページ分割)
  - 記事ページ: `src/templates/blog-post.js` (前後記事を `pageContext` で渡す)
  - カテゴリページ: `src/templates/category.js`。frontmatter の `categories` ごとに `/category/<lodash.kebabCase(カテゴリ名)>/` を生成する。
- `src/pages/` は固定ページ (about, 404)。
- RSS (`/rss.xml`) は `gatsby-config.js` の `gatsby-plugin-feed` 設定内のクエリで生成。`siteMetadata` もここにあり、`gatsby-ssr.js` から参照している。
- スタイルは 2 系統が併存している:
  - Tailwind CSS v4 (`@tailwindcss/postcss` 経由、エントリは `src/styles/global.css`、`gatsby-browser.js` で読み込み)
  - `typography.js` (`src/utils/typography.js`) の `rhythm` / `scale` を使ったインラインスタイル
- 日付表示は `src/utils/date.js` の `formatDate` (ja-JP 形式) を使う。
