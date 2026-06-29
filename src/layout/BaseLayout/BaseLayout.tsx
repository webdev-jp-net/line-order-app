import { FC, HTMLAttributes } from 'react'

import { Cart } from 'components/layout/Cart'
import { GlobalMenu } from 'components/layout/GlobalMenu'

import styles from './BaseLayout.module.scss'

export type BackgroundVariant = 'default' | 'night' | 'sunset' | 'transparent'

type BaseLayoutProps = HTMLAttributes<HTMLDivElement> & {
  showGlobalMenu?: boolean
  variant?: BackgroundVariant
}

/**
 * 標準のレイアウト
 */
export const BaseLayout: FC<BaseLayoutProps> = ({
  children,
  showGlobalMenu = true,
  variant = 'default',
}) => {
  const backgroundClass = variant !== 'default' ? styles[`--${variant}`] : ''

  return (
    <>
      <div className={`${styles.layout} ${backgroundClass}`.trim()}>{children}</div>
      {showGlobalMenu && (
        <>
          <GlobalMenu />
          <Cart />
        </>
      )}
    </>
  )
}
