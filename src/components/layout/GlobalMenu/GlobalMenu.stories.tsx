import { MemoryRouter } from 'react-router-dom'

import { GlobalMenu } from './GlobalMenu'

import type { Meta, StoryObj } from '@storybook/react'

/**
 * グローバルメニューコンポーネント
 *
 * アプリケーション全体で使用される固定メニューです。
 * 現在のページに応じてアクティブ状態が切り替わります。
 */
const meta = {
  title: 'Layout/GlobalMenu',
  component: GlobalMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ナビゲーション',
      },
    },
  },
  decorators: [
    Story => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof GlobalMenu>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本表示
 */
export const Default: Story = {}
