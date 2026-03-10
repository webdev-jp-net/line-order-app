# 謎解きページ

## 概要

個別の謎解き問題を表示し、ユーザーの回答入力と判定を行う画面。通常謎（4 問）と大謎（最終問題）を包括的に定義する。

## 通常謎

### ページ情報

- **ルートパス**: `/mission/[id]` ※id: 1-4
- **ページコンポーネント**: `MissionArticle`

### コンポーネント構成

```
MissionArticle/
├── MissionArticle.tsx          # ページコンポーネント
├── useMissionArticle.ts        # カスタムフックス
└── components/
    ├── MissionHeader/          # メインビジュアルエリア
    │   └── MissionHeader.tsx
    ├── MissionQuestion/         # 謎問題・回答・ヒントエリア
    │   └── MissionQuestion.tsx
    └── SpotInfo/               # スポット情報エリア
        └── SpotInfo.tsx

```

### 機能要件

#### 謎出題機能

- **問題表示**

  - 各観光スポットの謎題を出題
  - 現地情報をヒントとした謎解きを提供
  - 手順 1、手順 2 の形式で謎解きの進め方を説明

- **謎画像制御**

  - 初期状態：謎の画像を表示
  - 正答後：正解後画像に自動切り替え

- **回答処理**
  - テキスト入力による回答受付
  - API 通信で正解・不正解判定
  - 回答状態による表示切り替え

#### 回答処理フロー

- **回答送信**

  - 回答テキスト入力後、「回答する」ボタンで判定実行
  - `POST /answer/{id}` API呼び出しで回答判定を実行

- **状態管理**

  - APIレスポンス: `{ result: boolean, progress: Progress }`
  - `result`: 正誤判定結果
  - `progress`: 更新された進捗状態（`completedMissionList`を含む）
  - **重要**: APIレスポンスの`progress`でRedux storeを同期的に更新
  - `dispatch(updateProgress(result.progress))` により最新状態を反映
  - 状態更新後に結果ページへ遷移

- **正解時の処理**

  - Redux storeに正解状態が記録される（`completedMissionList`に追加）
  - `/mission/[id]/result`へ遷移
  - 結果ページで正解画面を表示

- **不正解時の処理**

  - Redux storeは更新されない（`completedMissionList`に変化なし）
  - `/mission/[id]/result`へ遷移
  - 結果ページで不正解画面を表示

#### ヒント機能

- ヒントボタンをタップでダイアログ表示
- ヒント表示後も回答は可能

#### お知らせバナー機能

- **表示条件**
  - MicroCMS（infoエンドポイント）の`relatedSpot`配列に当該ミッションIDが含まれる場合に表示
  - 複数のお知らせがある場合でも、バナーは1つのみ表示

- **バナー表示**
  - 探索可能時間の下に配置
  - infoアイコンと「このスポットについてのお知らせがあります」のテキストを表示
  - タップでお知らせ一覧ページ（`/menu/info`）へ遷移

- **判定ロジック**
  - `info.json`の全データを走査
  - `relatedSpot`配列に現在のミッションIDが含まれるかをチェック
  - 1件でも該当すれば`showInfoBanner`を`true`に設定

#### サポート機能

- アクセス情報の表示
- Google Map 連携（外部遷移）

### レイアウト要件

#### メインビジュアルエリア

- **画面上部配置**
  - メイン画像の表示
  - タイトルの配置
  - 探索可能時間の表示

#### 謎問題エリア

- **中央配置**
  - 手順説明の縦配置
  - 謎画像の中央配置

#### 回答エリア

- **謎問題エリア下部配置**
  - テキスト入力フィールド
  - 「回答する」ボタン
  - 結果表示エリア

#### スポット情報エリア

- **画面下部配置**
  - スポット説明文の表示
  - 営業時間の表示
  - 住所・交通手段の表示
  - 地図画像の表示
  - Google Map ボタンの配置

## 大謎

### ページ情報

- **ルートパス**: `/grand-mission`
- **ページコンポーネント**: `GrandMission`

### コンポーネント構成

```
GrandMission/
├── GrandMission.tsx            # ページコンポーネント
├── useGrandMission.ts          # カスタムフックス
└── components/
    └── GrandMissionQuestion/   # 大謎問題・回答・ヒントエリア
        └── GrandMissionQuestion.tsx

```

### 機能要件

#### アクセス制御

- **条件チェック**
  - 4 つの通常謎すべて正解済みの場合のみアクセス可能
  - 未完了の通常謎がある場合は適切な誘導

#### 最終問題機能

- **統合謎出題**

  - 全通常謎クリア後の最終問題を出題
  - 通常謎の答えを組み合わせた統合的な謎を提供
  - テキスト入力による最終回答受付

- **通常謎回答参照**

  - これまでの通常謎の答えを参照表示
  - 各謎の解答状況を明示

- **専用ヒント機能**
  - 大謎専用のヒントを段階的に表示
  - 通常謎の答えをヒントとして活用

#### 回答処理フロー

- **回答送信**

  - 回答テキスト入力後、「回答する」ボタンで判定実行
  - `POST /answer/grandMission` API呼び出しで回答判定を実行

- **状態管理**

  - APIレスポンス: `{ result: boolean, progress: Progress }`
  - `result`: 正誤判定結果
  - `progress`: 更新された進捗状態（`completedMissionList`を含む）
  - **重要**: APIレスポンスの`progress`でRedux storeを同期的に更新
  - `dispatch(updateProgress(result.progress))` により最新状態を反映
  - 状態更新後に結果ページへ遷移

- **正解時の処理**

  - Redux storeに正解状態が記録される（`completedMissionList`に`grandMission`を追加）
  - `/grand-mission/result`へ遷移
  - 結果ページで正解画面を表示

- **不正解時の処理**

  - Redux storeは更新されない（`completedMissionList`に変化なし）
  - `/grand-mission/result`へ遷移
  - 結果ページで不正解画面を表示

### レイアウト要件

#### 大謎問題・回答・ヒントエリア

- **中央配置**
  - 大謎のタイトル表示
  - 問題に関連するイメージ画像
  - テキスト入力フィールド
  - 「回答する」ボタン
  - ヒントボタン

## 回答結果ページ

### 通常謎回答結果ページ

#### ページ情報

- **ルートパス**: `/mission/[id]/result` ※id: 1-4
- **ページコンポーネント**: `MissionResult`

#### コンポーネント構成

```
MissionResult/
├── MissionResult.tsx           # ページコンポーネント
└── useMissionResult.ts         # カスタムフックス

```

#### 機能要件

- **状態判定**

  - Redux storeの`completedMissionList`から正誤判定を取得
  - `selectIsMissionCompleted(missionId)` セレクタで判定
  - 該当ミッションIDが`completedMissionList`に含まれていれば正解
  - 含まれていなければ不正解

- **正解時の表示**

  - 「正解」タイトル画像表示
  - 謎解き正解の祝福メッセージ
  - 正解画像の表示
  - ホーム画面への戻るボタン
  - 次の謎への誘導（該当する場合）

- **不正解時の表示**

  - 「不正解」タイトル画像表示
  - 再挑戦を促すメッセージ
  - 夜背景の表示
  - 謎解きページへ戻るボタン
  - ホーム画面への戻るボタン

### 大謎回答結果ページ

#### ページ情報

- **ルートパス**: `/grand-mission/result`
- **ページコンポーネント**: `MissionResult`

#### コンポーネント構成

```
MissionResult/
├── MissionResult.tsx           # ページコンポーネント
└── useMissionResult.ts         # カスタムフックス

```

#### 機能要件

- **状態判定**

  - Redux storeの`completedMissionList`から正誤判定を取得
  - `selectIsMissionCompleted('grandMission')` セレクタで判定
  - `completedMissionList`に`grandMission`が含まれていれば正解
  - 含まれていなければ不正解

- **正解時の表示**

  - 「正解」タイトル画像表示
  - キャラクター画像表示
  - メッセージ画像表示
  - 背景を透明に設定（`data-mission='grandMission'`属性で制御）
  - 「エンディングを見る」ボタンでエンディングストーリー（`/story/ending`）へ遷移

- **不正解時の表示**

  - 「不正解」タイトル画像表示
  - 大謎再挑戦を促すメッセージ
  - 夜背景の表示
  - 通常謎の答えを再確認するよう誘導
  - 大謎ページへ戻るボタン
  - ホーム画面への戻るボタン
