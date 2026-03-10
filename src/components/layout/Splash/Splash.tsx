import type { FC } from 'react'

import { Loading } from 'components/layout/Loading'

import styles from './Splash.module.scss'

import { useSplash } from './useSplash'

type SplashProps = {
  isSplashActive: boolean
  handleClearSplash: () => void
  isAuthLoading: boolean
  className?: string
}

/**
 * スプラッシュ画面（レイアウトコンポーネント）
 */
export const Splash: FC<SplashProps> = ({
  className = '',
  isSplashActive = true,
  handleClearSplash,
  isAuthLoading = true,
}) => {
  const customClass = [className]
  const { isLoading } = useSplash({ isAuthLoading })

  return (
    <article
      className={[styles.splash, ...customClass].join(' ')}
      aria-busy={isLoading}
      aria-hidden={!isSplashActive}
    >
      <div
        className={styles.body}
        onClick={handleClearSplash}
        role="button"
        aria-label="START"
        tabIndex={0}
      >
        <h1 className={styles.title}>LINE Quest App</h1>
        <p className={styles.guide} data-text="START">
          START
        </p>
      </div>
      <Loading isBusy={isLoading} />
    </article>
  )
}
