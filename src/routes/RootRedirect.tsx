import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from 'store'

// LIFFコールバックパラメーターがあるかどうかを判定
const hasLiffCallbackParams = (search: string) => {
  if (!search) {
    return false
  }

  const params = new URLSearchParams(search)
  for (const key of params.keys()) {
    if (key.toLowerCase().startsWith('liff')) {
      return true
    }
  }

  return false
}

export const RootRedirect = () => {
  const location = useLocation()
  const userToken = useAppSelector(state => state.liffUser.userToken)
  const progress = useAppSelector(state => state.player.progress)
  const profile = useAppSelector(state => state.player.profile)

  const shouldWaitForLiffLogin = hasLiffCallbackParams(location.search) && !userToken

  // LIFFログイン待機中、またはprogressまたはprofileのローディング待機
  if (shouldWaitForLiffLogin || !progress || profile === undefined) {
    return null
  }

  // LIFF 2次リダイレクト対策1: liff.stateパラメータを確認
  const params = new URLSearchParams(location.search)
  const liffState = params.get('liff.state')

  if (liffState) {
    return <Navigate to={liffState} replace />
  }

  // LIFF 2次リダイレクト対策2: sessionStorageから保存されたパスを確認
  const savedPath = sessionStorage.getItem('liff_redirect_path')

  if (savedPath) {
    // パスを復元したらsessionStorageから削除
    sessionStorage.removeItem('liff_redirect_path')
    return <Navigate to={savedPath} replace />
  }

  // 通常のリダイレクト: profileがnull（404/未登録）なら/story/opening、それ以外は/home
  return <Navigate to={profile === null ? '/story/opening' : '/home'} replace />
}
