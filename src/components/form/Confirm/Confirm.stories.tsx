import { Confirm } from './Confirm'

import type { Meta, StoryObj } from '@storybook/react'


export default {
  title: 'form/Confirm',
  component: Confirm,
  decorators: [
    Story => (
      <div className="decorator center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Confirm>

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
