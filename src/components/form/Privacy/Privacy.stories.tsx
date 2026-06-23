import { Privacy } from './Privacy'

import type { Meta, StoryObj } from '@storybook/react'


export default {
  title: 'form/Privacy',
  component: Privacy,
  decorators: [
    Story => (
      <div className="decorator center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Privacy>

export const Basic: StoryObj<typeof Privacy> = {
  args: {
    url: 'https://example.com',
  },
}
