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
      esbuildOptions: {
        target: 'es2020',
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
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: [
              'react',
              'react-router-dom',
              'react-dom',
              'react-redux',
              '@reduxjs/toolkit',
              '@reduxjs/toolkit/query/react',
              'redux-persist',
            ],
          },
        },
      },
      // ビルド最適化
      minify: 'esbuild',
      cssCodeSplit: true,
      // アセット処理
      assetsInlineLimit: 4096,
    },

    // ローカル開発環境でHTTPSを有効にするときだけコメントアウトを外す。
    // コメントアウトせずコミットすると、GitHub Actionsでbuild失敗する可能性があります。
    // preview: {
    //   https: httpsOptions,
    // },

    // esbuild設定
    esbuild: {
      target: 'es2020',
      // 本番環境でのconsole.log削除
      drop: command === 'build' ? ['console', 'debugger'] : [],
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
          silenceDeprecations: ['mixed-decls'],
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
