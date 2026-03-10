import { FC, ReactNode, ComponentProps } from 'react'

import { LucideIcon } from 'lucide-react'

import styles from './Button.module.scss'

type ButtonProps = ComponentProps<'button'> & {
  children: ReactNode
  size?: 'full' | 'liquid' | 'icon'
  variant?: 'minor' | 'basic' | 'accent' | 'link'
  headIcon?: LucideIcon
  tailIcon?: LucideIcon
}

export const Button: FC<ButtonProps> = ({
  variant = 'basic',
  size = 'liquid',
  headIcon: HeadIcon,
  tailIcon: TailIcon,
  ...props
}) => {
  const customClass = [props.className]
  customClass.push(styles[`--${variant}`])
  customClass.push(styles[`--${size}`])

  return (
    <button {...props} className={[styles.button, ...customClass].join(' ')}>
      {HeadIcon && <HeadIcon className={styles.headIcon} />}
      {size != 'icon' && props.children}
      {size != 'icon' && TailIcon && <TailIcon className={styles.tailIcon} />}
    </button>
  )
}
