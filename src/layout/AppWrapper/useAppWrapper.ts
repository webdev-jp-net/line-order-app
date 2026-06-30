import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useLocation } from 'react-router-dom'

import { useAuthLiff } from 'hooks/useAuthLiff'
import { AppDispatch, RootState } from 'store'
import { setError, setErrorMessage, setTokenError, setIsSplashActive } from 'store/layout'

export const useAppWrapper = () => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()

  // グローバルステートからエラー状態とエラーメッセージを受け取る
  const {
    error: globalError,
    tokenError,
    errorMessage,
    isSplashActive,
  } = useSelector((state: RootState) => state.layout)

  // 認証
  const { actLoginLiff, userToken, error, loading } = useAuthLiff()

  // LIFF初期化（ページロードごとに1回）
  // userToken は永続化されるため、復元値の有無に関わらず liff.init() を実行する
  useEffect(() => {
    actLoginLiff()
  }, [actLoginLiff])

  // 401エラー後の再認証（ダイアログクローズ後に実行）
  useEffect(() => {
    // tokenErrorがfalseになった（ダイアログが閉じられた）かつuserTokenがnullの場合に再認証
    if (!tokenError && userToken === null && !error) {
      actLoginLiff()
    }
  }, [tokenError, userToken, error, actLoginLiff])

  // エラーダイアログのハンドラー
  const handleUpdateErrorDialog = () => dispatch(setErrorMessage(''))
  const handleCloseErrorDialog = () => dispatch(setError(false))
  const handleCloseTokenErrorDialog = () => dispatch(setTokenError(false))

  // スプラッシュ画面のハンドラー
  const handleClearSplash = () => dispatch(setIsSplashActive(false))

  // ローディング状態の判定
  // LIFF認証処理中、データ取得中、またはuserToken未取得でエラーもない状態をローディングとする
  const isLoading = loading || (!userToken && !error)

  // location.pathnameの変更を検知するとスクロール位置を先頭へリセット
  useEffect(() => {
    const html = document.querySelector('html')
    if (!html) return

    // ハッシュ#が含まれていない場合は先頭までスクロール
    if (!location.hash) {
      html.setAttribute('data-location-change', 'true')
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      })
      setTimeout(() => {
        html.removeAttribute('data-location-change')
      }, 500) // 500msはスムーススクロールの推定時間。実際には調整が必要
      return
    }
  }, [location.pathname, location.hash])

  return {
    userToken,
    isLoading,
    isSplashActive,
    handleClearSplash,
    globalError,
    tokenError,
    errorMessage,
    handleUpdateErrorDialog,
    handleCloseErrorDialog,
    handleCloseTokenErrorDialog,
  }
}
