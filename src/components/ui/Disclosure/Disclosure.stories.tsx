import type { MemoryRouter as Router } from 'react-router-dom'

import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { Lightbulb, HelpCircle } from 'lucide-react'

import { Disclosure } from './Disclosure'

export default {
  title: 'ui/Disclosure',
  component: Disclosure,
  decorators: [
    (Story: StoryFn<typeof Router>) => (
      <div className="decorator center">
        <Story />
      </div>
    ),
  ],
} as Meta

export const Basic: StoryObj<typeof Disclosure> = {
  args: {
    label: 'ラベル名のテキスト',
    children: (
      <>
        <p>これは長いコンテンツを含むDisclosureコンポーネントです。</p>
        <p>複数の段落があります。</p>
        <p>これは長いコンテンツを含むDisclosureコンポーネントです。</p>
        <p>複数の段落があります。</p>
        <p>これは長いコンテンツを含むDisclosureコンポーネントです。</p>
        <p>複数の段落があります。</p>
        <p>これは長いコンテンツを含むDisclosureコンポーネントです。</p>
        <p>複数の段落があります。</p>
      </>
    ),
  },
}

export const WithIcon: StoryObj<typeof Disclosure> = {
  args: {
    headIcon: Lightbulb,
    label: 'ヒント',
    children: <p>アイコン付きのDisclosureコンポーネントです。</p>,
  },
}

export const MultipleItems: StoryObj<typeof Disclosure> = {
  render: () => (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Disclosure label="位置情報が許可されていないと警告が出ます" headIcon={HelpCircle}>
        <p>1つ目の項目の内容です。</p>
      </Disclosure>
      <Disclosure label="項目2" headIcon={HelpCircle}>
        <p>2つ目の項目の内容です。</p>
      </Disclosure>
      <Disclosure label="項目3" headIcon={HelpCircle}>
        <p>3つ目の項目の内容です。</p>
      </Disclosure>
    </div>
  ),
}
