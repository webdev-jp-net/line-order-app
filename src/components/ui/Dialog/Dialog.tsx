import { type FC, Fragment } from 'react'

import {
  Dialog as HeadlessUiDialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from '@headlessui/react'

import styles from './Dialog.module.scss'

type DialogProps = {
  isOpen: boolean
  easyCloseMode?: boolean
  onClose: () => void
  afterLeave?: () => void
  className?: string
  children: React.ReactNode
}

export const Dialog: FC<DialogProps> = ({
  isOpen,
  easyCloseMode = false,
  onClose,
  afterLeave,
  className,
  children,
}) => {
  // トランジション用のクラス定義
  const transitionClasses = {
    enter: styles.enter,
    enterFrom: styles.enterFrom,
    enterTo: styles.enterTo,
    leave: styles.leave,
    leaveFrom: styles.leaveFrom,
    leaveTo: styles.leaveTo,
  }

  // コンテンツ用のトランジションクラス
  const contentTransitionClasses = {
    ...transitionClasses,
    enterTo: `--isOpen ${styles.enterTo}`,
  }

  // 背景タップで閉じる処理
  const handleClose = easyCloseMode ? onClose : () => {}

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessUiDialog
        as="div"
        onClose={handleClose}
        className={[styles.dialog, className].filter(Boolean).join(' ')}
      >
        {/* 背景オーバーレイ */}
        <TransitionChild as={Fragment} {...transitionClasses}>
          <div className={styles.screen} />
        </TransitionChild>

        {/* ダイアログコンテンツ */}
        <TransitionChild as={Fragment} {...contentTransitionClasses} afterLeave={afterLeave}>
          <DialogPanel
            className={[styles.content, `${className ? styles.contentWrapper : ''}`].join(' ')}
          >
            {children}
          </DialogPanel>
        </TransitionChild>
      </HeadlessUiDialog>
    </Transition>
  )
}
