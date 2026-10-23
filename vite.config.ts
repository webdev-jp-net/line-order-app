import fs from 'fs'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// ローカル開発環境でHTTPS設定
const isLocal = process.env.NODE_ENV === 'development'

const httpsOptions = isLocal
  ? {
      key: fs.readFileSync('./.ssl/localhost-key.pem'),
      cert: fs.readFileSync('./.ssl/localhost-cert.pem'),
    }
  : undefined

// vitest.config.tsファイルでも使用するため、エイリアスをエクスポート
export const alias = {
  api: '/src/api',
  components: '/src/components',
  constants: '/src/constants',
  data: '/src/data',
  layout: '/src/layout',
  pages: '/src/pages',
  routes: '/src/routes',
  store: '/src/store',
  style: '/src/style',
  types: '/src/types',
  utils: '/src/utils',
  lib: '/src/lib',
  hooks: '/src/hooks',
  test: '/src/test',
}

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      react({
        // HMR の詳細設定
        include: '**/*.{jsx,tsx}',
      }),
    ],

    resolve: {
      alias,
    },

    // 依存関係事前最適化設定
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime'],
      exclude: [],
      rolldownOptions: {
        transform: {
          target: 'es2020',
        },
      },
    },

    server: {
      https: httpsOptions,
      port: 3000,
      host: '0.0.0.0',
      open: true,
      // ポート衝突時は自動で次のポートを使用
      strictPort: false,
      // HMR設定
      hmr: {
        overlay: true,
      },
      // HMR用WebSocketの接続先ポート
      ws: {
        clientPort: 3000,
      },
      // ファイル監視設定
      watch: {
        ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**', '**/coverage/**', '**/*.log'],
        usePolling: false,
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: command === 'build' ? false : true,
      target: 'es2020',
      // チャンク分割設定
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: 'vendor',
                test: /[\\/]node_modules[\\/](react|react-router|react-dom|react-redux|@reduxjs[\\/]toolkit|redux-persist)[\\/]/,
              },
            ],
          },
          // 本番環境でのconsole.log削除
          minify: {
            compress: {
              dropConsole: true,
              dropDebugger: true,
            },
            mangle: true,
            codegen: true,
          },
        },
      },
      // ビルド最適化
      minify: 'oxc',
      cssCodeSplit: true,
      // アセット処理
      assetsInlineLimit: 4096,
    },

    // ローカル開発環境でHTTPSを有効にするときだけコメントアウトを外す。
    // コメントアウトせずコミットすると、GitHub Actionsでbuild失敗する可能性があります。
    // preview: {
    //   https: httpsOptions,
    // },

    // oxc設定
    oxc: {
      target: 'es2020',
      // JSXのimport最適化
      jsxInject: `import React from 'react'`,
    },

    // CSS設定
    css: {
      devSourcemap: true,
      modules: {
        localsConvention: 'camelCase',
      },
      preprocessorOptions: {
        scss: {
          quietDeps: true,
        },
      },
    },

    // 開発用設定
    define: {
      __DEV__: command !== 'build',
      __VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  }
})
