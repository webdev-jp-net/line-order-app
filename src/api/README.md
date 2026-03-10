## APIクライアント自動生成

### 設定ファイル

`openapi-config.cjs`は、`@rtk-query/codegen-openapi`を使用してRTK Query APIクライアントを自動生成するための設定ファイルです。

### 生成コマンド

```bash
# APIクライアントを生成
pnpm run api:gen

# モックサーバーを起動
pnpm run mock-api
```

### ファイル構成

- **OpenAPI仕様書**: `_document/_llm-docs/spec/fuji/api-structure.yaml`
- **設定ファイル**: `src/api/openapi-config.cjs`
- **生成先**: `src/store/_apiClient.ts`
- **内容**: OpenAPI仕様書から自動生成されたRTK Query API定義
- **注意**: `_apiClient.ts`は自動生成されるため、手動で編集しないでください

## 開発フロー

1. **API仕様の更新**: `_document/_llm-docs/spec/fuji/api-structure.yaml`を編集
2. **コード生成**: `pnpm run api:gen`を実行
3. **モック確認**: `pnpm run mock-api`でモックサーバーを起動して動作確認

## 注意事項

- `_apiClient.ts`は自動生成ファイルのため、ESLint・Prettier・Stylelintの対象外に設定されています
- `openapi-config.cjs`はES module環境でのCommonJS形式で記述されています
- モックサーバーはPrismを使用して実装されています
