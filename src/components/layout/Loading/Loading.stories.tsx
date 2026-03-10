import { Loading } from './Loading'

import type { Meta, StoryObj } from '@storybook/react'


export default {
  title: 'layout/Loading',
  component: Loading,
  decorators: [
    Story => (
      <div className="decorator center">
        <Story />
      </div>
    ),
  ],
} as Meta

export const Basic: StoryObj<typeof Loading> = {
  args: {},
}
