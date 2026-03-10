import { FC } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AppWrapper } from 'layout/AppWrapper'

import { Home } from 'pages/Home'
import { Maintenance } from 'pages/Maintenance'
import { Map } from 'pages/Map'
import { Menu } from 'pages/Menu'
import { MenuSupport } from 'pages/MenuSupport'
import { NotFound } from 'pages/NotFound'
import { Profile } from 'pages/Profile'
import { Progress } from 'pages/Progress'
import { Reward } from 'pages/Reward'
import { Survey } from 'pages/Survey'

// import { continueRouter } from './_continue'
// import { onboardingRouter } from './_onboarding'
import { RootRedirect } from './RootRedirect'

const maintenanceMode = false

export const App: FC = () => {
  const router = createBrowserRouter(
    // メンテナン中の場合は全てのページをメンテナンスページに遷移
    maintenanceMode
      ? [{ path: '*', element: <Maintenance /> }]
      : [
          {
            element: <AppWrapper />,
            errorElement: <NotFound />,
            children: [
              {
                index: true,
                element: <RootRedirect />,
              },
              {
                path: 'menu',
                element: <Menu />,
              },
              {
                path: 'profile',
                element: <Profile />,
              },
              {
                path: 'reward',
                element: <Reward />,
              },
              {
                path: 'survey',
                element: <Survey />,
              },
              {
                path: 'map',
                element: <Map />,
              },
              {
                path: 'progress',
                element: <Progress />,
              },
              {
                path: 'menu/support',
                element: <MenuSupport />,
              },
              // Home（オンボーディング前後どちらからもアクセス可能）
              { path: 'home', element: <Home /> },
              // // オンボーディング完了前ルート
              // onboardingRouter,
              // // オンボーディング完了後ルート
              // continueRouter,
            ],
          },
          // メンテナンスページ表示確認
          { path: 'maintenance', element: <Maintenance /> },
          // 404 Not Found
          { path: '*', element: <NotFound /> },
        ]
  )

  return <RouterProvider router={router} />
}
