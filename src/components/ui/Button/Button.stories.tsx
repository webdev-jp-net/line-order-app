import { Fragment } from 'react'

import { action } from 'storybook/actions'
import type { Meta, StoryObj } from '@storybook/react'

import { Lightbulb, X, ArrowRight, SquareArrowOutUpRight } from 'lucide-react'

import { Button } from './Button'

/**
 * ボタンコンポーネント
 *
 * アプリケーション全体で使用される汎用的なボタンコンポーネントです。
 * サイズやバリアントを変更して、様々なコンテキストで使用できます。
 */
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '汎用的なボタンコンポーネント。サイズとバリアントのカスタマイズが可能。',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'ボタンのテキストまたは内容',
    },
    size: {
      control: { type: 'select', options: ['full', 'liquid', 'icon'] },
      description: 'ボタンのサイズ',
    },
    variant: {
      control: { type: 'select', options: ['minor', 'basic', 'accent', 'link'] },
      description: 'ボタンのスタイルバリアント',
    },
    onClick: {
      action: 'clicked',
      description: 'クリック時のコールバック',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
    type: {
      control: { type: 'select', options: ['button', 'submit', 'reset'] },
      description: 'ボタンのタイプ属性',
    },
    className: {
      control: 'text',
      description: '追加のクラス名',
    },
  },
  decorators: [
    Story => (
      <div className={`decorator center`}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なボタン
 */
export const Basic: Story = {
  args: {
    children: 'ボタン',
    size: 'liquid',
    variant: 'basic',
    onClick: action('click'),
    type: 'button',
    disabled: false,
    headIcon: Lightbulb,
    tailIcon: ArrowRight,
  },
}

/**
 * 全バリエーション表示
 */
export const AllVariants = () => {
  const variants = ['minor', 'basic', 'accent'] as const
  const sizes = ['liquid', 'liquid', 'icon', 'full', 'full'] as const
  const hasHeadIcon = [1, 4]
  const hasTailIcon = [1, 4]

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      {variants.map(variant => (
        <Fragment key={variant}>
          {sizes.map((size, index) => (
            <Button
              key={`${variant}-${size}`}
              variant={variant}
              size={size}
              headIcon={hasHeadIcon.includes(index) ? Lightbulb : size === 'icon' ? X : undefined}
              tailIcon={hasTailIcon.includes(index) ? ArrowRight : undefined}
              onClick={action(`click-${variant}-${size}`)}
            >
              {size === 'icon' ? '' : `${variant} ${size}`}
            </Button>
          ))}
        </Fragment>
      ))}

      <Button variant="link" size="liquid" onClick={action('click-link')}>
        リンクボタン
      </Button>

      <Button
        variant="link"
        size="liquid"
        tailIcon={SquareArrowOutUpRight}
        onClick={action('click-link')}
      >
        外部リンクボタン
      </Button>
    </div>
  )
}
