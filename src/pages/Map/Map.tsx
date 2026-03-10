import type { FC } from 'react'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import styles from './Map.module.scss'

import { useMap } from './useMap'


export const Map: FC = () => {
  useMap()

  return (
    <BaseLayout>
      <Head pageTitle="Map" />
      <main className={styles.map} data-testid="map">
        <div className={styles.body}>
          <p>map</p>
        </div>
      </main>
    </BaseLayout>
  )
}
