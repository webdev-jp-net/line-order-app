import { FC } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AppWrapper } from 'layout/AppWrapper'

import { Home } from 'pages/Home'
import { Maintenance } from 'pages/Maintenance'
import { NotFound } from 'pages/NotFound'

import { RootRedirect } from './RootRedirect'

const maintenanceMode = false

export const App: FC = () => {
  const router = createBrowserRouter(
    // メンテナンス中の場合は全てのページをメンテナンスページに遷移
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
              { path: 'home', element: <Home /> },
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
