import { Radio } from './Radio'

import type { Meta, StoryObj } from '@storybook/react'


const meta: Meta<typeof Radio> = {
  title: 'form/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Radio>

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
