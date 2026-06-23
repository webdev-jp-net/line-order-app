import { Expectation } from './Expectation'

import type { Meta, StoryObj } from '@storybook/react'


const meta: Meta<typeof Expectation> = {
  title: 'form/Expectation',
  component: Expectation,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Expectation>

// デフォルトの4段階評価を使用
export const Basic: Story = {
  args: {
    name: 'expectation',
    options: [
      { label: '0', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
    ],
  },
}

// HTMLタグを使用した例
export const WithHtmlTags: Story = {
  args: {
    name: 'expectation',
    options: [
      {
        label: <>低い</>,
        value: 0,
      },
      {
        label: (
          <>
            <small>やや</small>
            <br />
            低い
          </>
        ),
        value: 1,
      },
      {
        label: (
          <>
            <small>やや</small>
            <br />
            高い
          </>
        ),
        value: 2,
      },
      {
        label: <>高い</>,
        value: 3,
      },
    ],
  },
}

export const WithDefaultValue: Story = {
  args: {
    ...Basic.args,
    value: 2,
  },
}
