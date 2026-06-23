import { Checkbox } from './Checkbox'

import type { Meta, StoryObj } from '@storybook/react'


export default {
  title: 'form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
} as Meta

type Story = StoryObj<typeof Checkbox>

const options = [
  { label: 'クリエイティブ', value: 'option1' },
  { label: 'ディレクション', value: 'option2' },
  { label: 'マネジメント', value: 'option3' },
]

// 制御されていないコンポーネントの例
export const Basic: Story = {
  args: {
    name: 'example',
    options: options,
  },
}

export const Disabled: Story = {
  args: {
    ...Basic.args,
    disabled: true,
  },
}
