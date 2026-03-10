import type { Meta, StoryObj } from '@storybook/react'

import { Privacy } from './Privacy'

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
