import type { MemoryRouter as Router } from 'react-router-dom'

import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { Select } from './Select'

export default {
  title: 'form/Select',
  component: Select,
  decorators: [
    (Story: StoryFn<typeof Router>) => (
      <div className="decorator center">
        <Story />
      </div>
    ),
  ],
} as Meta

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
