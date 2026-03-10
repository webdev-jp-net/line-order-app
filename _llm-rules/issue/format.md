# Issue Format Specification

## 概要

このドキュメントはプロジェクトにおける統一的な Issue 形式の技術仕様を定義します。
すべてのツールおよびスクリプトは、この仕様書を参照して Issue 形式を扱う必要があります。

このドキュメントはプロジェクトにおける統一的な Issue 形式の技術仕様を定義します。
すべてのツールおよびスクリプトは、この仕様書を参照して Issue 形式を扱う必要があります。

**Single Source of Truth**: このドキュメントが Issue 形式に関するすべての技術仕様の基準となります。

> **📖 プロジェクト固有設定**: プロジェクト固有の設定については、[プロジェクト要件定義](../../_llm-docs/project.md)から参照してください。

## Issue 形式定義

### 基本形式

```
形式: #番号 | タイトル | issueType | label | category | priority | section | 状態
形式: #番号 | タイトル | issueType | label | category | priority | section | 状態
```

### フィールド詳細

#### 番号 (#番号)

- GitHub Issue番号
- DRAFT状態の場合は `#-` と表記

#### タイトル

- Issueのタイトル
- 日本語で記載
- 簡潔で分かりやすい表現

#### issueType

- Issueの種類
- 以下のいずれか：
  - `Bug`: バグ修正
  - `Feature`: 新機能
  - `Task`: タスク
- 空の場合は空文字列 `""`

#### label

- GitHubのラベル
- カンマ区切りで複数指定可能
- 空の場合は空文字列 `""`

#### category

- 技術カテゴリー
- 以下のいずれか：
  - `structure`: 構造・アーキテクチャ関連
  - `frontend`: フロントエンド関連
  - `backend`: バックエンド関連
  - `infrastructure`: インフラ関連
- 空の場合は空文字列 `""`

#### priority

- 優先度
- 以下のいずれか：
  - `Critical`: 最重要
  - `High`: 高
  - `Medium`: 中
  - `Low`: 低
- 空の場合は空文字列 `""`

#### section

- 対象セクション（サイト）
- プロジェクト固有の値（[プロジェクト要件定義](../../_llm-docs/project.md)から参照）
- 空の場合は空文字列 `""`

#### 状態

- Issueの状態
- 以下のいずれか：
  - `DRAFT`: 下書き（GitHub 未登録）
  - `OPEN`: オープン
  - `CLOSED`: クローズ

## 実装例

### TypeScript

```typescript
export interface IssueFormat {
  number: number | null // null for DRAFT
  title: string
  issueType: 'Bug' | 'Feature' | 'Task' | ''
  label: string
  category: 'structure' | 'frontend' | 'backend' | 'infrastructure' | ''
  priority: 'Critical' | 'High' | 'Medium' | 'Low' | ''
  section: string // プロジェクト固有の値
  state: 'DRAFT' | 'OPEN' | 'CLOSED'
}

export const ISSUE_FORMAT_HEADER =
  '形式: #番号 | タイトル | issueType | label | category | priority | section | 状態'
```

### JavaScript

```javascript
const ISSUE_FORMAT_HEADER =
  '形式: #番号 | タイトル | issueType | label | category | priority | section | 状態'

const ISSUE_TYPES = ['Bug', 'Feature', 'Task']
const CATEGORIES = ['structure', 'frontend', 'backend', 'infrastructure']
const PRIORITIES = ['Critical', 'High', 'Medium', 'Low']
// SECTIONSはプロジェクト固有設定で定義する
const STATES = ['DRAFT', 'OPEN', 'CLOSED']
```

## 使用方法

### 1. 仕様書の読み込み

各ツールは起動時にこの仕様書を読み込み、形式定義を取得します。

### 2. パース処理

```javascript
// 例: Issue行のパース
const parseIssueLine = line => {
  const match = line.match(
    /^- #(\d+|-) \| ([^|]+) \| ([^|]*) \| ([^|]*) \| ([^|]*) \| ([^|]*) \| ([^|]*) \| (DRAFT|OPEN|CLOSED)/
  )
  if (!match) return null

  return {
    number: match[1] === '-' ? null : parseInt(match[1]),
    title: match[2].trim(),
    issueType: match[3].trim(),
    label: match[4].trim(),
    category: match[5].trim(),
    priority: match[6].trim(),
    section: match[7].trim(),
    state: match[8],
  }
}
```

### 3. フォーマット処理

```javascript
// 例: Issueオブジェクトの文字列化
const formatIssue = issue => {
  const number = issue.number || '-'
  return `- #${number} | ${issue.title} | ${issue.issueType || ''} | ${issue.label || ''} | ${issue.category || ''} | ${issue.priority || ''} | ${issue.section || ''} | ${issue.state}`
}
```

## データ管理仕様

### ファイル配置

Issue 管理ファイルは `_llm-memories/issues/` 配下に配置されます。
プロジェクトごとのファイル構成の詳細は、プロジェクト要件定義を参照してください。

### 各ファイルの構造

```markdown
# [repo] Issue List

最終更新: YYYY-MM-DD
```

形式: #番号 | タイトル | issueType | label | category | priority | section | 状態

```

## DRAFT Issues
（GitHub未登録の候補）

## OPEN Issues
（GitHub同期済み、作業中）

## CLOSED Issues
（GitHub同期済み、完了）
```

### バリデーション仕様

#### 必須フィールドチェック

- `number`: DRAFT 時は null、その他は正の整数
- `title`: 非空文字列
- `state`: 'DRAFT' | 'OPEN' | 'CLOSED' のいずれか

#### 整合性チェック

- `number` が null でない場合、`state` は 'OPEN' または 'CLOSED'
- GitHub Issue 番号の一意性
- フィールド値の有効性（category, priority, section の値）

## MCP サーバー実装仕様

### 実装ファイル

- **型定義**: `tools/mcp-server/types/issue.ts`
- **パース処理**: `tools/mcp-server/utils/issue-file-manager.ts`
- **バリデーション**: `tools/mcp-server/utils/data-validator.ts`

### データ変換仕様

#### GitHub Issue → 構造化形式

```typescript
function convertGitHubIssueToFormat(issue: GitHubIssue): IssueFormat {
  return {
    number: issue.number,
    title: issue.title,
    issueType: extractIssueTypeFromLabels(issue.labels),
    label: issue.labels.map(l => l.name).join(','),
    category: extractCategoryFromLabels(issue.labels),
    priority: extractPriorityFromLabels(issue.labels),
    section: mapRepositoryToSection(issue.repository),
    state: issue.state === 'open' ? 'OPEN' : 'CLOSED',
  }
}
```

#### 構造化形式 → GitHub Issue

```typescript
function convertFormatToGitHubIssue(format: IssueFormat): Partial<GitHubIssue> {
  return {
    title: format.title,
    labels: format.label ? format.label.split(',').map(l => l.trim()) : [],
    state: format.state === 'OPEN' ? 'open' : 'closed',
  }
}
```

## 関連ドキュメント

- **AI 動作ルール**: [Issue 管理マスター](./master.md)
- **GitHub Projects ルール**: [GitHub Projects 連携ルール](./projects_integration.md)
- **プロジェクト固有設定**: [プロジェクト要件定義](../../_llm-docs/project.md)から参照

## 注意事項

1. すべてのツールはこの仕様書を参照すること
2. 形式を変更する場合は、この仕様書を更新し、全ツールに反映すること
3. プロジェクト固有の設定（section 値等）は[プロジェクト要件定義](../../_llm-docs/project.md)から参照する

---

**⚠️ 重要**: このドキュメントは技術仕様のみを定義します。AI の動作ルールやプロジェクト固有設定はそれぞれ対応するドキュメントを参照してください。
