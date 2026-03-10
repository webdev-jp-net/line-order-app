import type { FC } from 'react'

import styles from './Loading.module.scss'

type LoadingProps = {
  isBusy?: boolean
}

export const Loading: FC<LoadingProps> = ({ isBusy = true }) => {
  return (
    <div className={styles.loading} aria-busy={isBusy}>
      <div className={styles.loadingContent}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  )
}
