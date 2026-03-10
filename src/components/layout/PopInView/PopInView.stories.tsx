import { PopInView } from './PopInView'

import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'layout/PopInView',
  component: PopInView,
  decorators: [
    Story => (
      <div className="decorator center">
        <Story />
      </div>
    ),
  ],
} as Meta

export const Basic: StoryObj<typeof PopInView> = {
  args: {},
}
