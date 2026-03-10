import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppSelector } from 'store'
import { selectIsOnboardingCompleted } from 'store/player'

/**
 * オンボーディングページのルーティングを制御する
 */
export const OnboardingGuard = () => {
  const isOnboardingCompleted = useAppSelector(selectIsOnboardingCompleted)
  const location = useLocation()
  // ローディング状態でもオンボーディング配下は表示しておく（Splashで制御）

  // Splash(index: "/")では自動遷移せず、ユーザータップで遷移
  if (isOnboardingCompleted && location.pathname !== '/') {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}
