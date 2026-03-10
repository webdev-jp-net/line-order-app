import type { FC } from 'react'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import styles from './Progress.module.scss'

import { useProgress } from './useProgress'

export const Progress: FC = () => {
  useProgress()

  return (
    <BaseLayout>
      <Head pageTitle="Progress" />
      <main className={styles.progress} data-testid="progress">
        <div className={styles.body}>
          <p>progress</p>
        </div>
      </main>
    </BaseLayout>
  )
}
