import type { FC } from 'react'

import { UserRound } from 'lucide-react'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import { Button } from 'components/ui/Button/Button'

import styles from './Home.module.scss'

import { useHome } from './useHome'

export const Home: FC = () => {
  const { officialWebSiteUrl } = useHome()

  return (
    <BaseLayout>
      <Head pageTitle="Home" />
      <main className={styles.home} data-testid="home">
        <div className={styles.header}>
          <h1 className={styles.title}>TITLE</h1>
          <p className={styles.description}>このイベントについてdescription</p>
        </div>
        <div className={styles.body}>
          <section className={styles.section}>
            <h2 className={styles.subTitle}>容疑者を絞り込め！</h2>
            <ul className={styles.grid}>
              <li>
                容疑者A
                <UserRound className={styles.icon} />
              </li>
              <li>
                容疑者B
                <UserRound className={styles.icon} />
              </li>
              <li>
                容疑者C
                <UserRound className={styles.icon} />
              </li>
              <li>
                容疑者D
                <UserRound className={styles.icon} />
              </li>
              <li>
                容疑者E
                <UserRound className={styles.icon} />
              </li>
              <li>
                容疑者F
                <UserRound className={styles.icon} />
              </li>
              <li>
                容疑者G
                <UserRound className={styles.icon} />
              </li>
            </ul>
            <div className={styles.question}>
              <h3 className={styles.questionTitle}>
                ハイエースを降りた証言に
                <br />
                矛盾がある人は
              </h3>
              <div className={styles.questionAnswer}>?</div>
            </div>
            <div className={styles.question}>
              <h3 className={styles.questionTitle}>
                本来知らないはずのことを
                <br />
                知っていた人は
              </h3>
              <div className={styles.questionAnswer}>?</div>
            </div>
            <div>
              <Button size="full" variant="basic">
                答える
              </Button>
            </div>
          </section>
          {/* <section className={styles.section}>
            <h2 className={styles.subTitle}>全員の証言を集めろ！</h2>
            <ul className={styles.grid}>
              <li data-unlocked="true">
                容疑者A
                <UserRound className={styles.icon} />
              </li>
              <li>
                容疑者B
                <UserRound className={styles.icon} />
              </li>
              <li data-unlocked="true">
                容疑者C
                <UserRound className={styles.icon} />
              </li>
              <li data-unlocked="true">
                容疑者D
                <UserRound className={styles.icon} />
              </li>
              <li>
                容疑者E
                <UserRound className={styles.icon} />
              </li>
              <li>
                容疑者F
                <UserRound className={styles.icon} />
              </li>
              <li>
                容疑者G
                <UserRound className={styles.icon} />
              </li>
            </ul>
            <div>
              <Button size="full" variant="basic">
                QRコードを読み込む
              </Button>
            </div>
          </section> */}
          <p className={styles.description}>解き方についての案内。など。</p>
          <section className={styles.section}>
            <p className={styles.description}>クリア特典があることを告知</p>
          </section>
        </div>
        <div className={styles.footer}>
          <a href={officialWebSiteUrl}>公式サイトをチェック</a>
        </div>
      </main>
    </BaseLayout>
  )
}
