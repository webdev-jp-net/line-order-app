import { FC, Fragment } from 'react'

import { Outlet } from 'react-router-dom'

import { Splash } from 'components/layout/Splash'
import { Button } from 'components/ui/Button'
import { Dialog } from 'components/ui/Dialog'
import dialogStyles from 'components/ui/Dialog/Dialog.module.scss'

import { useAppWrapper } from './useAppWrapper'

/**
 * アプリケーションのラッパー
 * @description
 * - LIFF認証の初期化と状態管理
 * - スプラッシュ画面の表示制御
 * - エラーダイアログの表示
 */
export const AppWrapper: FC = () => {
  const {
    isLoading,
    isSplashActive,
    shouldHideSplash,
    handleClearSplash,
    globalError,
    tokenError,
    errorMessage,
    handleUpdateErrorDialog,
    handleCloseErrorDialog,
    handleCloseTokenErrorDialog,
  } = useAppWrapper()

  // エラーダイアログのハンドラー
  const handleCloseSystemError = () => {
    handleCloseErrorDialog()
    handleUpdateErrorDialog()
  }

  const handleCloseSessionError = () => {
    handleCloseTokenErrorDialog()
    handleUpdateErrorDialog()
  }

  return (
    <Fragment>
      {/* コンテンツ */}
      <Outlet />

      {/* スプラッシュ */}
      {!shouldHideSplash && (
        <Splash
          isSplashActive={isSplashActive}
          handleClearSplash={handleClearSplash}
          isAuthLoading={isLoading}
        />
      )}

      {/* システムエラーダイアログ */}
      <Dialog isOpen={globalError} easyCloseMode={false} onClose={handleCloseSystemError}>
        <div className={dialogStyles.header}>
          <h2 className={dialogStyles.title}>エラー</h2>
        </div>
        <div className={dialogStyles.body}>
          <p className={dialogStyles.paragraph}>{errorMessage}</p>
        </div>
        <footer className={dialogStyles.footer}>
          <Button type="button" onClick={handleCloseSystemError}>
            閉じる
          </Button>
        </footer>
      </Dialog>

      {/* セッションエラーダイアログ */}
      <Dialog isOpen={tokenError} easyCloseMode={false} onClose={handleCloseSessionError}>
        <div className={dialogStyles.header}>
          <h2 className={dialogStyles.title}>再ログインします</h2>
        </div>
        <div className={dialogStyles.body}>
          <p className={dialogStyles.paragraph}>
            前回のログインから時間が経ったので、ログインし直します。
          </p>
        </div>
        <footer className={dialogStyles.footer}>
          <Button type="button" onClick={handleCloseSessionError}>
            ログインする
          </Button>
        </footer>
      </Dialog>
    </Fragment>
  )
}
