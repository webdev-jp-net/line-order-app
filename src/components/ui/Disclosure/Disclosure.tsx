import type { FC, ComponentProps } from 'react'
import { Fragment, useMemo } from 'react'

import {
  Disclosure as DisclosureUI,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { ChevronDown } from 'lucide-react'

import styles from './Disclosure.module.scss'

import type { LucideIcon } from 'lucide-react'

type DisclosureProps = ComponentProps<'div'> & {
  headIcon?: LucideIcon
  label: React.ReactNode
  defaultOpen?: boolean
  afterLeave?: () => void
  children?: React.ReactNode
}

export const Disclosure: FC<DisclosureProps> = ({
  headIcon: HeadIcon,
  label,
  defaultOpen = false,
  afterLeave,
  children,
  className,
  ...otherProps
}) => {
  // トランジション用のクラス定義
  const transitionClasses = useMemo(
    () => ({
      enter: styles.enter,
      enterFrom: styles.enterFrom,
      enterTo: styles.enterTo,
      leave: styles.leave,
      leaveFrom: styles.leaveFrom,
      leaveTo: styles.leaveTo,
    }),
    []
  )
  // コンテンツ用のトランジションクラス
  const contentTransitionClasses = useMemo(
    () => ({
      ...transitionClasses,
      enterTo: `--isOpen ${styles.enterTo}`,
    }),
    [transitionClasses]
  )

  return (
    <DisclosureUI defaultOpen={defaultOpen}>
      {({ open }) => (
        <div
          className={className ? `${styles.disclosure} ${className}` : styles.disclosure}
          {...otherProps}
        >
          <DisclosureButton className={styles.trigger}>
            {HeadIcon && <HeadIcon className={styles.headIcon} />}
            <span className={styles.label}>{label}</span>
            <ChevronDown className={styles.tailIcon} />
          </DisclosureButton>

          <Transition show={open} as={Fragment} appear>
            <TransitionChild as={Fragment} {...contentTransitionClasses} afterLeave={afterLeave}>
              <DisclosurePanel className={styles.panel}>{children}</DisclosurePanel>
            </TransitionChild>
          </Transition>
        </div>
      )}
    </DisclosureUI>
  )
}
