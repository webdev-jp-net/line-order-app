import type { MemoryRouter as Router } from 'react-router-dom'

import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { Confirm } from './Confirm'

export default {
  title: 'form/Confirm',
  component: Confirm,
  decorators: [
    (Story: StoryFn<typeof Router>) => (
      <div className="decorator center">
        <Story />
      </div>
    ),
  ],
} as Meta

export const Basic: StoryObj<typeof Confirm> = {
  args: {
    items: {
      name: {
        label: '名前',
        value: '山田太郎',
        path: '/profile/name',
      },
      gender: {
        label: '性別',
        value: '男',
        path: '/profile/gender',
      },
      age: {
        label: '年齢',
        value: '20',
        path: '/profile/age',
      },
      hobby: {
        label: '趣味',
        value: 'ゲーム',
        path: '/profile/hobby',
      },
    },
    isEditable: true,
  },
}
