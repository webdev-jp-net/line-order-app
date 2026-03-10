# Jamstack仕様書

このアプリケーションでは、一部の原稿をmicroCMSで管理しています。
microCMSのAPIデータ転送料対策として、ビルド時一括取得のJamstack方式を採用しています。

## microCMS運用環境

- **環境**: ステージング・本番の2環境構成
- **サービス構成**: EVENT（イベント固有）+ UTIL（共通原稿管理）の2サービス体制
- **プラン**: Hobbyプラン（月額0円、データ転送20GB/月、API上限5個）※2025年8月現在
- **制約**: 転送量超過時API停止のため、Jamstack構成で呼び出し回数を最小化

## 取得している情報

※プロジェクトに応じて取得する情報は変動します。

### EVENTサービス（イベント固有）
- 謎出題原稿、画像（mission）
- 大謎出題原稿、画像（extraMission）
- ストーリー原稿（story）
- プレゼント原稿、画像（source）
- お知らせ（news）

### UTILサービス（共通原稿管理）
- FAQ（faq）
- 参加の注意事項（caution）

## 画像処理

### 画像の静的保存と最適化

1. **画像URLの変換**

   - microCMS画像URLを抽出し、ローカルパスに変換
   - 用途別（謎画像/プレゼント画像など）にディレクトリ分類
   - `.webp`形式に統一、一意なファイル名で保存

2. **curlによる一括ダウンロード**

   - microCMS画像APIパラメータ（`?fm=webp`）でWebP変換
   - `curl -L --create-dirs -o 保存先パス 画像URL`コマンドを自動生成
   - 空URL、ローカルパス、重複URLはスキップ
   - 重複排除によりシンボリックリンクを活用（同一URL画像の効率化）

3. **サービス別画像処理**
   - EVENTサービス: `getMediaEvent.sh`で画像ダウンロード
   - UTILサービス: `getMediaUtil.sh`（現在画像なし）
   - 各サービス独立処理により上書き問題を回避

## SSG化処理

ビルド時にmicroCMSデータを静的アセット用に加工：

### モジュール構成
```
src/
├── constants/           # 正規化用定数定義
│   └── storyNormalization.js  # ストーリーラベル正規化マッピング
└── data/
    ├── generator/       # サービス別データ生成スクリプト
    │   ├── _getApiDataEvent.sh
    │   ├── _getApiDataUtil.sh
    │   ├── _generateCustomJsonEvent.js
    │   └── _generateCustomJsonUtil.js
    └── utils/           # 共通ヘルパー関数
        ├── dataHelpers.js   # MicroCMSデータ処理
        ├── imageHelpers.js  # 画像パス生成・処理
        └── fileHelpers.js   # ファイル読み書き
```

### 処理内容
- テキストエリアの改行を`<br/>`タグに変換
- リッチテキストのHTML処理と画像の静的書き出し
- フロントエンド用データ構造への変換
- メタデータ（createdAt, updatedAt等）の除去
- multiLanguageフィールドの展開（ja/en）
- annotationSetの構造化処理
- ストーリーデータの正規化（`storyNormalization.js`で日本語ラベル→内部値変換）

## データ取得の仕組み

microCMSとのAPI通信はビルド時のみ行い、ReactアプリのランタイムではmicroCMS APIへの直接通信は行いません。

### ビルド時の一括取得

- ビルドプロセス中にmicroCMS APIから全データを取得
- 静的JSONファイルとして生成・保存
- ビルド成果物に含めて配信

### ランタイムでのデータ利用

- ビルド時に生成された静的JSONファイルを読み込み
- CDN（AWS Amplify）から高速配信
- microCMSへの直接API通信は発生しない（データ転送料の節約）

### 環境設定

**認証情報**

- サービスIDとAPIキーを環境変数で管理
- 開発・本番環境で自動切り替え
- EVENTサービス: `MICROCMS_EVENT_SERVICE`, `MICROCMS_EVENT_SERVICE_KEY`
- UTILサービス: `MICROCMS_UTIL_SERVICE`, `MICROCMS_UTIL_SERVICE_KEY`

**セキュリティ考慮**

- APIキーにはVITEプレフィックスを付けない（サーバーサイドのみ使用）
- フロントエンドへのAPIキー露出を防止

**AWS Amplify連携**

- ビルド時に環境変数を自動設定
- microCMS APIへのアクセスを実現

### 自動デプロイ連携

microCMSのwebhook機能によりAWS Amplifyのデプロイを自動トリガーしています。
コンテンツ更新時に自動的にビルド・デプロイが実行され、最新コンテンツが反映されます。

```yml:amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm install 22.13.0
        - nvm use 22.13.0
        - echo "22.13.0" > .node-version
        - node -v
        - npm install -g pnpm
        - pnpm install --frozen-lockfile=true
        # EVENTサービス処理
        - sh src/data/generator/_getApiDataEvent.sh "${MICROCMS_EVENT_SERVICE}" "${MICROCMS_EVENT_SERVICE_KEY}"
        - node src/data/generator/_generateCustomJsonEvent.js
        - sh src/data/getMediaEvent.sh
        # UTILサービス処理
        - sh src/data/generator/_getApiDataUtil.sh "${MICROCMS_UTIL_SERVICE}" "${MICROCMS_UTIL_SERVICE_KEY}"
        - node src/data/generator/_generateCustomJsonUtil.js
        - sh src/data/getMediaUtil.sh
    build:
      commands:
        - pnpm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - ~/.pnpm-store
```

### ローカル開発環境でのデータ取得

ローカル開発環境では`.env`からサービスIDとアクセスキーを取得しています。
最新データを取得するときは、以下のコマンドを手動で実行します。

**統合実行（両サービス順次）**
```bash
pnpm run get-data
```

**個別実行**
```bash
# EVENTサービスのみ
pnpm run get-data:event

# UTILサービスのみ
pnpm run get-data:util
```

**実行内容**
- 各サービス: API取得→JSON生成→画像ダウンロード
- 生成ファイル: `src/data/*.json`, `src/data/getMedia*.sh`
- 個別実行により上書き競合を回避

---
