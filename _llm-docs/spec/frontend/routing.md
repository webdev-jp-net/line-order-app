# ルーティング設計書

## ルーティング定義

| ルートパス              | ページコンポーネント | 説明                                                   |
| ----------------------- | -------------------- | ------------------------------------------------------ |
| /                       | Splash               | 初回起動・スプラッシュ画面                             |
| /story/opening          | StoryArticle         | オープニングストーリー表示                             |
| /profile                | Profile              | プロフィール入力（ユーザー属性登録）                   |
| /home                   | Home                 | ホーム画面（通常謎一覧表示）                           |
| /map/                   | Map                  | エリアマップ                                           |
| /progress/              | Progress             | 進捗                                                   |
| /progress/story/opening | StoryArticle         | メニューからのオープニングストーリー表示               |
| /progress/story/ending  | StoryArticle         | メニューからのエンディングストーリー表示               |
| /clue/[id]              | ClueArticle          | 手がかり                                               |
| /celebration            | Celebration          | イベントクリア画面                                     |
| /story/ending           | StoryArticle         | エンディング画面（大謎クリア後エンディング画面へ遷移） |
| /menu                   | Menu                 | メニュー画面                                           |
| /menu/support           | MenuSupport          | システム情報                                           |
| /reward                 | Reward               | プレゼント情報                                         |
| /survey                 | Survey               | アンケート画面                                         |

## オンボーディングフロー

初回ユーザーの導線：
1. `/` (Splash) - 初回起動画面
2. `/story/opening` (StoryArticle) - オープニングストーリー表示
3. `/profile` (Profile) - プロフィール入力フォーム
4. `/home` (Home) - ホーム画面へ遷移（初回はPlayGuideオーバーレイ表示）

## 認証区分

### 認証必要（全ページ）

- すべてのルートでLINEログイン認証が必要

### オンボーディング不要

- /
- /profile
- /story/opening

### オンボーディング必要

- 上記以外すべて（チュートリアル完了後のみアクセス可能）

## ディレクトリ構造の規約

### 命名規則

- コンポーネントディレクトリ: PascalCase（例: Mission、GrandMission）
- 複数階層のコンポーネント: 各階層名をPascalCaseで連結（例: /menu/caution → MenuCaution）
- 動的パラメーターを含むルート: パラメーター部分を除いてネーミング（例: /prize/[id]/result → PrizeResult）

### ディレクトリ構造例

```
src/pages/
├── _continue/
│   ├── Celebration/
│   ├── GrandMission/
│   ├── Home/
│   ├── Menu/
│   ├── MenuSupport/
│   ├── MissionArticle/
│   ├── PrizeExchange/
│   ├── Prize/
│   └── StoryArticle/
│
├── _onboarding/
│   └── Profile/
│
├── NotFound/
└── Maintenance/
```

## 使用例

```typescript
// チュートリアル完了後ページ
import { Celebration } from 'pagesContinue/Celebration'
import { GrandMission } from 'pagesContinue/GrandMission'
import { Home } from 'pagesContinue/Home'
import { Menu } from 'pagesContinue/Menu'
import { MenuSupport } from 'pagesContinue/MenuSupport'
import { MissionArticle } from 'pagesContinue/MissionArticle'
import { PrizeExchange } from 'pagesContinue/PrizeExchange'
import { Prize } from 'pagesContinue/Prize'
import { StoryArticle } from 'pagesContinue/StoryArticle'

// オンボーディングページ
import { Profile } from 'pagesOnboarding/Profile'

// 共通ページ
import { NotFound } from 'pages/NotFound'
import { Maintenance } from 'pages/Maintenance'
```

## 関連ドキュメント

- [開発用ネーミング辞書](../../operation/dictionary.md)
- [アプリ全体仕様](./index.md)
- [LINE ログイン認証](../common/line_auth.md)