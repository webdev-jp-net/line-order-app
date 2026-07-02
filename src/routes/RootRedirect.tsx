import { Navigate, useLocation } from 'react-router-dom'

// LIFFコールバックパラメーターがあるかどうかを判定
const hasLiffCallbackParams = (search: string) => {
  if (!search) {
    return false
  }

  const params = new URLSearchParams(search)

  // OAuth(PKCE)ログインの戻り（?code=...&state=...）
  if (params.has('code') && params.has('state')) {
    return true
  }

  for (const key of params.keys()) {
    if (key.toLowerCase().startsWith('liff')) {
      return true
    }
  }

  return false
}

export const RootRedirect = () => {
  const location = useLocation()

  // コールバックパラメーターがある間は常に待機する
  // 待機判定に userToken を使わない理由: _document/_llm-docs/spec/user-app/line-auth.md「コールバック処理の制約」（#16）
  const shouldWaitForLiffLogin = hasLiffCallbackParams(location.search)

  // LIFFログイン待機中はリダイレクトしない
  if (shouldWaitForLiffLogin) {
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

  return <Navigate to="/home" replace />
}
