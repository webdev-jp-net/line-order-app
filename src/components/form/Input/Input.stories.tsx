import { Input } from './Input'

import type { Meta, StoryObj } from '@storybook/react'


export default {
  title: 'form/Input',
  component: Input,
  decorators: [
    Story => (
      <div className="decorator center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export const Basic: StoryObj<typeof Input> = {
  args: {
    placeholder: 'テキストを入力してください',
    name: 'sample',
  },
}
