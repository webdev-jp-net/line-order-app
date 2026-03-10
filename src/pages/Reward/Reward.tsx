import type { FC } from 'react'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import styles from './Reward.module.scss'

import { useReward } from './useReward'


export const Reward: FC = () => {
  useReward()

  return (
    <BaseLayout>
      <Head pageTitle="Reward" />
      <main className={styles.reward} data-testid="reward">
        <div className={styles.body}>
          <p>reward</p>
        </div>
      </main>
    </BaseLayout>
  )
}
