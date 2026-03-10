# スタイリング方針

## 概要
このドキュメントは、スタイリングに関する実装方針と参照先をまとめたものです。

## 技術スタック（スタイリング関連）

### 使用技術
- **CSS Modules + SCSS**: スタイリング

## スタイリング哲学

### 基本方針
- **非ユーティリティファースト**: 意味のあるクラス名を使用
- **セマンティクス志向**: コンポーネントの役割を表すクラス名
- **CSS Modules**: スコープ化されたCSS（BEM命名不要）
- **SCSS**: ネストや変数を活用した保守性の高いスタイル
- **モジュラー設計**: コンポーネント単位でスタイルを管理

### DRY原則とlayerStyles
- 同じスタイル定義の重複を排除

### セマンティックスタイリング
- 装飾を表現した命名を避け、用途や意味を基準とした命名
- ユーティリティファースト設計禁止（スタイルの羅列より意味的な抽象化を優先）
- BEM命名禁止（CSS Modulesでスコープ分離済み）
- クラス名は[dictionary](../../../operation/dictionary.md#css-クラス名)準拠

## レスポンシブ対応

スマートフォンのポートレートレイアウトのみ対象とする。  
タブレット・PC向けレイアウトは考慮しない。  

## 実装プロセス

### 基本実装（必須）
- **オフィシャルドキュメントでの詳細確認**
- セマンティックなHTML構造の構築
- データフローと状態管理の実装
- スペーシング調整
- 基本動作の確認

### 装飾の実装ルール

**装飾（色、影、ボーダー、アニメーション等）は以下の条件を満たす場合のみ実装可能：**
- 明確な参照実装が指示されている場合
- 既存コンポーネントの踏襲が要求されている場合

**明示的な指示がない装飾は禁止。**

## スタイル実装の原則

### TSXでの装飾ルール
- 指示がない提案レベルでの装飾追加は禁止
- 明示的な指示がある場合は実装可能
- 既存のプロジェクト内コードと同じ装飾を踏襲する場合は許可

### SCSS実装原則

#### 実装例

#### 単位の使用
**原則：remを基準とした相対値指定**

SCSSでの実装：
- rem関数を使用してpx値をremに変換

```scss
@use "style/_variable" as *;
.example {
  margin: rem(16);  // 16px → 1rem
  padding: rem(24); // 24px → 1.5rem
}
```

TSXでの実装：
- pxをそのまま使わず、必ずremに変換して指定

```tsx
// 推奨
<Box mt="1.5rem" p="2rem">

// 非推奨
<Box mt="24px" p="32px">
```

例外：
- 1pxのborderはpxで表現
- 割合を示す場合は%で表現

```scss
.example {
  border: 1px solid;  // 1pxは例外
  width: 100%;        // 割合は%
}
```

#### カラーの管理
色はCSS Variablesを使用する。  

```scss
.icon {
  .--valid & {
    color: var(--txt-basic);
  }

  .--invalid & {
    color: var(--txt-alert);
  }
}
```

## レイアウト実装の優先順位
1. Flexbox/Grid（place-content, align-items, gap等）
2. margin: auto（中央配置）
3. position + inset + margin: auto
4. transform: translate（最終手段）

## ポジショニング実装の優先順位

### position配置での位置指定
1. **inset**: 上下左右を一括指定（`inset: 0` 等）
2. top/left/right/bottom: insetで表現できない場合のみ個別指定

### flexbox/gridでの配置
1. **place-content**: 縦横両方向の配置を一括指定
2. **place-items**: 縦横両方向のアイテム配置を一括指定
3. align-**/justify-**: place-*で表現できない場合のみ個別指定

### 実装例
```scss
// 良い例
.centered {
  position: absolute;
  inset: 0;
  margin: auto;
}

.flex-centered {
  display: flex;
  place-content: center;
  place-items: center;
}

// 避けるべき例
.old-style {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## 参考資料
- [MDN Web Docs - Semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)