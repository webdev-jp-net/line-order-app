// Open APIの定義からRTK Queryの定義を生成する
// https://redux-toolkit.js.org/rtk-query/usage/code-generation#simple-usage
const config = {
  // Open APIの定義ファイル
  schemaFile: '../../_llm-docs/spec/api-structure.yaml',
  // 元になるRTK Queryの定義ファイル
  apiFile: '../store/initApi.ts',
  // 元になるRTK Queryの関数名
  apiImport: 'initApi',
  // Open APIの定義ファイルを元に、APIクライアントを生成するファイル
  outputFile: '../store/_apiClient.ts',
  // 生成されるAPIクライアントの名前
  exportName: 'apiClient',
  // 生成するAPIクライアントの種類
  hooks: { queries: true, lazyQueries: true, mutations: true },
}

module.exports = config
