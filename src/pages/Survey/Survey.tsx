import type { FC } from 'react'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import styles from './Survey.module.scss'

import { useSurvey } from './useSurvey'


export const Survey: FC = () => {
  useSurvey()

  return (
    <BaseLayout>
      <Head pageTitle="Survey" />
      <main className={styles.survey} data-testid="survey">
        <div className={styles.body}>
          <p>survey</p>
        </div>
      </main>
    </BaseLayout>
  )
}
