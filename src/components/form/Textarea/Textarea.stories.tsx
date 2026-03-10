import type { MemoryRouter as Router } from 'react-router-dom'

import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { Textarea } from './Textarea'

export default {
  title: 'form/Textarea',
  component: Textarea,
  decorators: [
    (Story: StoryFn<typeof Router>) => (
      <div className="decorator center">
        <Story />
      </div>
    ),
  ],
} as Meta

export const Basic: StoryObj<typeof Textarea> = {
  args: {},
}
