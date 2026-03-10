import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppSelector } from 'store'
import { selectIsGameCompleted, selectProgress } from 'store/player'

/**
 * 継続ページのルーティングを制御する（オンボーディング完了チェック）
 */
export const ContinueGuard = () => {
  const location = useLocation()
  const progress = useAppSelector(selectProgress)
  const isGameCompleted = useAppSelector(selectIsGameCompleted)

  const isCelebrationRoute = location.pathname.endsWith('/celebration')

  // Splashでローディング表示を行うため、progressがnullの場合はnullを返す
  if (!progress) {
    return null
  }

  if (!progress.isOnboardingCompleted && !(isCelebrationRoute && isGameCompleted)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
