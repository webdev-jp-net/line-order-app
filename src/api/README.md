# API クライアント生成

`line-order-api` のOpenAPI定義から、RTK QueryのAPIクライアントを自動生成します。

- 定義ファイル: `api-structure.yaml`
- 生成設定: `openapi-config.cjs`
- 生成先: `../store/_apiClient.ts`

## 生成

```bash
pnpm api:gen
```

`_apiClient.ts` は自動生成ファイルです。手で編集せず、`api-structure.yaml` を直して再生成してください（ESLint・Prettier の対象外）。

## モックサーバー

定義ファイルからモックAPIを起動できます。

```bash
pnpm mock-api   # http://localhost:4010
```
