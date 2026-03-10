import type { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { Home } from 'lucide-react'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import { Button } from 'components/ui/Button'

import styles from './NotFound.module.scss'

import { useNotFound } from './useNotFound'

export const NotFound: FC = () => {
  const navigate = useNavigate()
  useNotFound()

  return (
    <BaseLayout showGlobalMenu={false}>
      <Head pageTitle="ページが見つかりません" />
      <main className={styles.notFound} data-testid="not-found">
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.number}>404</span>ページが見つかりません
          </h1>
        </header>
        <div className={styles.body}>
          <p className={styles.paragraph}>
            お探しのページは存在しないか、移動または削除された可能性があります。
          </p>
        </div>
        <div className={styles.footer}>
          <Button
            headIcon={Home}
            onClick={() => {
              navigate('/')
            }}
          >
            ホームへ戻る
          </Button>
        </div>
      </main>
    </BaseLayout>
  )
}
