import type { FC } from 'react'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

export const Home: FC = () => {
  return (
    <BaseLayout showGlobalMenu={false}>
      <Head pageTitle="ホーム" />
      <main data-testid="home">
        <h1>注文アプリ</h1>
      </main>
    </BaseLayout>
  )
}
