import type { MemoryRouter as Router } from 'react-router-dom'

import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { Input } from './Input'

export default {
  title: 'form/Input',
  component: Input,
  decorators: [
    (Story: StoryFn<typeof Router>) => (
      <div className="decorator center">
        <Story />
      </div>
    ),
  ],
} as Meta

export const Basic: StoryObj<typeof Input> = {
  args: {
    placeholder: 'テキストを入力してください',
    name: 'sample',
  },
}
