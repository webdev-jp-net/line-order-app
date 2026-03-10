import type { FC } from 'react'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import styles from './Maintenance.module.scss'

import { useMaintenance } from './useMaintenance'

export const Maintenance: FC = () => {
  useMaintenance()

  return (
    <BaseLayout showGlobalMenu={false}>
      <Head pageTitle="メンテナンス中" />
      <main className={styles.maintenance} data-testid="maintenance">
        <header className={styles.header}>
          <h1 className={styles.title}>メンテナンス中</h1>
        </header>
        <div className={styles.body}>
          <p className={styles.paragraph}>
            ご不便をおかけします、しばらくしてから再度アクセスしてください。
          </p>
        </div>
      </main>
    </BaseLayout>
  )
}
