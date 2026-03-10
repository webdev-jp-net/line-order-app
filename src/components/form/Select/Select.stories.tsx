import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './Select'

export default {
  title: 'form/Select',
  component: Select,
  decorators: [
    Story => (
      <div className="decorator center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export const Basic: StoryObj<typeof Select> = {
  args: {
    option: [
      { label: 'AAA', value: 'AAA' },
      { label: 'AA', value: 'AA' },
      { label: 'A', value: 'A' },
    ],
    value: 'A',
  },
}
