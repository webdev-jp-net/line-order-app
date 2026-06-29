// OpenAPI の定義から RTK Query の API クライアントを生成する設定
// https://redux-toolkit.js.org/rtk-query/usage/code-generation#simple-usage
const config = {
  // OpenAPI の定義ファイル
  schemaFile: '../../_document/_llm-docs/spec/api-structure.yaml',
  // 元になる RTK Query の定義ファイル
  apiFile: '../store/initApi.ts',
  // 元になる RTK Query の関数名
  apiImport: 'initApi',
  // 生成先の API クライアントファイル
  outputFile: '../store/_apiClient.ts',
  // 生成される API クライアントの名前
  exportName: 'apiClient',
  // 生成するフックの種類
  hooks: { queries: true, lazyQueries: true, mutations: true },
}

module.exports = config
