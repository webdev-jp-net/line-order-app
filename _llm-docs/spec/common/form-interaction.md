# フォームインタラクション設計

## 基本設計思想

### フォーム監視アプローチ
- 個別のInput要素ではなく、form要素全体を監視対象とする
- HTMLFormElementのネイティブ機能（checkValidity、FormData等）を活用
- イベントバブリングによる効率的な状態管理

### ユーザーフィードバックの2段階設計

#### 入力中（onInput）
- submitボタンのdisabled/enabled切り替えのみ
- エラーメッセージは表示しない
- レイアウトシフトを避ける
- ユーザーは「まだ送信できない」ことを視覚的に認識

#### 送信試行時（onSubmit）
- バリデーションエラーがある場合のみエラーメッセージ表示
- 正常な操作フローではエラーメッセージは表示されない
- 防御的プログラミングとしてのエラーハンドリング

## useFormフックの使用方法

### 基本的な使い方

```tsx
const { formRef, isValid } = useForm()

const handleSubmit = useCallback(async (e: React.FormEvent) => {
  e.preventDefault()
  if (!formRef.current || !isValid) return
  
  const formData = new FormData(formRef.current)
  // FormDataから値を取得して処理
}, [formRef, isValid])

return (
  <form ref={formRef} onSubmit={handleSubmit}>
    <input name="email" type="email" required />
    <button type="submit" disabled={!isValid}>送信</button>
  </form>
)
```

## 必要な属性

### 必須属性
- **name**: FormDataでの値取得に必要
- **required**: 必須フィールドの指定（useFormが自動監視）

### 推奨属性
- **type**: 適切な入力タイプ（email、url、number等）でネイティブバリデーションを強化
- **pattern**: 正規表現によるカスタムバリデーション（例：`pattern="[0-9]{3}-[0-9]{4}"`）

### オプション属性
- **defaultValue**: 初期値（編集モード時）
- **placeholder**: 入力例の表示
- **disabled**: 送信中の操作無効化

## 設計上の利点

### コードの簡潔性
- 個別のstate管理不要
- 個別のonChangeハンドラー不要
- バリデーション関数の個別呼び出し不要

### パフォーマンス
- イベントリスナーが1つのみ（form要素）
- 不要な再レンダリングを削減

### 保守性
- フォームロジックの一元管理
- 横展開時の実装パターン統一
- ブラウザ標準機能の活用

## 実装上の注意点

### FormDataの使用
- name属性が必須
- RadioGroupは選択された値のみ取得
- checkboxは複数選択を考慮した実装が必要

### バリデーション
- HTML5標準バリデーションを基本とする
- カスタムバリデーションはsubmit時に実装
- リアルタイムフィードバックはsubmitボタンの状態のみ

### エラーハンドリング
- サーバーサイドエラーはtoasterで表示
- フィールド個別のエラーは最小限に留める