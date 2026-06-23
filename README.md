# LINE Order App

LIFF（LINE MINI App）で動く注文アプリのフロントエンドです。
ユーザーがメニューを見て注文し、注文履歴を確認します。バックエンドは [line-order-api](https://github.com/webdev-jp-net/line-order-api)、仕様の正本は [line-order-document](https://github.com/webdev-jp-net/line-order-document) です。

## 技術スタック

### コア

- **React（SPA・CSR）+ Vite** - フロントエンド
- **TypeScript** - 静的型付け
- **Redux Toolkit / RTK Query** - 状態管理・API 通信
- **CSS Modules + SCSS** - スタイリング

### 外部サービス

- **LIFF（@line/liff）** - LINE ログイン・ID Token / アクセストークン取得（開発時は LIFF Mock）
- **microCMS** - メニューマスター（ビルド時に取得）

### 開発環境

- **Storybook** - UI コンポーネント開発
- **Vitest** - テスト
- **ESLint / Prettier / Stylelint** - Lint・整形

### デプロイ

- **Vercel**（`vercel.json`）。ビルドコマンド `pnpm build` の直前に `prebuild` が自動実行され、メニューを取り込んでからビルドする
- `vercel.json` の役割:
  - `buildCommand: pnpm build` — `prebuild`（メニュー取り込み）を確実に走らせる
  - `rewrites` — SPA のため、全パスを `index.html` に返してクライアント側ルーティングを成立させる（`/menu` 等の直アクセス対策）

---

## ディレクトリ構成

```
src/
├── main.tsx                  # エントリポイント
├── routes/
│   ├── routes.tsx            # ルーティング定義
│   └── RootRedirect.tsx      # 起動時リダイレクト（LIFF 対応）
├── pages/                    # 画面（現状はスタブ: Home / Maintenance / NotFound）
├── layout/                   # AppWrapper（認証・スプラッシュ・エラー） / BaseLayout / Head
├── components/               # 汎用部品（form / ui / layout）
├── store/                    # Redux（liffUser / layout / initApi / _apiClient）
├── hooks/                    # useAuthLiff ほか
├── style/                    # SCSS 変数・mixin
└── utils/
```

注文アプリの実画面（メニュー一覧・注文・注文履歴）は順次追加します。

---

## セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

テンプレートをコピーして値を埋めます。

```bash
cp .env.example .env
```

`VITE_LIFF_ID` / `VITE_API_BASE_URL` などを設定します。各変数の意味は仕様リポジトリ `line-order-document`（`_llm-docs/spec/user-app/`）を参照してください。

### 3. 開発コマンド

```bash
pnpm dev        # 開発サーバー
pnpm build      # 本番ビルド
pnpm typecheck  # 型チェック
pnpm lint       # Lint（script + style）
pnpm format     # 整形
pnpm storybook  # Storybook
pnpm test       # テスト
```

---

## メニュー（microCMS）

メニューはmicroCMSで管理し、ビルド時に取り込んで同梱します（実行時はmicroCMSへ通信しません）。

取り込みは `prebuild` で行います。`pnpm build` を実行すると、その直前に自動で `prebuild` が走ります（npm/pnpm のライフサイクル）。手動で取り込むときは `pnpm prebuild` を実行します。

`prebuild` の中身（`src/data/generator/`、3段）:

- `_getApiData.sh` — microCMS から生データを `src/data/_raw/menu.json` に取得
- `_generateCustomJson.js` — 生データを整形して `src/data/menu.json` を生成し、画像取得用 `src/data/getMedia.sh` を書き出す
- `getMedia.sh` — 画像を `public/menu/` にダウンロード（自動生成）

取り込んだ `src/data/menu.json` と `public/menu/` はリポジトリにコミットします（`_raw/` と `getMedia.sh` は中間生成物のため無視）。Vercel のデプロイは `pnpm build` が `prebuild` を自動実行するため、最新メニューが反映されます。

> 注意: `prebuild` は microCMS の鍵（`MICROCMS_SERVICE` / `MICROCMS_SERVICE_KEY`）を使うため、Vercel のプロジェクト環境変数に設定します。CI（build-check）は prebuild を回さず、コミット済みデータでビルド検証するため鍵は不要です。

詳細は仕様リポジトリ `line-order-document`（`_llm-docs/spec/user-app/menu.md`）を参照してください。

---

## API クライアント

`line-order-api` のOpenAPI定義（`src/api/api-structure.yaml`）から、RTK QueryのAPIクライアント（`src/store/_apiClient.ts`）を自動生成します（スキーマ駆動）。

```bash
pnpm api:gen    # OpenAPI から _apiClient.ts を生成
pnpm mock-api   # 定義からモックAPIを起動（http://localhost:4010）
```

`_apiClient.ts` は自動生成ファイルです。手で編集せず `api-structure.yaml` を直して再生成してください。

---

## ドキュメント

仕様の正本は別リポジトリ `line-order-document` で管理しています。フロントエンドの仕様は `_llm-docs/spec/user-app/` を参照してください。

### Git Subtreeによる\_documentディレクトリの管理

このプロジェクトでは、`_document/`ディレクトリを[line-order-document](https://github.com/webdev-jp-net/line-order-document)リポジトリからGit Subtreeで取り込んでいます。

#### 初回のみ: 取り込み

`_document/`がまだ無い場合（クローン直後など）は、`git subtree add` で初回取り込みを行います。2回目以降は `git doc-pull` で更新します。

```bash
git subtree add --prefix=_document git@github.com:webdev-jp-net/line-order-document.git develop --squash
```

#### 利用可能なGitエイリアス

| エイリアス | コマンド                                                                                                 | 説明                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `doc-pull` | `git subtree pull --prefix=_document git@github.com:webdev-jp-net/line-order-document.git develop --squash` | documentリポジトリの最新内容を取り込む（developブランチから） |
| `doc-push` | `git subtree push --prefix=_document git@github.com:webdev-jp-net/line-order-document.git develop`          | \_document配下の変更をdocumentリポジトリにプッシュ            |

#### 開発フロー

1. **作業開始時は必ず最新の仕様を取り込む**

   ```bash
   # 作業開始前に必ず実行
   git doc-pull
   ```

2. **仕様書を編集した場合**
   ```bash
   # 変更をコミット後
   git doc-push
   ```

⚠️ **重要**: 作業開始時の`doc-pull`を忘れると、古い仕様に基づいた実装や、他の開発者との変更が衝突する可能性があります。

#### 使用方法

```bash
# documentリポジトリから最新の変更を取り込む
git doc-pull

# _document配下の変更をdocumentリポジトリにプッシュする
git doc-push
```

#### 注意事項

- `develop`ブランチで実行します
- 作業開始前に必ず`doc-pull`で最新の仕様書を取り寄せてください
- `_document/`配下のファイルを編集した場合は、プルリクエストのMergeが完了し解決したタイミングで`doc-push`してください
