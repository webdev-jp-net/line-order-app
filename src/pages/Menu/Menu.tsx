import type { FC } from 'react'

import { Link } from 'react-router-dom'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import { PlayGuide } from 'components/PlayGuide'
import { Button } from 'components/ui/Button'

import styles from './Menu.module.scss'

import { useMenu } from './useMenu'

export const Menu: FC = () => {
  const { contentsData, isOnboardingCompleted, isOpen, handleOpenPlayGuide, handleClosePlayGuide } =
    useMenu()

  return (
    <BaseLayout>
      <Head pageTitle="Menu" />
      <main className={styles.menu} data-testid="menu">
        <main className={styles.body}>
          <ul>
            <li>
              <Button onClick={handleOpenPlayGuide} variant="link">
                遊び方
              </Button>
            </li>
            <li>
              <Link to="/profile">プロフィール</Link>
            </li>
            <li>
              <Link to="/survey">アンケート</Link>
            </li>
            <li>
              <Link to="/menu/support">システム情報</Link>
            </li>
          </ul>
        </main>
      </main>
      <PlayGuide
        contentsData={contentsData}
        isOpen={isOpen}
        onClose={handleClosePlayGuide}
        isOnboardingCompleted={isOnboardingCompleted}
      />
    </BaseLayout>
  )
}
