import { useState } from 'react'

import { fn } from 'storybook/test'

import { Button } from 'components/ui/Button'

import dialogStyles from './Dialog.module.scss'

import { Dialog } from './Dialog'

import type { Meta, StoryObj } from '@storybook/react'

/**
 * ダイアログコンポーネント
 *
 * モーダルダイアログを表示するためのコンポーネントです。
 * `easyCloseMode`の設定により、背景タップでの閉じる動作を制御できます。
 */
const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  decorators: [
    Story => (
      <div className={`decorator center`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'モーダルダイアログを表示するコンポーネント。トランジション効果付き。',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'ダイアログの表示状態',
    },
    easyCloseMode: {
      control: 'boolean',
      description: '背景タップで閉じるかどうか',
    },
    onClose: {
      description: '閉じる時のコールバック',
    },
    afterLeave: {
      description: 'トランジション終了後のコールバック',
    },
    className: {
      control: 'text',
      description: '追加のクラス名',
    },
    children: {
      control: 'text',
      description: 'ダイアログの内容',
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なダイアログの例
 */
export const Basic: Story = {
  args: {
    isOpen: true,
    easyCloseMode: true,
    onClose: fn(),
    children: (
      <>
        <div className={dialogStyles.header}>
          <h2 className={dialogStyles.title}>ダイアログのタイトル</h2>
        </div>
        <div className={dialogStyles.body}>
          <p className={dialogStyles.paragraph}>
            ダイアログの内容です。モーダルウィンドウとして表示されます。
          </p>
        </div>
        <footer className={dialogStyles.footer}>
          <Button type="button" onClick={fn()}>
            OK
          </Button>
          <Button variant="minor" type="button" onClick={fn()}>
            キャンセル
          </Button>
        </footer>
      </>
    ),
  },
}

/**
 * 背景タップで閉じられないダイアログの例
 */
export const NotEasyClose: Story = {
  args: {
    ...Basic.args,
    easyCloseMode: false,
    children: (
      <>
        <div className={dialogStyles.header}>
          <h2 className={dialogStyles.title}>閉じられないダイアログ</h2>
        </div>
        <div className={dialogStyles.body}>
          <p className={dialogStyles.paragraph}>このダイアログは背景タップでは閉じられません。</p>
          <p className={dialogStyles.paragraph}>easyCloseMode=falseに設定されています。</p>
        </div>
        <footer className={dialogStyles.footer}>
          <Button variant="basic" type="button" onClick={fn()}>
            OK
          </Button>
        </footer>
      </>
    ),
  },
}

/**
 * 長いコンテンツでスクロールするダイアログの例
 */
export const LongContent: Story = {
  args: {
    ...Basic.args,
    children: (
      <>
        <div className={dialogStyles.header}>
          <h2 className={dialogStyles.title}>スクロールあり</h2>
        </div>
        <div className={dialogStyles.body}>
          <p className={dialogStyles.paragraph}>
            このダイアログは長いコンテンツを含んでおり、スクロールが必要です。
          </p>
          <p className={dialogStyles.paragraph}>
            長いテキストコンテンツの例として、以下に複数の段落を表示しています。
          </p>
          {Array.from({ length: 15 }, (_, i) => (
            <p key={i} className={dialogStyles.paragraph}>
              段落 {i + 1}:
              ここに長いテキストが入ります。ダイアログのコンテンツがスクロールするほど長い場合の表示例です。
              このようなケースでは、ダイアログの高さが制限され、コンテンツ部分にスクロールバーが表示されます。
              ユーザーは必要に応じてスクロールして、すべてのコンテンツを確認することができます。
              {i % 2 === 0 &&
                'さらに長いテキストを追加して、より多くのコンテンツを表示しています。これにより、スクロールの必要性がより明確になります。'}
              {i % 3 === 0 &&
                'モバイルデバイスでの表示を考慮した設計になっています。スクロール操作は直感的で、ユーザーフレンドリーな体験を提供します。'}
            </p>
          ))}
        </div>
        <footer className={dialogStyles.footer}>
          <Button type="button" onClick={fn()}>
            OK
          </Button>
          <Button variant="minor" type="button" onClick={fn()}>
            キャンセル
          </Button>
        </footer>
      </>
    ),
  },
}

/**
 * インタラクティブな例（ボタンでダイアログを開閉）
 */
export const Interactive = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        ダイアログを開く
      </Button>

      <Dialog isOpen={isOpen} easyCloseMode={true} onClose={handleClose} afterLeave={fn()}>
        <div className={dialogStyles.header}>
          <h2 className={dialogStyles.title}>インタラクティブダイアログ</h2>
        </div>
        <div className={dialogStyles.body}>
          <p className={dialogStyles.paragraph}>このダイアログは実際に開いたり閉じたりできます。</p>
        </div>
        <footer className={dialogStyles.footer}>
          <Button type="button" onClick={handleClose}>
            OK
          </Button>
        </footer>
      </Dialog>
    </div>
  )
}
