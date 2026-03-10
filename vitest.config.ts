/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { alias } from './vite.config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias,
  },
  server: {
    // 開発サーバー用ポート設定
    port: 3000,
  },
  preview: {
    // Vitest UI 用のプレビューポート設定
    port: 51204,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    env: {
      VITE_API_BASE_URL: 'http://localhost:4010',
    },
    // レポーター設定
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/test/**',
        'src/vite-env.d.ts',
        'src/main.tsx',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    testTimeout: 10000,
    hookTimeout: 10000,
    // UI での階層表示最適化
    sequence: {
      shuffle: false, // テストの順序を一定に保つ
    },
    // 実行時間の詳細表示
    slowTestThreshold: 1000, // 1秒以上のテストをslow扱い
  },
})
