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

- **Cloudflare（Wrangler）** - 静的アセット配信（SPA）

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
