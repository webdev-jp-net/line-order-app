import { Textarea } from './Textarea'

import type { Meta, StoryObj } from '@storybook/react'


export default {
  title: 'form/Textarea',
  component: Textarea,
  decorators: [
    Story => (
      <div className="decorator center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>

export const Basic: StoryObj<typeof Textarea> = {
  args: {},
}
